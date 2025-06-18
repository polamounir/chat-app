import { Routes, Route, useLocation } from "react-router-dom";
import Login from "../pages/Login";
import Register from "../pages/Register";

import Home from "../pages/Home";
import Navbar from "../components/Navbar";
import About from "../pages/About";
import Friends from "../pages/Friends";
import NotFoundPage from "../pages/NotFoundPage";
import Profile from "../pages/Profile";


export default function AppRoutes() {


  return (
    <>
    <div className="flex flex-col lg:flex-row min-h-screen ">

      <Navbar />
      <div className="bg-gradient-to-br from-indigo-50 to-indigo-50 min-h-screen p-4 pt-20 lg:py-4 flex-1 ">
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
    </div>
    </>
  );
}
