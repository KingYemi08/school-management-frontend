import { GrAdd } from "react-icons/gr";
import { useGlobal } from "../../context/GlobalContext";
import { useEffect, useState } from "react";

export default function Courses() {
  const {
    userRole,
    userId,
    coursesLoading,
    getCourseById,
    getStudentUserById,
    getCourses,
    setOverlAppear,
    currentUser,
    openOverlay,
    courses,
    course,
  } = useGlobal();
  const [teachersCourses, setTeacherCourses] = useState([]);
  // useEffect(() => {
  //   if (currentUser) {
  //     if (currentUser.role === "student" || currentUser.role === "prefect") {
  //       getStudentUserById(currentUser._id);
  //     } else if (currentUser.role === "admin") {
  //       getCourses();
  //     } else {
  //       currentUser.courses.forEach((e) => {
  //         getCourseById(e);
  //       });
  //     }
  //   }
  // }, []);
  useEffect(() => {
    if (currentUser) {
      if (currentUser.role === "student" || currentUser.role === "prefect") {
        getStudentUserById(currentUser._id);
      } else {
        getCourses();
        currentUser.courses.forEach((e) => {
          getCourseById(e);
        });
      }
    }
  }, []);
  useEffect(() => {
    if (currentUser && currentUser.role === "teacher") {
      const teaherCourse = courses.filter((c) => {
        return currentUser.courses.includes(c._id);
      });
      setTeacherCourses(teaherCourse)
    }
  }, [courses]);
  if (currentUser) {
    if (currentUser.role === "student" || currentUser.role === "prefect")
      return (
        <div className="p-4 bg-gray-100 min-h-[95vh]">
          <h2 className="font-semibold text-[#00325c]  text-2xl underline">
            Courses Offered
          </h2>
          <ul className="py-2 space-y-2 font-semibold text-[#00325c]">
            {currentUser &&
              currentUser.courses.map((c, index) => {
                return (
                  <li>
                    {index + 1}. {c.title}
                  </li>
                );
              })}
          </ul>
        </div>
      );
  }
  if (currentUser && currentUser.role === "teacher")
    return (
      <div className="p-4 bg-gray-100 min-h-[95vh]">
        <h2 className="font-semibold text-[#00325c] text-2xl underline">
          Courses Taught
        </h2>
        <ul className="grid grid-cols-3 py-3 gap-4">
          {teachersCourses.map((c, index) => {
            return (
              <li className="bg-white shadow-xl rounded py-3" key={index}>
                <span className="px-1.5 font-bold">
                  {index + 1}. {c.title}
                </span>
                <p className="px-1.5 text-sm py-1">
                  <span className="font-semibold">Students</span>:{" "}
                  {c.students.length > 0
                    ? c.students.map((s, index) => (
                        <small key={index} className="text-sm capitalize">
                          {s.name}{" "}
                          {c.students.indexOf(s) === c.students.length - 1
                            ? ""
                            : ", "}
                        </small>
                      ))
                    : "No students Available"}
                </p>
              </li>
            );
          })}
        </ul>
      </div>
    );
  return (
    <div className="p-4 bg-gray-100 min-h-[95vh]">
      <h2 className="font-semibold text-[#00325c] text-2xl underline">
        View all Courses
      </h2>
      <div className="py-4">
        <button
          onClick={() => {
            setOverlAppear("courseForm");

            openOverlay();
          }}
          className="bg-[#00325c] flex cursor-pointer hover:bg-blue-950 items-center text-sm gap-1 text-white rounded px-4 py-1.5"
        >
          Add Course <GrAdd />
        </button>
      </div>
      {coursesLoading ? (
        <div className="min-h-100 flex items-center justify-center">
          <p className="animate-pulse text-[#00325c]">Loading...</p>
        </div>
      ) : courses.length === 0 ? (
        <div className="min-h-100 flex items-center justify-center">
          <p className="animate-pulse text-[#00325c] text-xl">
            No Courses found...
          </p>
        </div>
      ) : (
        <div className="py-4">
          <ul className="grid grid-cols-4 gap-2">
            {courses.map((c, index) => {
              return (
                <li className="bg-white shadow-xl rounded py-3" key={index}>
                  <span className="px-1.5 font-bold">
                    {index + 1}. {c.title}
                  </span>
                  <p className="px-1.5 text-sm py-1">
                    <span className="font-semibold">Teachers</span>:{" "}
                    {c.teacher.length > 0
                      ? c.teacher.map((s, index) => (
                          <small key={index} className="text-sm capitalize">
                            {s.name}{" "}
                            {c.teacher.indexOf(s) === c.teacher.length - 1
                              ? ""
                              : ", "}
                          </small>
                        ))
                      : "No teachers Available"}
                  </p>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}
