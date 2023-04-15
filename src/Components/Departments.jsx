import { NavLink } from "react-router-dom";
import { Context } from "../Context/Context";
import { useContext, useState } from "react";
import { AiOutlineDownload, IoAddCircleSharp } from "../utilities/IconsImport";
import DeptModal from "./Modal Components/DeptModal";
import { useNavigate } from "react-router-dom";

const Departments = () => {
  const navigate = useNavigate();
  const { userDetails, setUserDetails } = useContext(Context);
  const { organizationDepartments, organizationDepartmentRooms } = userDetails;
  const [showModal, setShowModal] = useState(false);

  const getNoOfRooms = (id) => {
    return organizationDepartmentRooms.filter((room) => room.deptID === id)
      .length;
  };

  const downloadReport = (deptID, deptName) => {
    navigate("/pdf", {
      state: { deptID, deptName },
    });
  };

  const getIcon = (deptID) => {
    switch (deptID) {
      case "IT":
        return new URL("../assets/dept_icons/it.png", import.meta.url);

      case "CSE":
        return new URL("../assets/dept_icons/cse.png", import.meta.url);
      case "ME":
        return new URL("../assets/dept_icons/me.png", import.meta.url);
      case "ECE":
        return new URL("../assets/dept_icons/ece.png", import.meta.url);
      case "EIE":
        return new URL("../assets/dept_icons/eie.png", import.meta.url);
      case "EEE":
        return new URL("../assets/dept_icons/eee.png", import.meta.url);
      case "CE":
        return new URL("../assets/dept_icons/ce.png", import.meta.url);
      case "CHE":
        return new URL("../assets/dept_icons/che.png", import.meta.url);
      case "MT":
        return new URL("../assets/dept_icons/mt.png", import.meta.url);
      default:
        return new URL("../assets/dept_icons/dept.png", import.meta.url);
    }
  };

  return (
    <>
      <button
        className="flex justify-center items-center gap-x-2 bg-metal px-3 py-2 rounded-md mt-5 ml-auto absolute right-5"
        onClick={() => setShowModal(true)}
      >
        <p className="font-semibold text-xl">Add</p>
        <IoAddCircleSharp size={24} />
      </button>
      <div className="flex flex-col w-full mt-5 gap-y-10">
        {organizationDepartments.map((dept, idx) => (
          <div className="w-[500px] border-2 rounded-xl px-4 py-3 relative h-max text-lg">
            <NavLink key={idx} to={`/departments/${dept.deptID}`} className="flex justify-between  h-[180px]">
              <div>
                <p>{dept.deptName}</p>
                <p>{dept.deptID}</p>
                <p className="italic font-bold">
                  No.of Laboratories: {getNoOfRooms(dept.deptID)}
                </p>
              </div>
              <div className="w-[120px] h-[120px]border-2">
                <img
                  className="w-full h-full object-contain"
                  style={{ filter: "invert(100%)" }}
                  src={getIcon(dept.deptID)}
                />
              </div>
            </NavLink>
            <button
              disabled={!getNoOfRooms(dept.deptID)}
              type="button"
              onClick={() => downloadReport(dept.deptID, dept.deptName)}
              className="flex justify-center items-center gap-x-2 bg-metal px-3 py-2 rounded-md mt-5 absolute ml-auto  left-3 bottom-3 z-10 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <AiOutlineDownload size={24} />
              <p>Download Report</p>
            </button>
          </div>
        ))}
      </div>

      {showModal && (
        <DeptModal
          setShowModal={setShowModal}
          id={userDetails.userID}
          setUserDetails={setUserDetails}
        />
      )}
    </>
  );
};

export default Departments;
