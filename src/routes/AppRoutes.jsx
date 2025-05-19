import { Routes, Route } from "react-router-dom";
import Login from "../pages/Login";
import Register from "../pages/Register";

import Home from "../pages/Home";
import Navbar from "../components/Navbar";
import About from "../pages/About";
import Friends from "../pages/Friends";
import NotFoundPage from "../pages/NotFoundPage";

export default function AppRoutes() {
  return (
    <>
      <Navbar />
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 min-h-screen p-4 py-20 ">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/about" element={<About />} />
          <Route path="/friends" element={<Friends />} />

          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
    </>
  );
}
