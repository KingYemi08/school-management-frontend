import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useGlobal } from "../../context/GlobalContext";

export default function DashboardLayout() {
  const path = window.location.pathname;
  const [activePath, setActivePath] = useState(() => {
    const path = localStorage.getItem("path");
    return path;
  });
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { logout, currentUser } = useGlobal();
  const logOut = async () => {
    try {
      setLoading(true);
      await logout();
      setLoading(false);
      window.location.href = "/";
    } catch (error) {
      console.log(error);
      setLoading(false)
    }
  };
  useEffect(() => {
    setActivePath(path);
  }, [navigate]);
  if (currentUser)
    return (
      <div
        className={`min-h-[95.5vh] hide overflow-y-scroll  bg-[#00325c] text-white w-[18%]  ${
          path === "/" ? "hidden" : ""
        }`}
      >
        <h2 className="py-2 border-b-2 px-1.5 border-white">WP LWS</h2>
        <ul className="text-sm ">
          <Link to="/dashboard">
            <li
              className={`py-2 px-1.5 hover:bg-white hover:text-[#00325c] transition-all cursor-pointer ${
                activePath === "/dashboard" ? "bg-white text-[#00325c]" : ""
              }`}
              onClick={() => {
                localStorage.setItem("path", "/dashboard");
                setActivePath("/dashboard");
              }}
            >
              Dashboard
            </li>
          </Link>
          {currentUser.role !== "student" && currentUser.role !== "prefect" && (
            <Link to="/teachers ">
              <li
                className={`py-2 px-1.5 hover:bg-white hover:text-[#00325c] transition-all cursor-pointer ${
                  activePath === "/teachers" ? "bg-white text-[#00325c]" : ""
                }`}
                onClick={() => {
                  localStorage.setItem("path", "/teachers");
                  setActivePath("/teachers");
                }}
              >
                {currentUser.role === "teacher" ? "Profile" : "Teachers"}
              </li>
            </Link>
          )}
          <Link to="/courses ">
            <li
              className={`py-2 px-1.5 hover:bg-white hover:text-[#00325c] transition-all cursor-pointer ${
                activePath === "/courses" ? "bg-white text-[#00325c]" : ""
              }`}
              onClick={() => {
                localStorage.setItem("path", "/courses");
                setActivePath("/courses");
              }}
            >
              Courses
            </li>
          </Link>
          <Link to="/students ">
            <li
              className={`py-2 px-1.5 hover:bg-white hover:text-[#00325c] transition-all cursor-pointer ${
                activePath === "/students" ? "bg-white text-[#00325c]" : ""
              }`}
              onClick={() => {
                localStorage.setItem("path", "/students");
                setActivePath("/students");
              }}
            >
              {currentUser.role === "student" ? "Profile" : "Students"}
            </li>
          </Link>
          {currentUser.role === "admin" && (
            <Link to="/classes ">
              <li
                className={`py-2 px-1.5 hover:bg-white hover:text-[#00325c] transition-all cursor-pointer ${
                  activePath === "/classes" ? "bg-white text-[#00325c]" : ""
                }`}
                onClick={() => {
                  localStorage.setItem("path", "/classes");
                  setActivePath("/classes");
                }}
              >
                Classes
              </li>
            </Link>
          )}
        </ul>
        <div className="mt-auto w-[18%]">
          <button
            onClick={logOut}
            className={`w-[15.2%] fixed bottom-0 bg-[#363b3f] text-white text-center py-2  transition-all cursor-pointer ${
              loading ? "animate-pulse" : ""
            }`}
          >
            {loading ? "Logging out...." : "Logout"}
          </button>
        </div>
      </div>
    );
}
