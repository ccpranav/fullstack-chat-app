import React, { useEffect } from "react";
import Navbar from "../../trash/Navbar";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
  useLocation,
} from "react-router-dom";
import { Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage";
import SingnUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import SettingsPage from "./pages/SettingsPage";
import ProfilePage from "./pages/ProfilePage";
import { useAuthStore } from "./store/useAuthStore";
import { Loader } from "lucide-react";
import { Toaster } from "react-hot-toast";
import LoginPageNew from "./pages/LoginPageNew";
import NewSignup from "./pages/NewSignup";
import Mockery from "./pages/Mockery";
import NotFound from "./pages/NotFound";
import Header from "./components/Header";

const App = () => {
  const { authUser, checkAuth, isCheckingAuth, onlineUsers } = useAuthStore();
  const loacation = useLocation();

  console.log({ onlineUsers });

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isCheckingAuth && !authUser)
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin" />
      </div>
    );

  const hideHeader = location.pathname === "/";

  return (
    <div>
      <Toaster position="top-center" reverseOrder={false} />
      {!hideHeader && <Header />}
      <Routes>
        <Route
          path="/"
          element={authUser ? <HomePage /> : <Navigate to="/loginnew" />}
        />
        <Route
          path="/login"
          element={!authUser ? <LoginPage /> : <Navigate to="/" />}
        />
        <Route
          path="/loginnew"
          element={!authUser ? <LoginPageNew /> : <Navigate to="/" />}
        />
        <Route
          path="/signup"
          element={!authUser ? <SingnUpPage /> : <Navigate to="/" />}
        />
        <Route
          path="/signupnew"
          element={!authUser ? <NewSignup /> : <Navigate to="/" />}
        />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/givemoney" element={<Mockery />} />
        <Route
          path="/profile"
          element={authUser ? <ProfilePage /> : <Navigate to="/loginnew" />}
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
};

export default App;
