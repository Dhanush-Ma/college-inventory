import { useState } from "react";
import { googleLogo,  signinImg } from "../assets/imports";
import logo from "../assets/logo-bg-metal.svg";
import { Link } from "react-router-dom";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import { IoWarningOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import googleAuthenticate from "../utilities/googleAuthenticate";
import axios from "axios";

const SignIn = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    remember: true,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const EMAIL_REGEX =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const navigate = useNavigate();
  const handleFormData = (e) => {
    if (e.target.name === "remember") {
      setFormData((prev) => {
        return {
          ...prev,
          [e.target.name]: !formData.remember,
        };
      });
    } else {
      setFormData((prev) => {
        return {
          ...prev,
          [e.target.name]: e.target.value,
        };
      });
    }
  };

  const signin = async (e) => {
    e.preventDefault();

    const { username, email, password } = formData;

    if (!EMAIL_REGEX.test(email)) {
      setErrMsg("Invalid Email!");
      return;
    }

    if (!(password.length >= 6)) {
      setErrMsg("Password should be at least 6 characters!");
      return;
    }

    setErrMsg("");

    axios({
      method: "POST",
      url: "http://localhost:5000/register",
      data: { username, email, password },
    })
      .then((res) => {
        console.log(res.data);
        localStorage.setItem("userid", res.data);
        navigate("/details");
      })
      .catch((err) => {
        if (err.response.status === 409) {
          setErrMsg(err.response.data);
        } else if (err.response.status === 500 || 404) {
          setErrMsg("Registration Failed");
        }
      });
  };

  return (
    <div className="flex justify-center items-center w-screen h-screen gap-5">
      <div className="w-1/2">
        <div className="mx-auto w-10/12">
          <img src={signinImg} className="object-contain" />
        </div>
      </div>
      <div className="w-1/2 h-full text-center bg-white flex flex-col justify-center items-center">
        <div>
          <img src={logo} />
        </div>
        <h1 className="mb-2 mt-5 text-3xl font-semibold">
          Register for Inventory Management
        </h1>
        <form className="my-5 flex flex-col gap-4 w-[300px]">
          {errMsg && (
            <div className="bg-warningRed p-2 text-white font-semibold flex justify-center items-center gap-2">
              <IoWarningOutline size={22} className="w-[40px]" />
              <p className="text-left">{errMsg}</p>
            </div>
          )}
          <input
            className="p-2 focus:outline-none rounded-md bg-metal placeholder:text-white text-white"
            type="text"
            placeholder="Your Full Name"
            value={formData.username}
            name="username"
            onChange={handleFormData}
            autoComplete={"false"}
          />
          <input
            className="p-2 focus:outline-none rounded-md bg-metal placeholder:text-white text-white"
            type="email"
            placeholder="Your Email"
            value={formData.email}
            name="email"
            onChange={handleFormData}
            autoComplete={"false"}
          />
          <div className="w-full bg-metal flex justify-between items-center rounded-md">
            <input
              className="p-2 focus:outline-none  bg-metal placeholder:text-white text-white rounded-md w-10/12"
              type={showPassword ? "text" : "password"}
              placeholder="Your Password"
              value={formData.password}
              name="password"
              onChange={handleFormData}
              autoComplete={"false"}
            />
            {showPassword ? (
              <BsEye
                onClick={() => setShowPassword(!showPassword)}
                size={36}
                color="#fff"
                className="pr-3 cursor-pointer "
              />
            ) : (
              <BsEyeSlash
                onClick={() => setShowPassword(!showPassword)}
                size={36}
                color="#fff"
                className="pr-3 cursor-pointer "
              />
            )}
          </div>
          <div className="flex gap-2">
            <input
              id="remeber-me"
              type="checkbox"
              checked={formData.remember}
              name="remember"
              onChange={handleFormData}
            />
            <label htmlFor="remeber-me">Remember Me</label>
          </div>
          <button
            className="bg-background py-2 text-white uppercase rounded-md"
            onClick={signin}
          >
            SIGn up
          </button>
        </form>
        <p className="mb-4">
          Already have an account?{" "}
          <span className="text-background font-bold text-base">
            <Link to="/">Login</Link>
          </span>
        </p>
        <div>
          <div className="w-max flex items-center gap-4 mx-auto mb-5">
            <hr className="w-12 bg-[#2e2e2e]" />
            <p>OR</p>
            <hr className="w-12 bg-[#2e2e2e]" />
          </div>
          <button
            className="flex justify-center items-center gap-x-3 border-2 border-background rounded-sm px-3 py-2 mx-auto hover:bg-background hover:text-white transition-all duration-500"
            onClick={() => googleAuthenticate(navigate, "signin", setErrMsg)}
          >
            <img src={googleLogo} className="w-10 h-10" />
            <p className="font-semibold  ">Continue with Google</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
