import { useState } from "react";
import { AiFillCloseCircle } from "../../utilities/IconsImport";
import generateID from "../../utilities/generateId";
import axios from "axios";

const RoomModal = ({ setShowModal, id, setUserDetails, deptID, roomCount }) => {
  const [labData, setlabData] = useState({
    deptID: deptID,
    labID: "",
    labName: "",
  });

  const handleChange = (e) => {
    setlabData((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const addRoom = async () => {
    if (labData.labID && labData.labName) {
      axios({
        method: "PUT",
        url: `http://localhost:5000/details`,
        data: {
          flag: "organizationDepartmentRooms",
          userID: id,
          labData,
        },
      })
        .then((res) => {
          console.log(res);
          setUserDetails(res.data);
          setlabData({
            deptID: deptID,
            labID: "",
            labName: "",
          });
          setShowModal(false);
          alert("Lab details added successfully!");
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
          <h1 className="text-black text-center text-xl font-medium">
            Add Lab Details to your Department!
          </h1>
          <input
            readOnly
            type="text"
            placeholder="Department ID"
            className="px-4 py-2 rounded-md outline-none text-black placeholder:text-black bg-transparent border-[2px]"
            name="labName"
            value={labData.deptID}
          />
          <div className="rounded-md bg-transparent border-[2px] flex justify-between items-center border-black">
            <input
              type="text"
              placeholder="Lab ID"
              className="pl-4 py-2 bg-transparent text-black placeholder:text-black outline-none rounded-md"
              name="labID"
              value={labData.labID}
              onChange={handleChange}
            />
            {!labData.labID && (
              <div
                className="text-primaryBlue font-semibold px-2 rounded-md rounded-bl-none rounded-tl-none  cursor-pointer py-2 pr-3
              hover:bg-primaryBlue/20"
                onClick={() =>
                  setlabData((prev) => {
                    return {
                      ...prev,
                      labID: generateID({
                        type: "addRoom",
                        details: {
                          deptID,
                          roomCount,
                        },
                      }),
                    };
                  })
                }
              >
                Auto-ID
              </div>
            )}
          </div>
          <input
            type="text"
            placeholder="Lab Name"
            className="px-4 py-2 rounded-md outline-none text-black placeholder:text-black bg-transparent border-[2px]"
            name="labName"
            value={labData.labName}
            onChange={handleChange}
          />
          <div
            className="bg-blackShade text-white px-2 py-2 rounded-md cursor-pointer text-center "
            onClick={addRoom}
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

export default RoomModal;
