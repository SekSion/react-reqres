import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { registerUser } from '../../services/userSession';
import { IRegister } from '../../models/IRegister';
import { useAuth } from '../../services/Contexts/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { TEInput } from 'tw-elements-react';

const SignUp = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [repeatPassword, setRepeatPassword] = useState<string>('');
  const [isButtonEnabled, setIsButtonEnabled] = useState<boolean>(false);
  const [touchedFields, setTouchedFields] = useState<{ [key: string]: boolean }>({
    email: false,
    password: false,
    repeatPassword: false,
  });
  const [emailError, setEmailError] = useState<string>('');
  const [passwordMatchError, setPasswordMatchError] = useState<string>('');

  const { registerUserStore, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated()) {
      navigate('/dashboard');
    }
  }, []);

  useEffect(() => {
    const isEmailValid = email !== '' && emailError === '';
    const isPasswordValid = password !== '';
    const isRepeatPasswordValid = repeatPassword !== '';
    const isPasswordMatch = repeatPassword === password;

    setIsButtonEnabled(isEmailValid && isPasswordValid && isRepeatPasswordValid && isPasswordMatch);
  }, [email, password, repeatPassword, emailError]);

  const signUp = async () => {
    const register: IRegister = {
      email,
      password,
    };
    await registerUser(register).then(
      (res) => {
        toast.success('id:' + res.id + ', ' + res.token);
        registerUserStore(res.id, res.token);
        navigateToSignIn();
      },
      (err) => {
        console.log(err);
        toast.error(err);
      },
    );
  };

  const navigateToSignIn = () => {
    navigate('/sign-in');
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
    } else if (field === 'repeatPassword') {
      setRepeatPassword(value);
      // Check if the repeat password is empty
      if (value === '') {
        setPasswordMatchError('Repeat Password is required');
      }
      // Check if the passwords match
      else if (value !== password) {
        setPasswordMatchError('Passwords do not match');
      } else {
        setPasswordMatchError('');
      }
    }
  };

  return (
    <div className="min-h-[calc(100vh-60px)] flex items-center justify-center bg-gray-100 dark:bg-gray-800">
      <div className="bg-white dark:bg-gray-700 p-8 rounded shadow-md w-96">
        <h2 className="text-2xl font-semibold mb-4 dark:text-white">Sign Up</h2>
        <div className="mb-8 text-black dark:text-white">
          <TEInput type="email" id="email" label="Email" value={email} onChange={(e) => handleInputChange('email', e.target.value)}>
            {(touchedFields.email && !email && (
              <div className="email-error-message absolute w-full text-sm text-red-500 dark:text-red-500">Email is required</div>
            )) ||
              (emailError && <div className="email-error-message absolute w-full text-sm text-red-500 dark:text-red-500">{emailError}</div>)}
          </TEInput>
        </div>
        <div className="mb-8 text-black dark:text-white">
          <TEInput type="password" id="password" label="Password" value={password} onChange={(e) => handleInputChange('password', e.target.value)}>
            {touchedFields.password && !password && (
              <div className=" password-error-message absolute w-full text-sm text-red-500 dark:text-red-500">Password is required</div>
            )}
          </TEInput>
        </div>
        <div className="mb-8 text-black dark:text-white">
          <TEInput
            type="password"
            id="repeatPassword"
            label="Repeat Password"
            value={repeatPassword}
            onChange={(e) => handleInputChange('repeatPassword', e.target.value)}
          >
            {touchedFields.repeatPassword && !repeatPassword && (
              <div className="absolute w-full text-sm text-red-500 dark:text-red-500">Repeat Password is required</div>
            )}
            {passwordMatchError && (
              <div className="repeat-password-error-message absolute w-full text-sm text-red-500 dark:text-red-500">{passwordMatchError}</div>
            )}
          </TEInput>
        </div>
        <button
          type="button"
          className="sign-up-btn bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300 disabled:opacity-50 disabled:pointer"
          disabled={!isButtonEnabled}
          onClick={signUp}
        >
          Sign Up
        </button>
        <p className="text-black dark:text-white mt-2">
          Already have an account?
          <span className="text-blue-500 cursor-pointer hover:underline">
            <Link className="sign-in-link" to="/sign-in">
              Sign In
            </Link>
          </span>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
