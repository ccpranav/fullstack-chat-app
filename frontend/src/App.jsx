import React, { useEffect } from "react";
import Navbar from "./components/Navbar";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
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
import SignupForm from "./components/new/SignupForm";
import SignupFormNew from "./pages/SignupFormNew";
import LoginPageNew from "./pages/LoginPageNew";
import Navbarnew from "./components/Navbarnew";
import Trial from "./components/trial";
import Trial2 from "./components/trial2";

const Layout = () => {
  return (
    <>
      <Navbar />
      {/* Apply pt-16 only when noPadding is false */}
      <main className="pt-16">
        <Outlet />
      </main>
    </>
  );
};

const App = () => {
  const { authUser, checkAuth, isCheckingAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  // console.log("Consoling...", authUser);

  if (isCheckingAuth && !authUser)
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin" />
      </div>
    );
  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <Routes>
        <Route element={<Layout />}>
          <Route
            path="/"
            element={authUser ? <HomePage /> : <Navigate to="/loginnew" />}
          />
          <Route path="/trial" element={<Trial />} />
          <Route path="/trial2" element={<Trial2 />} />
          <Route
            path="/signup"
            element={!authUser ? <SingnUpPage /> : <Navigate to="/" />}
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
            path="/signupnew"
            element={!authUser ? <SignupFormNew /> : <Navigate to="/" />}
          />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/test" element={<SignupForm />} />
          <Route
            path="/profile"
            element={authUser ? <ProfilePage /> : <Navigate to="/login" />}
          />
        </Route>
        {/* <Route element={<Layout noPadding={true} />}>
          
        </Route> */}
      </Routes>
    </>
  );
};

export default App;
