// Import necessary modules
import { BrowserRouter, Routes, Route, useLocation, Navigate } from 'react-router-dom'; // Import Routes and Route
import './App.css';
import DarkModeButton from './components/ThemeSwitcher';
import SignUp from './modules/SignInUp/SignUp';
import Dashboard from './modules/Dashboard/Dashboard';
import { ThemeProvider } from '@material-tailwind/react';
import Logout from './components/Logout';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './services/Contexts/AuthContext';
import SignIn from './modules/SignInUp/SignIn';

function Header() {
  const location = useLocation();
  const isHomePage = location.pathname === '/sign-in' || location.pathname === '/sign-up';

  return (
    <div className="bg-slate-200 dark:bg-gray-900 h-[60px] w-full p-6">
      <DarkModeButton />
      {!isHomePage && <Logout />}
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path="/sign-up" element={<SignUp />} />
            <Route path="/sign-in" element={<SignIn />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="*" element={<Navigate to={'/sign-up'} />} />
          </Routes>
          <Toaster
            position="top-right"
            toastOptions={{
              className: 'dark:bg-gray-900 dark:text-white',
            }}
          />
        </BrowserRouter>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
