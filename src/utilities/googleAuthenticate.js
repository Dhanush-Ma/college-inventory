import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../config/firebase";
import axios from "axios";

const googleAuthenticate = (navigate, flag, setErrMsg) => {
  signInWithPopup(auth, googleProvider)
    .then(async (result) => {
      if (flag === "signin") {
        axios({
          method: "POST",
          url: "http://localhost:5000/register",
          data: {
            username: result.user.displayName,
            email: result.user.email,
            password: "googleAuthenticate",
            photoURL: result.user.photoURL,
          },
        })
          .then((res) => {
            console.log(res.data);
            localStorage.setItem("userid", res.data);
            navigate("/details");
          })
          .catch(async (err) => {
            console.log(err);
            if (err.response.status === 409) {
              setErrMsg(
                "User is already registered with another signin provider!"
              );
            } else if (err.response.status === 500 || 404) {
              setErrMsg("Registration Failed");
            }
            await auth.signOut();
          });
      } else {
        axios({
          method: "POST",
          url: "http://localhost:5000/login",
          data: {
            email: result.user.email,
            password: "googleAuthenticate",
          },
        })
          .then((res) => {
            localStorage.setItem("userid", res.data);
            navigate("/me");
          })
          .catch((err) => {
            if (err.response.status === 400) {
              setErrMsg(
                "User is already registered with another signin provider, Try using that provider!"
              );
            } else if (err.response.status === 401) {
              setErrMsg(err.response.data);
            } else if (err.response.status === 500 || 404) {
              setErrMsg("Login Failed");
            }
          });
      }
    })
    .catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;

      console.log(errorCode, errorMessage);
    });
};

export default googleAuthenticate;
