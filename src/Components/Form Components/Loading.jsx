import { useEffect, useState, useContext } from "react";
import { BiBadgeCheck } from "react-icons/bi";
import { Oval } from "react-loader-spinner";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Context } from "../../Context/Context";

export const Loading = ({ data }) => {
  const [loading, setLoading] = useState(true);
  const { setUserDetails } = useContext(Context);
  const navigate = useNavigate();

  useEffect(() => {
    async function uploadToDb() {
      const userID = localStorage.getItem("userid");
      axios({
        method: "POST",
        url: "http://localhost:5000/details",
        data: { ...data, userID },
      })
        .then((res) => {
          console.log(res);
          setLoading(false);
          navigate("/me");
        })
        .catch((err) => {
          console.log(err);
        });
    }

    uploadToDb();
  }, []);

  return (
    <div className="flex flex-col justify-center items-center h-full text-center">
      <BiBadgeCheck color="green" size={98} />
      {loading && (
        <div className="my-5">
          <Oval
            height={40}
            width={40}
            color="green"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
            ariaLabel="oval-loading"
            secondaryColor="#4fa94d"
            strokeWidth={5}
            strokeWidthSecondary={5}
          />
        </div>
      )}
      <p className="font-bold text-lg">
        We have gathered your data and it is currently being saved.
      </p>
    </div>
  );
};
