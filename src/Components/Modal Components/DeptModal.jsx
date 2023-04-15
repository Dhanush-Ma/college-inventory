import { useState } from "react";
import { AiFillCloseCircle } from "../../utilities/IconsImport";
import generateID from "../../utilities/generateId";
import axios from "axios";

const DeptModal = ({ setShowModal, id, setUserDetails }) => {
  const [deptData, setDeptData] = useState({
    deptID: "",
    deptName: "",
  });
console.log(id)
  const handleChange = (e) => {
    setDeptData((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };
  const addDept = async () => {
    if (deptData.deptID && deptData.deptName) {
       axios({
         method: "PUT",
         url: `http://localhost:5000/details`,
         data: {
           flag: "organizationDepartments",
           userID: id,
           deptData,
         },
       })
         .then((res) => {
           console.log(res);
            setUserDetails(res.data)
            setDeptData({
              deptID: "",
              deptName: "",
            });
            setShowModal(false);
            alert("Department added successfully!");
         })
         .catch((err) => {
           console.log(err);
         });
    }
  };

  return (
    <div className="w-full h-full bg-[#121212]/80 absolute top-0 left-0 z-10">
      <div className="w-[60%] h-[80%] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#dbdbdb] absolute">
        <form className="flex flex-col gap-y-5 w-[350px] mx-auto justify-center h-full">
          <h1 className="text-black text-center text-xl font-medium">Add Department to your Organization!</h1>
          <div className="rounded-md bg-transparent border-[2px] flex justify-between items-center border-black">
            <input
              type="text"
              placeholder="Department ID"
              className="pl-4 py-2 bg-transparent text-black placeholder:text-black outline-none rounded-md"
              name="deptID"
              value={deptData.deptID}
              onChange={handleChange}
            />
            {!deptData.deptID && (
              <div
                className="text-primaryBlue font-semibold px-2 rounded-md rounded-bl-none rounded-tl-none  cursor-pointer py-2 pr-3
              hover:bg-primaryBlue/20"
                onClick={() =>
                  setDeptData((prev) => {
                    return { ...prev, deptID: generateID() };
                  })
                }
              >
                Auto-ID
              </div>
            )}
          </div>
          <input
            type="text"
            placeholder="Department Name"
            className="px-4 py-2 rounded-md outline-none text-black placeholder:text-black bg-transparent border-[2px]"
            name="deptName"
            value={deptData.deptName}
            onChange={handleChange}
          />
          <div
            className="bg-blackShade text-white px-2 py-2 rounded-md cursor-pointer text-center "
            onClick={addDept}
          >
            ADD
          </div>
        </form>
        <AiFillCloseCircle
          onClick={() => setShowModal(false)}
          size={48}
          color="#fff"
          className="rounded-full absolute -top-5 -right-5 bg-black cursor-pointer"
        />
      </div>
    </div>
  );
};

export default DeptModal;
