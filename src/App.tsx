
import { BrowserRouter, Route, Router, Routes } from 'react-router-dom'
import './App.css'
import DarkModeButton from './components/ThemeSwitcher'
import SignInUp from './modules/SignInUp/SignInUp'
import Dashboard from './modules/Dashboard/Dashboard'
import { ThemeProvider } from "@material-tailwind/react";
import Logout from './components/Logout'
import { useState, useEffect } from 'react'

function App() {
  const customTheme = {}

  const [isHomePage, setIsHomePage] = useState(false);

  useEffect(() => {
    setIsHomePage(window.location.pathname === '/');
  }, []);
  return (
    <>
      <ThemeProvider value={customTheme}>
        <div className='bg-slate-200 dark:bg-gray-900 h-[60px] w-full p-6 transition-colors duration-500 ease-in-out'>
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

    </>


  )
}

export default App
