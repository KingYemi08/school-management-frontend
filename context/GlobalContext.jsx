import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const GlobalContext = createContext();

export default function GlobalProvider({ children }) {
  const base_url = "http://localhost:4000/api/v1";
  const token = `Bearer: ${localStorage.getItem("accessToken")}`;
  // const decodedToken = token ? jwtDecode(token) : null;
  const userRole = null;
  const userId = null;
  const currentUser = JSON.parse(localStorage.getItem("loggedInUser"));
  const [file, setFile] = useState();
  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });
  const [classForm, setClassForm] = useState({
    grade: "",
    section: "",
  });
  const [studentForm, setStudentForm] = useState({
    name: "",
    age: "",
    email: "",
    avatar: null,
    password: "",
    classId: "",
  });
  const [teacherForm, setTeacherForm] = useState({
    name: "",
    email: "",
    gender: "",
    password: "",
    avatar: null,
    courseId: "",
  });
  const navigate = useNavigate();
  const [accessToken, setAccessToken] = useState(null);
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [display, setDisplay] = useState(false);
  const [editingStudentId, setEditingStudentId] = useState();
  const [overlay, setOverlay] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [overlAppear, setOverlAppear] = useState("profile");
  const [students, setStudents] = useState([]);
  const [courses, setCourses] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [availableClass, setAvailableClass] = useState([]);
  const [studClass, setStudClass] = useState([]);
  const [singleStudent, setSingleStudent] = useState();
  // const [currentUser, setCurrentUser] = useState();
  const [singleClass, setSingleClass] = useState();
  const [studentPreview, setStudentPreview] = useState();
  const [teacherPreview, setTeacherPreview] = useState()
  const [course, setCourse] = useState();
  const [studentLoading, setStudentLoading] = useState(false);
  const [coursesLoading, setCoursesLoading] = useState(false);
  const [teacherLoading, setTeacherLoading] = useState(false);
  const [studentError, setStudentError] = useState("");
  // useEffect(() => {
  //   let isMounted = true;
  //   const savedUser = localStorage.getItem("loggedInUser");
  //   const savedToken = localStorage.getItem("accessToken");
  //   if (savedUser && savedToken) {
  //     try {
  //       const user = JSON.parse(savedUser);
  //       if (user && user.email) {
  //         if (isMounted) {
  //           setLoggedInUser(user);
  //           setAccessToken(savedToken);
  //         } else {
  //           throw new Error("Invaliid User Data");
  //         }
  //       }
  //     } catch (error) {
  //       localStorage.removeItem("loggedInUser");
  //       localStorage.removeItem("accessToken");
  //       if (isMounted) navigate("/")
  //     }
  //   } else {
  //     if (isMounted) navigate("/");
  //   }
  //   return () => {
  //     isMounted = false
  //   }
  // }, [navigate]);
  useEffect(() => {
    if (!currentUser) navigate("/");
  }, [navigate]);

  const loginChange = (e) => {
    const { name, value } = e.target;
    setLoginForm({ ...loginForm, [name]: value });
  };
  const classChange = (e) => {
    const { name, value } = e.target;
    setClassForm({ ...classForm, [name]: value });
  };

  const studentChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      const file = files[0];
      setStudentForm({ ...studentForm, [name]: file });
      if (file) {
        setStudentPreview(URL.createObjectURL(file));
      }
    } else {
      setStudentForm({ ...studentForm, [name]: value });
    }
  };

  const teacherChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      const file = files[0];
      setTeacherForm({ ...teacherForm, [name]: file });
      if(file){
        setTeacherPreview(URL.createObjectURL(file))
      }
    } else {
      setTeacherForm({ ...teacherForm, [name]: value });
    }
  };

  const LoginUser = async () => {
    try {
      const res = await axios.post(`${base_url}/login`, loginForm);
      if (res.data.sucess) {
        localStorage.setItem("token", res.data.token);
        window.location.href = "/dashboard";
      } else {
        alert("Invalid Credentials");
      }
    } catch (error) {
      console.log(error);
      alert(error.response.data.message);
    }
  };
  const login = (userData, token) => {
    setLoggedInUser(userData);
    setAccessToken(token);
    localStorage.setItem("loggedInUser", JSON.stringify(userData));
    localStorage.setItem("accessToken", token);
  };
  useEffect(() => {
    localStorage.setItem("path", "/dashboard");
  }, [login]);
  const getStudents = async () => {
    try {
      setStudentLoading(true);
      const res = await axios.get(`${base_url}/student`, {
        headers: {
          Authorization: `Bearer: ${localStorage.getItem("accessToken")}`,
        },
      });
      setStudents(res.data.data);
      setStudentLoading(false);
    } catch (error) {
      setStudentLoading(false);
      console.log(error);
      setStudentError(error.response.data.msg);
    }
  };
  const getStudentUserById = async (id) => {
    try {
      const res = await axios.get(`${base_url}/student/${id}`, {
        headers: {
          Authorization: token,
        },
      });
      if (!res.data.sucess) throw new Error(res.data.message);
      return await res.data.data;
    } catch (error) {
      console.log(error);
    }
  };
  const getStudentById = async (id) => {
    try {
      const res = await axios.get(`${base_url}/student/${id}`, {
        headers: {
          Authorization: token,
        },
      });
      if (!res.data.sucess) throw new Error(res.data.message);
      setSingleStudent(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  const getStudentByClass = async (id) => {
    try {
      setStudentLoading(true);
      const res = await axios.get(`${base_url}/class/student/${id}`, {
        headers: {
          Authorization: token,
        },
      });
      setStudClass(res.data.data);
      setStudentLoading(false);
    } catch (error) {
      setStudentLoading(false);
      console.log(error);
      setStudentError(error.response.data.msg);
    }
  };
  const getTeacherById = async (id) => {
    try {
      const res = await axios.get(`${base_url}/teacher/${id}`, {
        headers: {
          Authorization: token,
        },
      });
      if (!res.data.sucess) throw new Error(res.data.message);
    } catch (error) {
      console.log(error);
    }
  };
  const getCourseById = async (id) => {
    try {
      const res = await axios.get(`${base_url}/course/${id}`, {
        headers: {
          Authorization: token,
        },
      });
      setCourse(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  const addStudent = async (data) => {
    try {
      const res = await axios.post(`${base_url}/student`, studentForm, {
        headers: {
          Authorization: token,
          "Content-Type": "multipart/form-data",
        },
      });
      getStudents();
      setStudentForm({
        name: "",
        age: "",
        email: "",
        password: "",
      });
    } catch (error) {
      console.log(error);
    }
  };
  const deleteStudent = async (id) => {
    try {
      await axios.delete(`${base_url}/student/${id}`, {
        headers: {
          Authorization: token,
        },
      });
      getStudents();
    } catch (error) {
      console.log(error);
      setStudentLoading(false);
    }
  };
  const updateStudent = async (id) => {
    try {
      await axios.put(`${base_url}/student/${id}`, studentForm, {
        headers: {
          Authorization: token,
        },
      });
      getStudents();
      closeOverlay();
      setIsEditing(false);
    } catch (error) {
      console.log(error);
      setStudentLoading(false);
    }
  };
  const getCourses = async () => {
    try {
      setCoursesLoading(true);
      const res = await axios.get(`${base_url}/course`, {
        headers: {
          Authorization: token,
        },
      });
      setCourses(res.data.data);
      setCoursesLoading(false);
    } catch (error) {
      console.log(error);
      setCoursesLoading(false);
    }
  };
  const addCourse = async (title) => {
    const data = {
      title: title,
    };
    try {
      const res = await axios.post(`${base_url}/course`, data, {
        headers: {
          Authorization: token,
        },
      });
      getCourses();
    } catch (error) {
      console.log(error);
    }
  };
  const regCourse = async (id, courseId) => {
    const postedData = {
      courseId: courseId,
    };
    try {
      const res = await axios.post(`${base_url}/course/reg/${id}`, postedData, {
        headers: {
          Authorization: token,
        },
      });
    } catch (error) {
      console.log(error);
    }
  };
  const assignClass = async (id, classId) => {
    const data = {
      id: id,
    };
    try {
      const res = await axios.post(
        `${base_url}/class/regTeacher/${classId}`,
        data,
        {
          headers: {
            Authorization: token,
          },
        }
      );
    } catch (error) {
      console.log(error);
    }
  };
  const getTeacher = async () => {
    try {
      setTeacherLoading(true);
      const res = await axios.get(`${base_url}/teacher`, {
        headers: {
          Authorization: token,
        },
      });
      setTeachers(res.data.data);
      setTeacherLoading(false);
    } catch (error) {
      setTeacherLoading(false);
      console.log(error);
    }
  };
  const getClass = async () => {
    try {
      const res = await axios.get(`${base_url}/class`, {
        headers: {
          Authorization: token,
        },
      });
      setAvailableClass(res.data.data);
    } catch (error) {
      console.error(error);
    }
  };
  const addTeacher = async () => {
    try {
      const res = await axios.post(`${base_url}/teacher`, teacherForm, {
        headers: {
          Authorization: token,
          "Content-Type": "multipart/form-data"
        },
      });
      getTeacher();
    } catch (error) {
      console.log(error);
    }
  };
  const addClass = async () => {
    try {
      await axios.post(`${base_url}/class`, classForm, {
        headers: {
          Authorization: token,
        },
      });
      getClass();
    } catch (error) {
      console.log(error);
    }
  };
  const logout = async () => {
    const data = {
      id: currentUser._id,
    };
    const res = await axios.post(`${base_url}/logout`, data, {
      headers: {
        Authorization: token,
      },
    });
    if (!res.data.sucess) localStorage.removeItem("accessToken");
    localStorage.removeItem("loggedInUser");
  };
  const openOverlay = () => {
    setDisplay(true);
    setTimeout(() => {
      setOverlay(true);
    }, 200);
  };
  const closeOverlay = () => {
    setOverlay(false);
    setTimeout(() => {
      setDisplay(false);
    }, 200);
  };
  const values = {
    base_url,
    studentPreview,
    loginForm,
    students,
    singleStudent,
    currentUser,
    display,
    overlay,
    token,
    loggedInUser,
    isEditing,
    studentError,
    userId,
    studentForm,
    coursesLoading,
    editingStudentId,
    availableClass,
    classForm,
    overlAppear,
    singleClass,
    teacherForm,
    courses,
    teacherPreview,
    availableClass,
    accessToken,
    teachers,
    studClass,
    course,
    teacherLoading,
    studentLoading,
    userRole,
    addCourse,
    setStudents,
    classChange,
    addClass,
    openOverlay,
    setStudentPreview,
    addTeacher,
    setTeacherPreview,
    getTeacher,
    deleteStudent,
    getCourseById,
    setOverlay,
    getStudentByClass,
    assignClass,
    closeOverlay,
    setClassForm,
    getStudentUserById,
    updateStudent,
    setEditingStudentId,
    setSingleClass,
    setSingleStudent,
    teacherChange,
    setFile,
    setDisplay,
    login,
    setOverlAppear,
    getClass,
    setIsEditing,
    addStudent,
    loginChange,
    getStudents,
    setStudentForm,
    studentChange,
    getTeacherById,
    getStudentById,
    LoginUser,
    setTeacherForm,
    getCourses,
    logout,
    regCourse,
  };
  return (
    <GlobalContext.Provider value={values}>{children}</GlobalContext.Provider>
  );
}

export const useGlobal = () => {
  return useContext(GlobalContext);
};
