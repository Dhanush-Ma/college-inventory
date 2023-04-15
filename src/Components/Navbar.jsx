import { useContext, useState } from "react";
import { Context } from "../Context/Context";
import logout from "../utilities/logout";
import {
  BiLogOut,
  AiFillHome,
  BsArrowRightCircleFill,
  CgOrganisation,
  IoSchool,
} from "../utilities/IconsImport";
import { NavLink } from "react-router-dom";
import logo from "../assets/logo.svg"

const Navbar = ({navigate}) => {
  const { user, userDetails } = useContext(Context);
  const [showDashBoard, setShowDashBoard] = useState(true);
  console.log(userDetails);
  const NavLinks = [
    {
      title: "Home",
      icon: <AiFillHome size={32} />,
      linkto: "me",
    },
    {
      title: "Departments",
      icon: <IoSchool size={32} />,
      linkto: "departments",
    },
  ];

  const navStyles =
    "flex items-center gap-x-3 bg-[#2b2b2b] px-2 py-2 rounded-md w-full";

  return (
    <>
      {user && showDashBoard ? (
        <nav className="w-56 h-screen bg-[#121212] text-white p-4 flex flex-col justify-between relative">
          <div className="flex flex-col gap-y-6">
            <div className="mt-4 flex justify-between">
              <div>
                <img src={logo} />
              </div>
              {/* <BsArrowRightCircleFill
                size={30}
                className="cursor-pointer -right-4 rotate-180"
                onClick={() => setShowDashBoard(!showDashBoard)}
              /> */}
            </div>
            {NavLinks.map((link, idx) => (
              <NavLink
                key={idx}
                to={link.linkto}
                className={({ isActive }) =>
                  isActive
                    ? `${navStyles} bg-metal hover:bg-metal`
                    : `${navStyles} hover:bg-metal/50`
                }
              >
                {link.icon}
                <p>{link.title}</p>
              </NavLink>
            ))}
          </div>
          <div className="flex flex-col gap-y-6">
            <button
              className="flex items-center gap-x-3 bg-[#2b2b2b] px-2 py-2 rounded-md w-full"
              onClick={() => logout(navigate)}
            >
              <BiLogOut size={32} color="#fff" />
              <p>Logout</p>
            </button>
          </div>
        </nav>
      ) : (
        <BsArrowRightCircleFill
          size={30}
          className="absolute cursor-pointer left-2 top-5"
          color="#fff"
          onClick={() => setShowDashBoard(!showDashBoard)}
        />
      )}
    </>
  );
};

export default Navbar;
