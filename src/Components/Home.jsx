import { FaUserCircle } from "../utilities/IconsImport";
import { Context } from "../Context/Context";
import { useContext, useState } from "react";
import { NavLink } from "react-router-dom";

const Home = () => {
  const { user, userDetails } = useContext(Context);
  const {
    organizationName,
    organizationCategory,
    organizationDescription,
    organizationDepartments,
  } = userDetails;
  const [readMore, setReadMore] = useState(true);
  return (
    <>
      <div className="flex gap-x-3 items-center absolute right-5 top-5">
        {user.photoURL ? (
          <div className="w-[50px] h-[50px] bg-warningRed rounded-full">
            <img
              src={user.photoURL}
              className="w-full h-full object-contain rounded-full"
            />
          </div>
        ) : (
          <FaUserCircle size={50} />
        )}
        <div className="text-left">
          <p className="text-2xl uppercase">{user.name}</p>
          <p className="text-sm">{user.email}</p>
        </div>
      </div>
      <div className="">
        <div className="w-[80%] mb-10">
          <p className="font-bold text-3xl">{organizationName}</p>
          <p className="text-xl mb-5">{organizationCategory}</p>
          {organizationDescription && (
            <p className="text-justify">
              {readMore ? (
                <div>
                  {organizationDescription.slice(0, 450)}
                  <span
                    onClick={() => setReadMore(!readMore)}
                    className="text-[#f5ff5f] cursor-pointer"
                  >
                    {" "}
                    Read More...
                  </span>
                </div>
              ) : (
                <div>
                  {organizationDescription}
                  <span
                    onClick={() => setReadMore(!readMore)}
                    className="text-[#f5ff5f] cursor-pointer"
                  >
                    {" "}
                    show less...
                  </span>
                </div>
              )}
            </p>
          )}
        </div>
        <div>
          <p className="font-bold text-3xl mb-5">Organization Departments</p>
          <div className="flex gap-x-10 overflow-x-scroll scrollbar">
            {organizationDepartments.map((dept, idx) => (
              <NavLink key={idx} to={`/departments/${dept.deptID}`}>
                <div className="w-52 h-80 rounded-lg bg-metal py-3 px-2 flex flex-col justify-between items-center">
                  <div className="w-[99%] h-[70%] bg-white">
                    <img
                      src="https://thumbs.dreamstime.com/b/department-icon-department-division-143115245.jpg"
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <p className="text-center">{dept.deptName}</p>
                </div>
              </NavLink>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
