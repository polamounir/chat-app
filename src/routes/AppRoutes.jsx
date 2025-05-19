import { Routes, Route, useLocation } from "react-router-dom";
import Login from "../pages/Login";
import Register from "../pages/Register";

import Home from "../pages/Home";
import Navbar from "../components/Navbar";
import About from "../pages/About";
import Friends from "../pages/Friends";
import NotFoundPage from "../pages/NotFoundPage";
import Profile from "../pages/Profile";
import AppInit from "../components/AppInit";

export default function AppRoutes() {
  // const location = useLocation();
  // const publicRoutes = ["/login", "/register"];
  // const isPublic = publicRoutes.includes(location.pathname);

  return (
    <>
      {/* {!isPublic && <AppInit />} */}
      <Navbar />
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 min-h-screen p-4 py-20 ">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/about" element={<About />} />
          <Route path="/friends" element={<Friends />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
    </>
  );
}
