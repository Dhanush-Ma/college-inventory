import { useState } from "react";
import generateID from "../../utilities/generateId";
import { RxCross1 } from "../../utilities/IconsImport";

const Second = ({ setFormPage, data, setData }) => {
  const { organizationDepartments } = data;
  const [deptData, setDeptData] = useState({
    deptID: "",
    deptName: "",
  });
  const removeDept = (idx) => {
    console.log(idx);
    setData((prev) => {
      return {
        ...prev,
        organizationDepartments: organizationDepartments.filter(
          (dept, index) => index != idx
        ),
      };
    });
  };

  const addDept = () => {
    if (!deptData.deptID || !deptData.deptName) return;
    setData((prev) => {
      return {
        ...prev,
        organizationDepartments: [...prev.organizationDepartments, deptData],
      };
    });
    setDeptData({
      deptID: "",
      deptName: "",
    });
  };



  const handleChange = (e) => {
    setDeptData((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  return (
    <div className="flex flex-col justify-between h-full">
      <div>
        <h1 className="font-bold text-3xl text-center mb-10">
          Add Departments in your organization.
        </h1>
      </div>
      <div className="flex gap-x-5 mb-5  overflow-hidden">
        <div className="w-[50%] h-[100%] my-auto ">
          <img
            src="https://img.freepik.com/free-vector/human-relations-abstract-concept-vector-illustration-career-success-publicrelations-businessman-handshake-team-building-cooperation-participation-human-resources-company-abstract-metaphor_335657-1421.jpg?w=900&t=st=1680952136~exp=1680952736~hmac=ea004aae4829bb32601b4cc85a3adf3281237d49f2e9059640f16c9f7aa8f6da"
            className="w-full h-full object-contain"
          />
        </div>
        <form className="flex flex-col gap-y-5 w-1/2 my-auto">
          <div className="rounded-full bg-transparent border-[2px] flex justify-between items-center">
            <input
              type="text"
              placeholder="Department ID"
              className="pl-4 py-2 bg-transparent text-black placeholder:text-black outline-none"
              name="deptID"
              value={deptData.deptID}
              onChange={handleChange}
            />
            {!deptData.deptID && <div
              className="text-primaryBlue font-semibold px-2 rounded-full rounded-bl-none rounded-tl-none  cursor-pointer py-2 pr-3
              hover:bg-primaryBlue/20"
              onClick={() =>
                setDeptData((prev) => {
                  return { ...prev, deptID: generateID() };
                })
              }
            >
              Auto-ID
            </div>}
          </div>
          <input
            type="text"
            placeholder="Department Name"
            className="px-4 py-2 rounded-full outline-none text-black placeholder:text-black bg-transparent border-[2px]"
            name="deptName"
            value={deptData.deptName}
            onChange={handleChange}
          />
          <div
            className="bg-blackShade text-white px-2 py-2 rounded-full cursor-pointer text-center "
            onClick={addDept}
          >
            ADD
          </div>
          <div className="scrollbar flex gap-x-5 overflow-x-scroll pb-2">
            {organizationDepartments.map((dept, idx) => (
              <div
                key={idx}
                className="flex justify-center items-center gap-x-2 bg-[#ADD8E6] px-3 py-[4px] rounded-md"
              >
                <p>{dept.deptID}</p>
                <RxCross1
                  className="cursor-pointer"
                  onClick={() => removeDept(idx)}
                />
              </div>
            ))}
          </div>
        </form>
      </div>
      <div className="flex justify-end">
        <div className="flex gap-x-5">
          <button
            className="bg-blackShade text-white cursor-pointer px-5 py-3 rounded-md"
            onClick={() => setFormPage((prev) => prev - 1)}
          >
            PREV
          </button>
          <button
            className="bg-blackShade text-white cursor-pointer px-5 py-3 rounded-md disabled:opacity-60 disabled:cursor-not-allowed"
            onClick={() => {
              setFormPage((prev) => prev + 1);
            }}
            disabled={organizationDepartments.length > 0 ? false : true}
          >
            NEXT
          </button>
        </div>
      </div>
    </div>
  );
};

export default Second;
