import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from "react-router-dom";

import Login from "./components/login";
import SignUp from "./components/register";
import Profile from "./components/profile";
import CalendarPage from './components/Calendar';
import Calculator from './components/Calculator';
import UserList from './components/UserList';
import WeatherWidget from './components/WeatherWidget';

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Dashboard from "./components/dashboard";
import { auth } from "./components/firebase";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Subscribe to auth state changes
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user); // Update user state when auth state changes
    });

    // Unsubscribe from auth state changes when component unmounts
    return () => unsubscribe();
  }, []);

  return (
    <Router>
      <div className="App">
        {user ? ( // If user is authenticated
          <div className="auth-wrapper">
            <div className="auth-inner">
              <Routes>
                {/* Redirect to dashboard for these paths if authenticated */}
                <Route path="/" element={<Navigate to="/dashboard" />} />
                <Route path="/login" element={<Navigate to="/dashboard" />} />
                <Route path="/signup" element={<Navigate to="/dashboard" />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/calendar" element={<CalendarPage />} />
                <Route path="/calculator" element={<Calculator />} />
                <Route path="/userlist" element={<UserList />} />
                <Route path="/weather" element={<WeatherWidget />} />
              </Routes>
              <ToastContainer />
            </div>
          </div>
        ) : ( // If user is not authenticated
          <Routes>
            {/* Render login or signup based on path */}
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
          </Routes>
        )}
      </div>
    </Router>
  );
}

export default App;
