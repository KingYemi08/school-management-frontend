import { Link } from "react-router-dom";
import ApexCharts from "apexcharts";
import MyChartComponent from "../components/myChart";
import Donut from "../components/myDonutChart";
import DonutChartComponent from "../components/newDonut";
import { useEffect } from "react";
import { useGlobal } from "../../context/GlobalContext";

const Dashboard = () => {
  const { getStudentById, getTeacherById,loggedInUser, userRole, currentUser, userId } =
    useGlobal();
  
  // useEffect(() => {
  //   if (loggedInUser.role === "teacher" || loggedInUser.role === "admin") {
  //     getTeacherById(userId);
  //   } else {
  //     getStudentById(userId);
  //   }
  // }, []);
  return (
    <div className="p-4 w-full bg-gray-50">
      <div className="border-b border-[#ccc] pb-3 w-full">
        <div className="overflow-hidden rounded  w-70">
          <img
            src="http://pushnifty.com/mojoomla/extend/wordpress/wplms/wp-content/uploads/2025/04/lms_logo-1.png"
            className="object-cover "
            alt=""
          />
        </div>
      </div>
      <div className="py-3 text-2xl flex justify-between items-center">
        <h2 className="capitalize">
          Welcome to the dashboard {currentUser ? currentUser.name : ""}(
          {currentUser ? currentUser.role : ""})
        </h2>
        <div className="flex items-center space-x-3">
          <div className="bg-gray-100 p-2">
            <img
              src="https://pushnifty.com/mojoomla/extend/wordpress/wplms/wp-content/plugins/wplms/assets/images/Bell-Notification.png"
              className=""
              alt=""
            />
          </div>
          <div>
            <img
              src="https://pushnifty.com/mojoomla/extend/wordpress/wplms/wp-content/plugins/wplms/assets/images/default_icon/Teacher.png"
              alt=""
              className="h-10"
            />
          </div>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white shadow-xl p-2 rounded">
          <h2>Users</h2>
          <MyChartComponent />
        </div>
        <div className="bg-[#00325c] text-white shadow-xl p-2 rounded">
          <h2>Courses</h2>
          <Donut />
        </div>
        <div className="bg-white shadow-xl p-2 rounded">
          <h2>Student Enrollment</h2>
          <DonutChartComponent />
        </div>
      </div>
    </div>
  );
};
export default Dashboard;
