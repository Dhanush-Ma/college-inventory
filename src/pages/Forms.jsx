import React, { useState } from "react";
import { FcCheckmark } from "../utilities/IconsImport";
import First from "../Components/Form Components/First";
import Second from "../Components/Form Components/Second";
import Third from "../Components/Form Components/Third";
import ProgressBar from "../Components/Form Components/ProgressBar";
import { Loading } from "../Components/Form Components/Loading";

const Forms = () => {
  const [formPage, setFormPage] = useState(0);
  const [data, setData] = useState({
    organizationName: "",
    organizationCategory: "",
    organizationDescription: "",
    organizationDepartments: [],
    organizationDepartmentRooms: [],
  });

  const handleChange = (e) => {
    setData((prevData) => {
      return {
        ...prevData,
        [e.target.name]: e.target.value,
      };
    });
  };

  return (
    <>
      <div className="flex w-screen h-screen justify-center items-center relative">
        <div className="w-10/12 h-[80%] bg-white rounded-2xl shadow-xl">
          <ProgressBar formPage={formPage} />
          <div className="px-5 pb-5 h-[calc(100%-5rem)] ">
            {(() => {
              switch (formPage) {
                case 0:
                  return (
                    <First
                      setFormPage={setFormPage}
                      data={data}
                      handleChange={handleChange}
                    />
                  );
                case 1:
                  return (
                    <Second
                      setFormPage={setFormPage}
                      data={data}
                      setData={setData}
                    />
                  );
                case 2:
                  return (
                    <Third
                      setFormPage={setFormPage}
                      data={data}
                      setData={setData}
                    />
                  );
                default:
                  return <Loading data={data} />;
              }
            })()}
          </div>
        </div>
      </div>
      {/* <p className="text-white">{JSON.stringify(data)}</p> */}
    </>
  );
};

export default Forms;

/**{/* <div className='bg-white rounded-xl p-4 absolute top-4 right-5 text-black flex justify-center items-center gap-x-3'>
        <FcCheckmark size={32} />
        <p>Your details can be changed at anytime!</p>
      </div>  */
