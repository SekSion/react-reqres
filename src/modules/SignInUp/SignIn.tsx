import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { loginUser } from '../../services/userSession';
import { ILogin } from '../../models/ILogin';
import { useAuth } from '../../services/Contexts/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { TEInput } from 'tw-elements-react';
import { listUsers } from '../../services/users';
import { IUsers } from '../../models/IUsers';

const SignIn = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isButtonEnabled, setIsButtonEnabled] = useState<boolean>(false);
  const [touchedFields, setTouchedFields] = useState<{ [key: string]: boolean }>({
    email: false,
    password: false,
  });
  const [emailError, setEmailError] = useState<string>('');

  const { loginUserStore, isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated()) {
      navigate('/dashboard');
    }
  }, []);

  const navigate = useNavigate();

  useEffect(() => {
    const isEmailValid = email !== '' && emailError === '';
    const isPasswordValid = password !== '';

    setIsButtonEnabled(isEmailValid && isPasswordValid);
  }, [email, password, emailError]);

  const signIn = async () => {
    const login: ILogin = {
      email,
      password,
    };

    try {
      const resLogin = await loginUser(login);
      const firstPageRes = await listUsers();
      let user = firstPageRes.data.find((x: IUsers) => x.email === login.email);

      if (!user && firstPageRes.total_pages > 1) {
        const secondPageRes = await listUsers(2);
        user = secondPageRes.data.find((x: IUsers) => x.email === login.email);
      }
      if (user) {
        loginUserStore(login.email, resLogin.token, user.first_name);
        navigate('/dashboard');
        toast.success('Hello: ' + user.first_name + ' ' + user.last_name);
      } else {
        console.log('User not found');
        toast.error('User not found');
      }
    } catch (err) {
      console.log(err);
      toast.error(err as string);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    if (value === '' && !touchedFields[field]) {
      setTouchedFields({ ...touchedFields, [field]: true });
    }

    if (field === 'email') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value) && value !== '') {
        setEmailError('Invalid email format');
      } else {
        setEmailError('');
      }
      setEmail(value);
    } else if (field === 'password') {
      setPassword(value);
    }
  };

  return (
    <div className="min-h-[calc(100vh-60px)] flex items-center justify-center bg-gray-100 dark:bg-gray-800">
      <div className="bg-white dark:bg-gray-700 p-8 rounded shadow-md w-96">
        <h2 className="text-2xl font-semibold mb-4 dark:text-white">Sign In</h2>
        <div className="mb-8 text-black dark:text-white">
          <TEInput type="email" id="email" label="Email" value={email} onChange={(e) => handleInputChange('email', e.target.value)}>
            {(touchedFields.email && !email && <div className="absolute w-full text-sm text-red-500 dark:text-red-500">Email is required</div>) ||
              (emailError && <div className=" email-error-message absolute w-full text-sm text-red-500 dark:text-red-500">{emailError}</div>)}
          </TEInput>
        </div>
        <div className="mb-8 text-black dark:text-white">
          <TEInput type="password" id="password" label="Password" value={password} onChange={(e) => handleInputChange('password', e.target.value)}>
            {touchedFields.password && !password && (
              <div className="password-error-message absolute w-full text-sm text-red-500 dark:text-red-500">Password is required</div>
            )}
          </TEInput>
        </div>
        <button
          type="button"
          className="sign-in-btn bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300 disabled:opacity-50 disabled:pointer"
          disabled={!isButtonEnabled}
          onClick={signIn}
        >
          Sign In
        </button>
        <p className="text-black dark:text-white mt-2">
          Don't have an account?
          <span className="text-blue-500 cursor-pointer hover:underline">
            <Link className="sign-up-link" to="/sign-up">
              Sign Up
            </Link>
          </span>
        </p>
      </div>
    </div>
  );
};

export default SignIn;
