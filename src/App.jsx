import { useState } from "react";
import reactLogo from "./assets/react.svg";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import viteLogo from "/vite.svg";
import "./App.css";
import DashboardLayout from "./pages/dasboardLayout";
import Dashboard from "./pages/dashboard";
import Courses from "./pages/courses";
import Students from "./pages/students";
import Teachers from "./pages/teachers";
import Login from "./pages/login";
import { useGlobal } from "../context/GlobalContext";
import AddStudent from "./components/addStudent";
import Class from "./pages/class";

function App() {
  const path = window.location.pathname;
  const { currentUser, token } = useGlobal();
  return (
      <div>
      <AddStudent/>
        <div
          className={`py-1.5 px-1.5 text-sm  bg-[#363b3f] flex justify-between items-center text-white  ${
            path === "/" ? "hidden" : ""
          }`}
        >
          <div className="flex space-x-2 ">
            <p>Logo</p>
            <p>Home</p>
            <p>WP LMS</p>
            <p>+New</p>
          </div>
          <div className="flex items-center space-x-2.5">
            <h3 className="font-semibold capitalize">{currentUser ? currentUser.name : ""}</h3>
            <img
              src="https://secure.gravatar.com/avatar/0a86ab1bb7f6b1607d8a425214b43925?s=52&d=mm&r=g"
              alt=""
              className="h-4 w-4 object-contain"
            />
          </div>
        </div>
        <div className="flex">
          <DashboardLayout />
          <div className="w-full">
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/dashboard" element={<Dashboard/>} />
              <Route path="/courses" element={<Courses />} />
              <Route path="/students" element={<Students />} />
              <Route path="/teachers" element={<Teachers />} />
              <Route path="/classes" element={<Class />} />
            </Routes>
          </div>
        </div>
      </div>
  );
}

export default App;
