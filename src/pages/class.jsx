import { useEffect } from "react";
import { useGlobal } from "../../context/GlobalContext";
import { GrAdd } from "react-icons/gr";

const Class = () => {
  const {
    availableClass,
    getClass,
    currentUser,
    setSingleClass,
    openOverlay,
    setOverlAppear,
  } = useGlobal();

  useEffect(() => {
    getClass();
  }, []);
  if (
    currentUser.role === "teacher" ||
    currentUser.role === "student" ||
    currentUser.role === "prefect"
  )
    return (
      <div className="min-h-[95vh] flex items-center justify-center">
        <p>401 Not Authorized</p>
      </div>
    );
  return (
    <div className="p-4 bg-gray-100 min-h-[95vh]">
      <h2 className="font-semibold text-[#00325c] text-2xl underline">
        View all Classes
      </h2>
      <div className="py-4">
        <button
          onClick={() => {
            setOverlAppear("classForm");
            openOverlay();
          }}
          className="bg-[#00325c] flex cursor-pointer hover:bg-blue-950 items-center text-sm gap-1 text-white rounded px-4 py-1.5"
        >
          Add Class <GrAdd />
        </button>
      </div>
      <div className="py-2">
        <ul className="grid grid-cols-4 gap-2">
          {availableClass.map((c, index) => {
            return (
              <li
                onClick={() => {
                  setOverlAppear("classProfile")
                  const newClass = availableClass.find(
                    (cl) => cl._id === c._id
                  );
                  setSingleClass(newClass)
                  openOverlay()
                }}
                className="bg-white cursor-pointer shadow-xl rounded py-3"
                key={index}
              >
                <span className="px-2 font-bold">
                  {index + 1}. {c.grade}
                </span>
                <p className="px-2 capitalize text-sm pb-0.5">
                  <span className="font-semibold">Teacher</span>:{" "}
                  {c.teacher ? (
                    <small>{c.teacher.name}</small>
                  ) : (
                    <small>No teachers available</small>
                  )}
                </p>
                <p className="capitalize px-1.5 text-sm p">
                  <span className="font-semibold">Section</span>:{" "}
                  <small>{c.section}</small>
                </p>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default Class;
