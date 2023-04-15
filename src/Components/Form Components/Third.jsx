import { useState } from "react";
import { RxCross1 } from "../../utilities/IconsImport";
import generateID from "../../utilities/generateId";

const Third = ({ setFormPage, data, setData }) => {
  const { organizationDepartments, organizationDepartmentRooms } = data;
  const [currentLab, setCurrentLab] = useState(
    organizationDepartments[0].deptID
  );

  const [labData, setLabData] = useState({
    deptID: currentLab,
    labID: "",
    labName: "",
  });

  const handleChange = (e) => {
    setLabData((prev) => {
      return { ...prev, deptID: currentLab, [e.target.name]: e.target.value };
    });
  };

  const addLab = () => {
    if (!labData.labID || !labData.labName) return;
    setData((prev) => {
      return {
        ...prev,
        organizationDepartmentRooms: [
          ...prev.organizationDepartmentRooms,
          labData,
        ],
      };
    });
    setLabData({
      deptID: currentLab,
      labID: "",
      labName: "",
    });
  };

  const removeLab = (labID) => {
    setData((prev) => {
      return {
        ...prev,
        organizationDepartmentRooms: organizationDepartmentRooms.filter(
          (lab) => lab.labID !== labID
        ),
      };
    });
  };

  return (
    <div className="flex flex-col justify-between h-full">
      <div>
        <h1 className="font-bold text-3xl text-center mb-10">
          Add Laboratory in your Department.
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
          <div className="scrollbar flex gap-x-5 overflow-x-scroll pb-2 -mb-2">
            {organizationDepartments.map((dept, idx) => (
              <div
                key={idx}
                className={`flex justify-center items-center gap-x-2 border-2 border-blackShade px-3 py-[4px] rounded-md cursor-pointer ${
                  currentLab === dept.deptID &&
                  "border-none bg-gradient-to-r from-[#cc2b5e] to-[#753a88] text-white"
                }`}
                onClick={() => setCurrentLab(dept.deptID)}
              >
                <p>{dept.deptID}</p>
              </div>
            ))}
          </div>
          <div className="rounded-full outline-none  bg-transparent border-[2px] flex justify-between">
            <input
              type="text"
              placeholder="Laboratory ID"
              className="bg-transparent text-black placeholder:text-black outline-none pl-4 pr-2 py-2"
              name="labID"
              value={labData.labID}
              onChange={handleChange}
            />
            {!labData.labID && (
              <div
                className="text-primaryBlue font-semibold px-2 rounded-full rounded-bl-none rounded-tl-none  cursor-pointer py-2 pr-3
              hover:bg-primaryBlue/20"
                onClick={() =>
                  setLabData((prev) => {
                    return { ...prev, labID: generateID() };
                  })
                }
              >
                Auto-ID
              </div>
            )}
          </div>
          <input
            type="text"
            placeholder="Laboratory Name"
            className="px-4 py-2 rounded-full outline-none text-black placeholder:text-black bg-transparent border-[2px]"
            name="labName"
            value={labData.labName}
            onChange={handleChange}
          />
          <div
            className="bg-blackShade text-white px-2 py-2 rounded-full cursor-pointer text-center "
            onClick={addLab}
          >
            ADD
          </div>
          <div className="scrollbar flex gap-x-5 overflow-x-scroll pb-2">
            {organizationDepartmentRooms
              .filter((lab) => lab.deptID === currentLab)
              .map((dept, idx) => (
                <div
                  key={idx}
                  className="flex justify-center items-center gap-x-2 bg-[#ADD8E6] px-3 py-[4px] rounded-md"
                >
                  <p>{dept.labID}</p>
                  <RxCross1
                    className="cursor-pointer"
                    onClick={() => removeLab(dept.labID)}
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
            // disabled={organizationDepartmentRooms.length > 0 ? false : true}
          >
            SUBMIT
          </button>
        </div>
      </div>
    </div>
  );
};

export default Third;
