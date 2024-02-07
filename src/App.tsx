import { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import DarkModeButton from "./components/ThemeSwitcher";
import SignInUp from "./modules/SignInUp/SignInUp";
import Dashboard from "./modules/Dashboard/Dashboard";
import { ThemeProvider } from "@material-tailwind/react";
import Logout from "./components/Logout";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "./services/Contexts/AuthContext";

function Header() {
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  return (
    <div className="bg-slate-200 dark:bg-gray-900 h-[60px] w-full p-6 ">
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
            <Route path="/" element={<SignInUp />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
          <Toaster
            position="top-right"
            toastOptions={{
              className: "dark:bg-gray-900 dark:text-white",
            }}
          />
        </BrowserRouter>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
