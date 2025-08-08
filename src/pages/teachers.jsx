import { useEffect, useState } from "react";
import { useGlobal } from "../../context/GlobalContext";
import { GrAdd } from "react-icons/gr";
import { BsSearch } from "react-icons/bs";
import AddStudent from "../components/addStudent";
import { BiDotsVertical } from "react-icons/bi";
import { HiDotsVertical } from "react-icons/hi";
import axios from "axios";

const Teachers = () => {
  const {
    students,
    teachers,
    teacherLoading,
    getTeacher,
    getClass,
    currentUser,
    studentError,
    userRole,
    getStudentById,
    getTeacherById,
    openOverlay,
    setIsEditing,
    setStudentForm,
    singleStudent,
    setSingleStudent,
    deleteStudent,
    setOverlAppear,
    courses,
    getStudentUserById,
    getCourses,
    setEditingStudentId,
  } = useGlobal();
  const [searchInput, setSearchInput] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [dropDown, setDropDown] = useState(null);
  const [sortedTeacher, setSortedTeacher] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(9);
  const startSlice = (currentPage - 1) * itemsPerPage;
  const totalPages = Math.ceil(teachers.length / itemsPerPage);
  const newTeacher = teachers.filter((student) => {
    const name = student.name.toLowerCase();
    const email = student.email.toLowerCase();
    if (searchInput !== "")
      return (
        name.includes(searchInput.toLowerCase()) ||
        email.includes(searchInput.toLowerCase())
      );
    return students;
  });
  const setPage = (page) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };
  useEffect(() => {
    setSortedTeacher(
      teachers.sort((a, b) => {
        const name_a = a.name.toUpperCase();
        const name_b = b.name.toUpperCase();
        if (name_a < name_b) {
          return -1;
        }
        if (name_a > name_b) {
          return 1;
        }
        return 0;
      })
    );
  }, [getTeacher]);
  // console.log(teachers);
  useEffect(() => {
    if (userRole === "student" || userRole === "prefect") {
      getStudentUserById(currentUser._id);
    } else {
      if (currentUser.role === "admin") {
        getTeacher();
        getCourses();
        getClass();
      }
      getTeacherById(currentUser._id);
    }
  }, []);
  if (currentUser.role === "teacher")
    return (
      <div>
        <div className="flex  p-4 justify-between">
          <div>
            <p className="text-sm ">
              Status:{" "}
              <small className="text-green-500">
                {currentUser ? (currentUser.isLoggedIn ? "Online" : "") : ""}
              </small>
            </p>
          </div>
          <div className="border h-40 w-40">
            <img
              src={currentUser ? currentUser.avatar : null}
              className="h-full w-full"
              alt=""
            />
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4 p-5">
          <div>
            <p>Name: {currentUser ? currentUser.name : ""}</p>
          </div>
          <div>
            <p>Gender: {currentUser ? currentUser.gender : ""}</p>
          </div>
          <div>
            <p>Email Account: {currentUser ? currentUser.email : ""}</p>
          </div>
          <div>
            <p className="capitalize">
              Role: {currentUser ? currentUser.role : ""}
            </p>
          </div>
          <div className="py-2 capitalize">
            <p>
              Class:{" "}
              {currentUser && currentUser.class ? (
                <span>{currentUser.class.grade}</span>
              ) : (
                <span>No class available</span>
              )}
            </p>
          </div>
        </div>
      </div>
    );
  if (currentUser.role === "student" || currentUser.role === "prefect") {
    return (
      <div className="min-h-[95vh] flex items-center justify-center">
        401 Not Authorized
      </div>
    );
  }
  return (
    <>
      <div className="p-4">
        <div className="">
          <h2 className="font-semibold text-[#00325c] text-2xl underline">
            View all Teachers
          </h2>
          <div className="flex justify-between py-4 items-center">
            <div className="border flex justify-between  border-[#00325c] overflow-hidden rounded min-w-100">
              <input
                type="text"
                className=" ps-1.5 min-w-90 py-1 outline-0 rounded placeholder:text-sm"
                placeholder="Search for student by name or email"
                value={searchInput}
                onChange={(e) => {
                  setSearchInput(e.target.value);
                  if (searchInput === "" || searchInput.length === 1)
                    return setIsSearching(false);
                }}
              />
              <button
                className="bg-[#00325c] object-cover px-2 cursor-pointer text-sm text-white py-1"
                onClick={() => {
                  setIsSearching(true);
                }}
              >
                <BsSearch />
              </button>
            </div>
            <button
              onClick={() => {
                setOverlAppear("teacherForm");
                openOverlay();
              }}
              className="bg-[#00325c] flex cursor-pointer hover:bg-blue-950 items-center text-sm gap-1 text-white rounded px-4 py-1.5"
            >
              Add Teacher <GrAdd />
            </button>
          </div>
          <div className="pb-4">
            <select
              onChange={(e) => {
                setItemsPerPage(e.target.value);
              }}
              className="min-w-20 focus:outline-2 focus:outline-[aqua] border border-gray-300 ps-0.5 py-1 placeholder:text-sm rounded"
            >
              <option value="9">9</option>
              <option value="15">15</option>
              <option value="20">20</option>
            </select>
          </div>
          <div>
            {teacherLoading ? (
              <div className="min-h-100 flex items-center justify-center">
                <p className="animate-pulse text-[#00325c]">Loading...</p>
              </div>
            ) : teachers.length === 0 ? (
              <div className="min-h-100 flex items-center justify-center">
                <p className="animate-pulse text-[#00325c] text-xl">
                  No teachers found...
                </p>
              </div>
            ) : (
              <table className=" w-full  rounded">
                <thead>
                  <tr className="bg-[#00325c] text-white h-8">
                    <th>S/N</th>
                    <th>Name</th>
                    <th>Age</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Course</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  {isSearching
                    ? newTeacher
                        .slice(startSlice, startSlice + itemsPerPage)
                        .map((student, index) => {
                          return (
                            <tr
                              key={index}
                              className="h-9 font-normal border-b border-gray-200"
                            >
                              <td className="text-center">{index + 1}</td>
                              <td className="text-center capitalize">
                                {student.name}
                              </td>
                              <td className="text-center">{student.age}</td>
                              <td className="text-center">{student.email}</td>
                              <td className="capitalize text-center">
                                {student.role}
                              </td>
                              <td className="capitalize text-center">
                                {student.courses.map((s) => (
                                  <td>{s.title}</td>
                                ))}
                              </td>
                              <td
                                className="flex pt-1.5 justify-center"
                                onMouseOut={() => {
                                  setDropDown(null);
                                }}
                                onMouseOver={() => {
                                  setDropDown(index);
                                }}
                              >
                                <HiDotsVertical
                                  size={18}
                                  className="cursor-pointer"
                                />
                              </td>
                              {dropDown === index && (
                                <div
                                  className="bg-white absolute right-8 min-w-26  rounded shadow-xl overflow-hidden"
                                  onMouseOver={() => {
                                    setDropDown(index);
                                  }}
                                  onMouseOut={() => {
                                    setDropDown(null);
                                  }}
                                >
                                  <p
                                    // onClick={() => {
                                    //   setOverlAppear("studentForm");
                                    //   setIsEditing(true);
                                    //   const newStudent = students.find(
                                    //     (s) => s._id === student._id
                                    //   );
                                    //   setStudentForm({
                                    //     name: newStudent.name,
                                    //     age: newStudent.age,
                                    //     email: "",
                                    //     password: "",
                                    //   });
                                    //   setEditingStudentId(newStudent._id);
                                    //   openOverlay();
                                    // }}
                                    className="text-sm px-2 py-1.5 cursor-pointer object-cover hover:bg-gray-100"
                                  >
                                    <small>Edit</small>
                                  </p>
                                  <p
                                    // onClick={() => {
                                    //   if (confirm("Are you sure"))
                                    //     return deleteStudent(student._id);
                                    // }}
                                    className="text-sm px-2 py-1.5 cursor-pointer object-cover hover:bg-gray-100"
                                  >
                                    <small>Delete</small>
                                  </p>
                                  <p
                                    onClick={() => {
                                      setOverlAppear("profile");
                                      const newStudent = teachers.find(
                                        (s) => s._id === student._id
                                      );
                                      setSingleStudent(newStudent);
                                      openOverlay();
                                    }}
                                    className="text-sm px-2 py-1.5 cursor-pointer object-cover hover:bg-gray-100"
                                  >
                                    <small>View Profile</small>
                                  </p>
                                  <p
                                    onClick={() => {
                                      setOverlAppear("assTeach");
                                      const newTeacher = teachers.find(
                                        (s) => s._id === student._id
                                      );
                                      setEditingStudentId(newTeacher._id);
                                      openOverlay();
                                    }}
                                    className="text-sm px-2 py-1.5 cursor-pointer object-cover hover:bg-gray-100"
                                  >
                                    <small>Assign Class</small>
                                  </p>
                                </div>
                              )}
                            </tr>
                          );
                        })
                    : sortedTeacher
                        .slice(startSlice, startSlice + itemsPerPage)
                        .map((student, index) => {
                          return (
                            <tr
                              key={index}
                              className="h-9 font-normal border border-gray-200"
                            >
                              <td className="text-center">
                                {startSlice + index + 1}
                              </td>
                              <td className="text-center capitalize">
                                {student.name}
                              </td>
                              <td className="text-center">{student.age}</td>
                              <td className="text-center">{student.email}</td>
                              <td className="capitalize text-center">
                                {student.role}
                              </td>
                              <td className="">
                                {student.courses.map((s) => (
                                  <td
                                    key={s._id}
                                    className="text-center w-full flex items-center justify-center capitalize"
                                  >
                                    {s.title}
                                  </td>
                                ))}
                              </td>
                              <td
                                className="flex pt-1.5 justify-center"
                                onMouseOut={() => {
                                  setDropDown(null);
                                }}
                                onMouseOver={() => {
                                  setDropDown(index);
                                }}
                              >
                                <HiDotsVertical
                                  size={18}
                                  className="cursor-pointer"
                                />
                              </td>
                              {dropDown === index && (
                                <div
                                  className="bg-white absolute right-8 min-w-26  rounded shadow-xl overflow-hidden"
                                  onMouseOver={() => {
                                    setDropDown(index);
                                  }}
                                  onMouseOut={() => {
                                    setDropDown(null);
                                  }}
                                >
                                  <p
                                    // onClick={() => {
                                    //   setOverlAppear("studentForm");
                                    //   setIsEditing(true);
                                    //   const newStudent = students.find(
                                    //     (s) => s._id === student._id
                                    //   );
                                    //   setStudentForm({
                                    //     name: newStudent.name,
                                    //     age: newStudent.age,
                                    //     email: "",
                                    //     password: "",
                                    //   });
                                    //   setEditingStudentId(newStudent._id);
                                    //   openOverlay();
                                    // }}
                                    className="text-sm px-2 py-1.5 cursor-pointer object-cover hover:bg-gray-100"
                                  >
                                    <small>Edit</small>
                                  </p>
                                  <p
                                    // onClick={() => {
                                    //   if (confirm("Are you sure"))
                                    //     return deleteStudent(student._id);
                                    // }}
                                    className="text-sm px-2 py-1.5 cursor-pointer object-cover hover:bg-gray-100"
                                  >
                                    <small>Delete</small>
                                  </p>
                                  <p
                                    onClick={() => {
                                      setOverlAppear("profile");
                                      const newStudent = teachers.find(
                                        (s) => s._id === student._id
                                      );
                                      setSingleStudent(newStudent);
                                      openOverlay();
                                    }}
                                    className="text-sm px-2 py-1.5 cursor-pointer object-cover hover:bg-gray-100"
                                  >
                                    <small>View Profile</small>
                                  </p>
                                  <p
                                    onClick={() => {
                                      setOverlAppear("assTeach");
                                      const newTeacher = teachers.find(
                                        (s) => s._id === student._id
                                      );
                                      setEditingStudentId(newTeacher._id);
                                      openOverlay();
                                    }}
                                    className="text-sm px-2 py-1.5 cursor-pointer object-cover hover:bg-gray-100"
                                  >
                                    <small>Assign Class</small>
                                  </p>
                                </div>
                              )}
                            </tr>
                          );
                        })}
                </tbody>
              </table>
            )}
            <div className="flex items-center justify-center pt-8">
              <div className="flex space-x-5 justify-between">
                <button
                  onClick={() => {
                    setPage(currentPage - 1);
                  }}
                  className="text-sm cursor-pointer text-[#00325c]"
                >
                  Prev
                </button>
                <div className=" flex items-center space-x-2 rounded text-sm">
                  <p className="bg-[#00325c] p-1.5 rounded text-white ">
                    {currentPage}
                  </p>{" "}
                  <p className="mr-1">of </p> {totalPages}
                </div>
                <button
                  onClick={() => {
                    setPage(currentPage + 1);
                  }}
                  className="text-sm cursor-pointer text-[#00325c]"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Teachers;
