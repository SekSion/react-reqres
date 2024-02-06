import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { loginUser, registerUser } from "../../services/userSession";
import { ILogin } from "../../models/ILogin";
import { IRegister } from "../../models/IRegister";
import { useAuth } from "../../services/Contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const SignInUp = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [repeatPassword, setRepeatPassword] = useState<string>("");
  const [emailError, setEmailError] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");
  const [repeatPasswordError, setRepeatPasswordError] = useState<string>("");
  const [isSignUpMode, setIsSignUpMode] = useState<boolean>(false);
  const [isButtonEnabled, setIsButtonEnabled] = useState<boolean>(false);

  const { loginUserStore } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    validateEmail();
  }, [email]);

  useEffect(() => {
    validatePassword();
  }, [password]);

  useEffect(() => {
    validateRepeatPassword();
  }, [repeatPassword, isSignUpMode]); // Also depends on isSignUpMode

  useEffect(() => {
    // Check if all fields are filled and valid
    const isEmailValid = email !== "" && !emailError;
    const isPasswordValid = password !== "" && !passwordError;
    const isRepeatPasswordValid = !isSignUpMode || (repeatPassword !== "" && !repeatPasswordError);

    // Enable or disable button based on form validity
    setIsButtonEnabled(isEmailValid && isPasswordValid && isRepeatPasswordValid);
  }, [email, password, repeatPassword, emailError, passwordError, repeatPasswordError, isSignUpMode]);

  const validateEmail = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email !== "" && !emailRegex.test(email)) {
      setEmailError("Invalid email address");
    } else {
      setEmailError("");
    }
  };

  const validatePassword = () => {
    if (password == "") {
      setPasswordError("Password must be filled");
    } else {
      setPasswordError("");
    }
  };

  const validateRepeatPassword = () => {
    if (isSignUpMode && password !== repeatPassword) {
      setRepeatPasswordError("Passwords do not match");
    } else {
      setRepeatPasswordError("");
    }
  };

  const toggleMode = () => {
    setIsSignUpMode(!isSignUpMode);
    setRepeatPassword("");
    setRepeatPasswordError("");
  };

  const signUp = () => {
    const register: IRegister = {
      email,
      password,
    };
    registerUser(register).then(
      (res) => {
        toast.success("id:" + res.id + ", " + res.token);
        toggleMode();
      },
      (err) => {
        console.log(err);
        toast.error(err);
      }
    );
  };

  const signIn = () => {
    const login: ILogin = {
      email,
      password,
    };
    loginUser(login).then(
      (res) => {
        console.log("RESTET", res);
        loginUserStore(login.email, res.token);
        navigate("/dashboard");
        toast.success(res.token);
      },
      (err) => {
        console.log(err);
        toast.error(err);
      }
    );
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-800">
      <div className="bg-white dark:bg-gray-700 p-8 rounded shadow-md w-96">
        <h2 className="text-2xl font-semibold mb-4 dark:text-white">{isSignUpMode ? "Sign Up" : "Sign In"}</h2>
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-600 dark:text-gray-200">
            Email
          </label>
          <input
            type="email"
            id="email"
            className={`mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300 dark:bg-gray-600 dark:text-white ${
              emailError ? "border-red-500" : ""
            }`}
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          {emailError && <p className="text-red-500 text-xs mt-1">{emailError}</p>}
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-sm font-medium text-gray-600 dark:text-gray-200">
            Password
          </label>
          <input
            type="password"
            id="password"
            className={`mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300 dark:bg-gray-600 dark:text-white ${
              passwordError ? "border-red-500" : ""
            }`}
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          {passwordError && <p className="text-red-500 text-xs mt-1">{passwordError}</p>}
        </div>
        {isSignUpMode && (
          <div className="mb-4">
            <label htmlFor="repeatPassword" className="block text-sm font-medium text-gray-600 dark:text-gray-200">
              Repeat Password
            </label>
            <input
              type="password"
              id="repeatPassword"
              className={`mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300 dark:bg-gray-600 dark:text-white ${
                repeatPasswordError ? "border-red-500" : ""
              }`}
              value={repeatPassword}
              onChange={(e) => {
                setRepeatPassword(e.target.value);
              }}
            />
            {repeatPasswordError && <p className="text-red-500 text-xs mt-1">{repeatPasswordError}</p>}
          </div>
        )}
        <button
          type="button"
          className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300 disabled:opacity-50 disabled:pointer"
          disabled={!isButtonEnabled} // Disable button when form is invalid
          onClick={isSignUpMode ? signUp : signIn}
        >
          {isSignUpMode ? "Sign Up" : "Sign In"}
        </button>
        <p className="text-black dark:text-white mt-2">
          {isSignUpMode ? "Already have an account?" : "Don't have an account?"}
          <span className="text-blue-500 cursor-pointer hover:underline" onClick={toggleMode}>
            {isSignUpMode ? " Sign In" : " Sign Up"}
          </span>
        </p>
      </div>
    </div>
  );
};

export default SignInUp;
