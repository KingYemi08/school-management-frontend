import { useState } from "react";
import { useGlobal } from "../../context/GlobalContext";
import { GiCancel } from "react-icons/gi";
import NewStudent from "./newStudent";
import axios from "axios";

const AddStudent = () => {
  const {
    display,
    overlay,
    addStudent,
    isEditing,
    base_url,
    token,
    singleClass,
    singleStudent,
    classForm,
    classChange,
    overlAppear,
    studentForm,
    closeOverlay,
    assignClass,
    getStudents,
    teacherPreview,
    setTeacherPreview,
    availableClass,
    addCourse,
    studentChange,
    updateStudent,
    editingStudentId,
    getStudentByClass,
    courses,
    regCourse,
    addClass,
    setStudentPreview,
    studentPreview,
    currentUser,
    teacherChange,
    setClassForm,
    teacherForm,
    addTeacher,
    setTeacherForm,
  } = useGlobal();
  const [confirmPassword, setConfirmPassword] = useState("");
  const [classId, setClassId] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [courseId, setCourseId] = useState([]);
  const [title, setTitle] = useState("");

  const registerData = async (e) => {
    e.preventDefault();
    if (
      !studentForm.name ||
      !studentForm.email ||
      !studentForm.password ||
      !studentForm.age ||
      !studentForm.classId ||
      confirmPassword === ""
    )
      return setError("Please Fill all fields");
    try {
      setLoading(true);
      await addStudent();
      setLoading(false);
      setConfirmPassword("");
      closeOverlay();
      setStudentPreview("");
      setError("");
    } catch (error) {
      console.log(error);
      setLoading(false);
      setError(error.message);
      setStudentPreview("");
    }
  };
  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   setLoading(true)
  //   try {
  //     const data = new FormData();
  //     data.append('name', studentForm.name);
  //     data.append('age', studentForm.age);
  //     data.append('email', studentForm.email);
  //     data.append('password', studentForm.password);
  //     if (studentForm.avatar) {
  //       data.append('avatar', studentForm.avatar);
  //     }

  //     const res = await axios.post(`${base_url}/student`, data, {
  //       headers: {
  //         'Authorization': token,
  //         'Content-Type': 'multipart/form-data',
  //       },
  //     });
  //     setLoading(false)
  //     closeOverlay()
  //     getStudents()
  //     console.log('✅ Student created:', res.data);
  //   } catch (err) {
  //     setLoading(false)
  //     console.error('❌ Error:', err.response?.data || err.message);
  //   }
  // };
  const registerCourse = async (course) => {
    if (courseId.includes(course._id)) {
      setCourseId((prev) => prev.filter((p) => p !== course._id));
    } else {
      setCourseId((prev) => [...prev, course._id]);
    }
  };
  const register = async (id, courseId) => {
    try {
      setLoading(true);
      await regCourse(id, courseId);
      setLoading(false);
      if (currentUser.role === "teacher") {
        getStudentByClass(currentUser.class._id);
      } else {
        getStudents();
      }
      closeOverlay();
    } catch (error) {
      console.log(error);
    }
  };
  const assign = async (e) => {
    e.preventDefault();
    if (classId === "") return setError("Please Fill all fields");
    try {
      setLoading(true);
      await assignClass(editingStudentId, classId);
      setLoading(false);
      getStudents();
      closeOverlay();
    } catch (error) {
      console.log(error);
    }
  };
  const postTeacher = async () => {
    if (
      !teacherForm.name ||
      !teacherForm.email ||
      !teacherForm.password ||
      !teacherForm.gender ||
      !teacherForm.courseId
    ) {
      return setError("Please Fill all fields");
    }
    try {
      setLoading(true);
      await addTeacher();
      setLoading(false);
      setTeacherForm({
        name: "",
        email: "",
        gender: "",
        password: "",
        courseId: "",
        avatar: null
      });
      setTeacherPreview("")
      closeOverlay();
    } catch (error) {
      console.log(error);
      setLoading(false);
      closeOverlay();
    }
  };
  const postClass = async (e) => {
    e.preventDefault();
    if (!classForm.grade || !classForm.section)
      return setError("Please fill all Fields");
    try {
      setLoading(true);
      await addClass();
      setLoading(false);
      setClassForm({
        grade: "",
        section: "",
      });
      closeOverlay();
    } catch (error) {
      console.log(error);
      setError(error);
      setLoading(false);
    }
  };
  // console.log(singleStudent);
  if (display)
    return (
      <div
        className={`bg-[#00000049] top-0 fixed transition-all w-full min-h-screen z-10 ${
          display ? "opacity-0" : ""
        } ${overlay ? "opacity-100" : ""}`}
      >
        {overlAppear === "studentForm" ? (
          <div className="h-screen w-full flex items-center justify-center">
            <div className="bg-white text-[#00325c] shadow-xl rounded max-w-132 px-4 py-2">
              <div className="flex justify-between">
                <h2 className="underline">Add Student</h2>
                <GiCancel
                  onClick={() => {
                    closeOverlay();
                  }}
                  size={18}
                  className="cursor-pointer hover:scale-105"
                />
              </div>
              <form
                onSubmit={(e) => {
                  if (isEditing) {
                    e.preventDefault();
                    updateStudent(editingStudentId);
                  } else {
                    // handleSubmit(e)
                    registerData(e);
                  }
                }}
                className="py-2"
              >
                <div className="grid grid-cols-2 gap-2">
                  <div className="py-1">
                    <label htmlFor="">Full name:</label>
                    <input
                      type="text"
                      placeholder="Enter name.."
                      name="name"
                      className="w-full placeholder:text-sm placeholder:text-gray-400 mt-0.5 border focus:outline-2 focus:outline-[aqua] border-gray-300 rounded ps-1.5 py-1"
                      value={studentForm.name}
                      onChange={studentChange}
                    />
                  </div>
                  <div className="py-1">
                    <label htmlFor="">Age:</label>
                    <input
                      type="text"
                      placeholder="Enter age.."
                      className="w-full placeholder:text-sm placeholder:text-gray-400 mt-0.5 border focus:outline-2 focus:outline-[aqua] border-gray-300 rounded ps-1.5 py-1"
                      value={studentForm.age}
                      onChange={studentChange}
                      name="age"
                    />
                  </div>
                </div>
                <div className="py-1">
                  <label htmlFor="">Email:</label>
                  <input
                    type="text"
                    disabled={isEditing}
                    placeholder="Enter email..."
                    className="w-full placeholder:text-sm placeholder:text-gray-400 mt-0.5 border focus:outline-2 focus:outline-[aqua] border-gray-300 rounded ps-1.5 py-1"
                    value={studentForm.email}
                    onChange={studentChange}
                    name="email"
                  />
                </div>
                <div className="py-1">
                  <label htmlFor="">Class:</label>
                  <select
                    name="classId"
                    disabled={isEditing}
                    value={studentForm.classId}
                    onChange={studentChange}
                    className="w-full placeholder:text-sm placeholder:text-gray-400 mt-0.5 border focus:outline-2 focus:outline-[aqua] border-gray-300 rounded ps-0.5 py-1"
                  >
                    <option value="">Select a class</option>
                    {availableClass.map((c) => {
                      return (
                        <option key={c._id} value={c._id}>
                          {c.grade}
                        </option>
                      );
                    })}
                  </select>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div className="py-1">
                    <label htmlFor="">Password:</label>
                    <input
                      type="password"
                      placeholder="Enter password..."
                      disabled={isEditing}
                      className="w-full mt-0.5 border placeholder:text-sm placeholder:text-gray-400 focus:outline-2 focus:outline-[aqua] border-gray-300 rounded ps-1.5 py-1"
                      value={studentForm.password}
                      onChange={studentChange}
                      name="password"
                    />
                  </div>
                  <div className="py-1">
                    <label htmlFor="">Confirm Password:</label>
                    <input
                      type="password"
                      placeholder="Confirm Password..."
                      disabled={isEditing}
                      className="w-full mt-0.5 border placeholder:text-sm placeholder:text-gray-400 focus:outline-2 focus:outline-[aqua] border-gray-300 rounded ps-1.5 py-1"
                      value={confirmPassword}
                      onChange={(e) => {
                        setConfirmPassword(e.target.value);
                      }}
                    />
                  </div>
                </div>
                <div className="py-1">
                  <label htmlFor="">Profile Photo:</label>
                  <input
                    type="file"
                    disabled={isEditing}
                    className="w-full placeholder:text-sm placeholder:text-gray-400 mt-0.5 border focus:outline-2 focus:outline-[aqua] border-gray-300 rounded ps-1.5 py-1"
                    accept="image/*"
                    onChange={studentChange}
                    name="avatar"
                  />
                </div>
                {studentPreview && (
                  <img
                    src={studentPreview}
                    alt="preview"
                    className="w-32 h-32 object-cover rounded mt-2"
                  />
                )}
                {error && (
                  <p className="text-center text-sm text-red-500">{error}</p>
                )}
                <div className="flex justify-end pt-2 items-end">
                  <button
                    className={` ${
                      loading ? "animate-pulse" : ""
                    } px-3 py-1 cursor-pointer hover:bg-blue-950 rounded text-white bg-[#00325c] text-sm`}
                  >
                    {isEditing ? "Edit" : "Add"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        ) : // <NewStudent/>
        overlAppear === "profile" ? (
          <div className="h-screen w-full flex items-center justify-center">
            <div className="bg-white rounded shadow-xl text-[#00325c] min-w-150 p-5">
              <div className="flex justify-between">
                <h2 className="font-semibold text-[#00325c] text-2xl underline pb-4">
                  {(singleStudent && singleStudent.role === "teacher") ||
                  (singleStudent && singleStudent.role === "admin") ? (
                    <span>Teacher Profile</span>
                  ) : (
                    <span>Student Profile</span>
                  )}
                </h2>
                <GiCancel
                  onClick={() => {
                    closeOverlay();
                  }}
                  size={18}
                  className="cursor-pointer hover:scale-105"
                />
              </div>
              <div className="flex justify-between">
                <div className="border h-40 w-40">
                  <img
                    src={singleStudent ? singleStudent.avatar : ""}
                    className="h-full w-full"
                    alt={singleStudent ? singleStudent.name : "avatar"}
                  />
                </div>
              </div>
              <div>
                <div className="grid capitalize grid-cols-2 gap-4 pt-5">
                  <div className="py-2">
                    <p>Name: {singleStudent ? singleStudent.name : ""}</p>
                  </div>
                  <div className="py-2">
                    {singleStudent && singleStudent.gender ? (
                      <p>Gender: {singleStudent ? singleStudent.gender : ""}</p>
                    ) : (
                      <p>Age: {singleStudent ? singleStudent.age : ""}</p>
                    )}
                  </div>
                  <div className="py-2 capitalize">
                    <p>Role: {singleStudent ? singleStudent.role : ""}</p>
                  </div>
                  <div className="py-2 capitalize">
                    <p>
                      Class:{" "}
                      {singleStudent && singleStudent.class ? (
                        <span>{singleStudent.class.grade}</span>
                      ) : (
                        <span>No class available</span>
                      )}
                    </p>
                  </div>
                  <div className="py-2 lowercase">
                    <p>
                      <span className="capitalize">Email Account</span>:{" "}
                      {singleStudent ? singleStudent.email : ""}
                    </p>
                  </div>
                  <div className="py-2">
                    <p>
                      Courses:{" "}
                      {singleStudent && singleStudent.courses.length > 0
                        ? singleStudent.courses.map((s, index) => (
                            <small key={index} className="text-sm">
                              {s.title}{" "}
                              {singleStudent.courses.indexOf(s) ===
                              singleStudent.courses.length - 1
                                ? ""
                                : ", "}
                            </small>
                          ))
                        : "No course Available"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : overlAppear === "regCourse" ? (
          <div className="h-screen w-full flex items-center justify-center">
            <div className="bg-white rounded shadow-xl text-[#00325c] min-w-140 p-5">
              <div className="flex justify-between">
                <h2 className="font-semibold text-[#00325c] text-2xl underline pb-4">
                  Select Course
                </h2>
                <GiCancel
                  onClick={() => {
                    closeOverlay();
                    setCourseId([]);
                  }}
                  size={18}
                  className="cursor-pointer hover:scale-105"
                />
              </div>
              <ul className="grid grid-cols-3 gap-2  ">
                {courses.map((c, index) => {
                  return (
                    <li
                      key={index}
                      onClick={() => {
                        registerCourse(c);
                      }}
                      className={`px-2 cursor-pointer py-1 rounded ${
                        courseId.includes(c._id) ? "bg-gray-200" : "white"
                      }`}
                    >
                      {index + 1}. {c.title}
                    </li>
                  );
                })}
              </ul>
              <div className="flex justify-end pt-2 items-end">
                <button
                  onClick={() => {
                    register(editingStudentId._id, courseId);
                  }}
                  className={` ${
                    loading ? "animate-pulse" : ""
                  } px-3 py-1 cursor-pointer hover:bg-blue-950 rounded text-white bg-[#00325c] text-sm`}
                >
                  Register
                </button>
              </div>
            </div>
          </div>
        ) : overlAppear === "courseForm" ? (
          <div className="h-screen w-full flex items-center justify-center">
            <div className="bg-white rounded shadow-xl text-[#00325c] min-w-140 p-5">
              <div className="flex justify-between">
                <h2 className="font-semibold text-[#00325c] text-2xl underline pb-4">
                  Add Course
                </h2>
                <GiCancel
                  onClick={() => {
                    closeOverlay();
                  }}
                  size={18}
                  className="cursor-pointer hover:scale-105"
                />
              </div>
              <div className="py-1">
                <label htmlFor=" " className="flex items-center">
                  * Title:
                </label>
                <input
                  type="text"
                  placeholder="Enter Course Title..."
                  className="w-full placeholder:text-sm placeholder:text-gray-400 mt-0.5 border focus:outline-2 focus:outline-[aqua] border-gray-300 rounded ps-1.5 py-1"
                  value={title}
                  onChange={(e) => {
                    setTitle(e.target.value);
                  }}
                />
              </div>
              {error && (
                <p className="text-center text-sm text-red-500">{error}</p>
              )}
              <div className="flex justify-end pt-2 items-end">
                <button
                  onClick={() => {
                    if (title === "")
                      return setError("Please fill the required field");
                    addCourse(title);
                    closeOverlay();
                  }}
                  className={` ${
                    loading ? "animate-pulse" : ""
                  } px-3 py-1 cursor-pointer hover:bg-blue-950 rounded text-white bg-[#00325c] text-sm`}
                >
                  Add
                </button>
              </div>
            </div>
          </div>
        ) : overlAppear === "teacherForm" ? (
          <div className="h-screen w-full flex items-center justify-center">
            <div className="bg-white text-[#00325c] shadow-xl rounded max-w-132 px-4 py-2">
              <div className="flex justify-between">
                <h2 className="underline">Add Teacher</h2>
                <GiCancel
                  onClick={() => {
                    closeOverlay();
                  }}
                  size={18}
                  className="cursor-pointer hover:scale-105"
                />
              </div>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  postTeacher();
                }}
                className="py-2"
              >
                <div className="grid grid-cols-2 gap-2">
                  <div className="py-1">
                    <label htmlFor="">Full name:</label>
                    <input
                      type="text"
                      placeholder="Enter name.."
                      name="name"
                      className="w-full placeholder:text-sm placeholder:text-gray-400 mt-0.5 border focus:outline-2 focus:outline-[aqua] border-gray-300 rounded ps-1.5 py-1"
                      value={teacherForm.name}
                      onChange={teacherChange}
                    />
                  </div>
                  <div className="py-1">
                    <label htmlFor="">Gender:</label>
                    <input
                      type="text"
                      placeholder="Enter gender.."
                      className="w-full placeholder:text-sm placeholder:text-gray-400 mt-0.5 border focus:outline-2 focus:outline-[aqua] border-gray-300 rounded ps-1.5 py-1"
                      value={teacherForm.gender}
                      onChange={teacherChange}
                      name="gender"
                    />
                  </div>
                </div>
                <div className="py-1">
                  <label htmlFor="">Email:</label>
                  <input
                    type="text"
                    placeholder="Enter email..."
                    className="w-full placeholder:text-sm placeholder:text-gray-400 mt-0.5 border focus:outline-2 focus:outline-[aqua] border-gray-300 rounded ps-1.5 py-1"
                    value={teacherForm.email}
                    onChange={teacherChange}
                    name="email"
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div className="py-1">
                    <label htmlFor="">Password:</label>
                    <input
                      type="password"
                      placeholder="Enter password..."
                      className="w-full mt-0.5 border placeholder:text-sm placeholder:text-gray-400 focus:outline-2 focus:outline-[aqua] border-gray-300 rounded ps-1.5 py-1"
                      value={teacherForm.password}
                      onChange={teacherChange}
                      name="password"
                    />
                  </div>
                  <div className="py-1">
                    <label htmlFor="">Course Taught:</label>
                    <select
                      name="courseId"
                      className="w-full mt-0.5 border placeholder:text-sm placeholder:text-gray-400 focus:outline-2 focus:outline-[aqua] border-gray-300 rounded ps py-1"
                      onChange={teacherChange}
                      value={teacherForm.courseId}
                    >
                      <option value="">Select a course</option>
                      {courses.map((c) => (
                        <option key={c._id} value={c._id}>
                          {c.title}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="py-1">
                  <label htmlFor="">Profile Picture:</label>
                  <input
                    type="file"
                    placeholder="Enter email..."
                    className="w-full placeholder:text-sm placeholder:text-gray-400 mt-0.5 border focus:outline-2 focus:outline-[aqua] border-gray-300 rounded ps-1.5 py-1"
                    onChange={teacherChange}
                    name="avatar"
                    accept="image/*"
                  />
                </div>
                {teacherPreview && (
                  <img
                    src={teacherPreview}
                    alt="preview"
                    className="w-32 h-32 object-cover rounded mt-2"
                  />
                )}
                {error && (
                  <p className="text-center text-sm text-red-500">{error}</p>
                )}
                <div className="flex justify-end pt-2 items-end">
                  <button
                    className={` ${
                      loading ? "animate-pulse" : ""
                    } px-3 py-1 cursor-pointer hover:bg-blue-950 rounded text-white bg-[#00325c] text-sm`}
                  >
                    Add
                  </button>
                </div>
              </form>
            </div>
          </div>
        ) : overlAppear === "classForm" ? (
          <div className="h-screen w-full flex items-center justify-center">
            <div className="bg-white text-[#00325c] shadow-xl rounded min-w-132 px-4 py-2">
              <div className="flex justify-between">
                <h2 className="font-semibold text-[#00325c] text-2xl underline pb-4">
                  Add Class
                </h2>
                <GiCancel
                  onClick={() => {
                    closeOverlay();
                  }}
                  size={18}
                  className="cursor-pointer hover:scale-105"
                />
              </div>
              <form action="" onSubmit={postClass}>
                <div className="pb-2">
                  <div className="flex w-full mt-0.5 border  border-gray-300 rounded">
                    <div className="bg-gray-300 py-1.5 px-2">
                      <p>Grade</p>
                    </div>
                    <input
                      type="text"
                      name="grade"
                      placeholder="Enter grade..."
                      value={classForm.grade}
                      onChange={classChange}
                      className="w-full ps-1.5 placeholder:text-sm placeholder:text-gray-400 focus:outline-2 focus:outline-[aqua]"
                    />
                  </div>
                </div>
                <div className="py-2">
                  <div className="flex w-full mt-0.5 border  border-gray-300 rounded">
                    <div className="bg-gray-300 py-1.5 px-2">
                      <p>Section</p>
                    </div>
                    <input
                      type="text"
                      name="section"
                      placeholder="Enter section..."
                      value={classForm.section}
                      onChange={classChange}
                      className="w-full ps-1.5 placeholder:text-sm placeholder:text-gray-400 focus:outline-2 focus:outline-[aqua]"
                    />
                  </div>
                </div>
                {error && (
                  <p className="text-center text-sm text-red-500">{error}</p>
                )}
                <div className="flex justify-end pt-2 items-end">
                  <button
                    className={` ${
                      loading ? "animate-pulse" : ""
                    } px-3 py-1 cursor-pointer hover:bg-blue-950 rounded text-white bg-[#00325c] text-sm`}
                  >
                    Add
                  </button>
                </div>
              </form>
            </div>
          </div>
        ) : overlAppear === "assTeach" ? (
          <div className="h-screen w-full flex items-center justify-center">
            <div className="bg-white text-[#00325c] shadow-xl rounded min-w-132 px-4 py-2">
              <div className="flex justify-between">
                <h2 className="font-semibold text-[#00325c] text-2xl underline pb-4">
                  Assign Class
                </h2>
                <GiCancel
                  onClick={() => {
                    closeOverlay();
                  }}
                  size={18}
                  className="cursor-pointer hover:scale-105"
                />
              </div>
              <div className="py-1">
                <form action="" onSubmit={assign}>
                  <label htmlFor="">Select Class:</label>
                  <select
                    name=""
                    id=""
                    value={classId}
                    onChange={(e) => {
                      setClassId(e.target.value);
                    }}
                    className="w-full ps-0.5 placeholder:text-sm border py-1.5 rounded border-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-[aqua]"
                  >
                    <option value="">Select a Class</option>
                    {availableClass.map((c) => {
                      return (
                        <option key={c._id} value={c._id}>
                          {c.grade}
                        </option>
                      );
                    })}
                  </select>
                  {error && (
                    <p className="text-center text-sm text-red-500">{error}</p>
                  )}
                  <div className="flex justify-end pt-2 items-end">
                    <button
                      className={` ${
                        loading ? "animate-pulse" : ""
                      } px-3 py-1 cursor-pointer hover:bg-blue-950 rounded text-white bg-[#00325c] text-sm`}
                    >
                      Assign
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        ) : overlAppear === "classProfile" ? (
          <div className="h-screen w-full flex items-center justify-center">
            <div className="bg-white text-[#00325c] shadow-xl rounded min-w-132 px-4 py-2">
              <div className="flex justify-between">
                <h2 className="font-semibold text-[#00325c] text-2xl underline pb-4">
                  {singleClass ? singleClass.grade : ""}
                </h2>
                <GiCancel
                  onClick={() => {
                    closeOverlay();
                  }}
                  size={18}
                  className="cursor-pointer hover:scale-105"
                />
              </div>
              <div className="text-sm">
                <span>
                  Teacher: {singleClass ? singleClass.teacher.name : ""}
                </span>
              </div>
              <div className="py-2">
                <span className="underline font-semibold">Students</span>
                <div className="py-1 grid grid-cols-3 gap-4">
                  {singleClass.students.length === 0 ? (
                    <p className="text-sm">No students in this class...</p>
                  ) : (
                    <div>
                      {singleClass.students.map((s, index) => {
                        return (
                          <div key={s._id}>
                            {index + 1}. {s.name}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    );
};
export default AddStudent;
