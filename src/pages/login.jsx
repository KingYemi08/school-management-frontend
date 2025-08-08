import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { useGlobal } from "../../context/GlobalContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { IoIosContact } from "react-icons/io";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { FaCheck } from "react-icons/fa";

export default function Login() {
  const { loginForm, loginChange, LoginUser, login, base_url } = useGlobal();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  // const handleLogin = (e) => {
  //   e.preventDefault();
  //   try {
  //     if (!loginForm.email || !loginForm.password) return;
  //     setLoading(true);
  //     LoginUser();
  //     localStorage.setItem("path", "/dashboard");
  //   } catch (error) {
  //     console.log(error);
  //     setLoading(false);
  //   }
  // };
  const testLogin = async (e) => {
    e.preventDefault();
    if (!loginForm.email || !loginForm.password) return;
    setLoading(true);
    try {
      const res = await axios.post(`${base_url}/login`, loginForm);
      const { data, token } = res.data;
      if (data && token) {
        login(data, token);
        setLoading(false)
        toast.success("Login Sucessfull", {
          position: "top-right",
          autoClose: 3000,
          closeOnClick: true
        },)
        setTimeout(()=>{
          navigate("/dashboard");
        },4000)
      } else {
        console.error("User or token Missing");
      }
    } catch (error) {
      console.error(error);
      setLoading(false);
      alert("Invalid Username or Password")
    }
  };
  return (
    <div className="flex flex-col min-h-screen bg-[#00325c] items-center justify-center">
      <div>
        <IoIosContact size={110} color="white" className="mr-2" />
      </div>
      <div className="flex items-center pt-2 pb-5 text-white space-x-3">
        <div className="border-t-1 border-white w-45"></div>
        <div>
          <h2 className="text-3xl mb-1 font-light">Sign In</h2>
        </div>
        <div className="border-t-1 border-white w-45"></div>
      </div>
      <div className="min-w-118 py-12 text-gray-400">
        <form action="" onSubmit={testLogin}>
          <div>
            <div className="border flex items-center bg-white outline-0 ps-1.5">
              <MdEmail size={20} className="text-gray-400" />
              <input
                type="email"
                name="email"
                value={loginForm.email}
                onChange={loginChange}
                placeholder="Email"
                className="py-2 outline-0 w-full ps-2 placeholder:text-gray-400"
              />
            </div>
          </div>
          <div className="mt-5">
            <div className="border flex items-center bg-white outline-0 ps-1.5">
              <RiLockPasswordFill size={20} className="text-gray-400" />
              <input
                type="password"
                name="password"
                value={loginForm.password}
                onChange={loginChange}
                placeholder="Password"
                className="py-2 outline-0 w-full ps-2 placeholder:text-gray-400"
              />
            </div>
          </div>
          <div className="mt-2 flex items-end text-white justify-end">
            <h3 className="cursor-pointer hover:underline hover:text-blue-500 transition-all">
              Forget Password?
            </h3>
          </div>
          <div className="pt-15">
            {loading ? (
              <button className="bg-blue-400 w-full  text-white animate-pulse py-2 mt-3  cursor-pointer">
                Loading.....
              </button>
            ) : (
              <button className="bg-blue-400 w-full hover:underline text-white py-2 mt-3  cursor-pointer">
                Login
              </button>
            )}
          </div>
          {/* <div className="relative">
            <input type="text" className="bg-white w-full py-2 ps-2 outline-0 inp" />
            <label htmlFor="" className="absolute top-2 left-2">Email</label>
          </div> */}
          <div className="mt-1 text-center">
            <h2 className="text-blue-600 text-sm">
              Want to be an admin?
              <span className="ml-2 cursor-pointer text-white hover:underline transition-all">
                Click here
              </span>
            </h2>
          </div>
        </form>
      </div>
      <ToastContainer/>
    </div>
  );
}
