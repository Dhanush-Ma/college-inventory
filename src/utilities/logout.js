import { auth } from "../config/firebase";

const logout = (navigate) => {
  localStorage.removeItem("userid");
  auth?.signOut();
  navigate("/");
};

export default logout;
