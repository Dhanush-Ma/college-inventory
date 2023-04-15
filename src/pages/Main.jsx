import React, { useEffect, useContext } from "react";
import axios from "axios";
import { Context } from "../Context/Context";
import { useNavigate } from "react-router-dom";
import { Outlet } from "react-router-dom";
import Navbar from "../Components/Navbar";

const Main = () => {
  const { user, setUser, setUserDetails, userDetails } = useContext(Context);
  const userID = localStorage.getItem("userid");
  const navigate = useNavigate();

  useEffect(() => {
    if (!userID) return navigate("/");
    // Set current logged in user
    axios({
      method: "GET",
      url: `http://localhost:5000/me?id=${userID}`,
    })
      .then((res) => {
        console.log(res);
        setUser(res.data);
      })
      .catch((err) => {
        console.log(err);
      });

    // Set user details
    axios({
      method: "GET",
      url: `http://localhost:5000/details?id=${userID}`,
    })
      .then((res) => {
        console.log(res);
        setUserDetails(res.data[0]);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <div className="flex">
        <Navbar navigate={navigate} />
        <div className="text-white pl-12 p-5 w-full overflow-y-scroll max-h-screen scrollbar">
          {user && userDetails && <Outlet />}
        </div>
      </div>
    </>
  );
};

export default Main;
