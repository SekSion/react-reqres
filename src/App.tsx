import { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import DarkModeButton from "./components/ThemeSwitcher";
import SignInUp from "./modules/SignInUp/SignInUp";
import Dashboard from "./modules/Dashboard/Dashboard";
import { ThemeProvider } from "@material-tailwind/react";
import Logout from "./components/Logout";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "./services/Contexts/AuthContext";

function App() {
  const [isHomePage, setIsHomePage] = useState(false);

  useEffect(() => {
    setIsHomePage(isPathHomePage());
  }, []);

  const isPathHomePage = () => {
    return window.location.pathname === "/";
  };

  return (
    <>
      <AuthProvider>
        <ThemeProvider>
          <div className="bg-slate-200 dark:bg-gray-900 h-[60px] w-full p-6 ">
            <DarkModeButton />
            {!isHomePage && <Logout />}
          </div>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<SignInUp />} />
              <Route path="/dashboard" element={<Dashboard />} />
            </Routes>
          </BrowserRouter>
        </ThemeProvider>
        <Toaster
          position="top-right"
          toastOptions={{
            className: "dark:bg-gray-900 dark:text-white",
          }}
        />
      </AuthProvider>
    </>
  );
}

export default App;
