import { useState, useContext, useEffect } from "react";
import { Context } from "../Context/Context";
import { useParams } from "react-router-dom";
import { IoAddCircleSharp } from "react-icons/io5";
import { BsQrCode } from "react-icons/bs";
import ProductModal from "./Modal Components/ProductModal";
import ServiceModal from "./Modal Components/ServiceModal";
import axios from "axios";
import SingleProducts from "./Product Components/SingleProducts";
import BatchProducts from "./Product Components/BatchProducts";
import { useNavigate } from "react-router-dom";

const SingleRoom = () => {
  const { id } = useParams();
  const naviagte = useNavigate();
  const {
    userDetails,
    setUserDetails,
    setRoomServiceDetails,
    roomProducts,
    setRoomProducts,
  } = useContext(Context);
  const [showModal, setShowModal] = useState(false);
  const displayOptions = ["Single Product", "Batch Products"];
  const [currentDisplay, setCurrentDisplay] = useState("Single Product");

  const [showServiceModal, setShowServiceModal] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);

  const roomDetails = userDetails.organizationDepartmentRooms.filter(
    (dept) => dept.labID === id
  );

  useEffect(() => {
    axios({
      method: "GET",
      url: `http://localhost:5000/products?id=${id}`,
    })
      .then((res) => {
        const { data } = res;
        const singleProductsArr = data.filter((item) => item.type === "single");
        const batchProductsArr = data.filter((item) => item.type === "batch");

        setRoomProducts({
          SingleProducts: singleProductsArr,
          BatchProducts: batchProductsArr,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    axios({
      method: "GET",
      url: `http://localhost:5000/services?id=${id}`,
    })
      .then((res) => {
        const { data } = res;
        setRoomServiceDetails(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const generateQR = () => {
    naviagte("qr", {
      state: {
        roomProducts: roomProducts.SingleProducts,
        labName: roomDetails[0].labName,
      },
    });
  };
  return (
    <div>
      <p className="text-xl text-left font-bold uppercase mb-8">
        {roomDetails[0].labID}{" "}
        <span className="mx-1" style={{ fontSize: 25 }}>
          &#183;
        </span>{" "}
        {roomDetails[0].labName}
      </p>
      <div className="absolute top-0 right-5 flex gap-x-5">
        <button
          className="flex justify-center items-center gap-x-2 bg-metal px-3 py-2 rounded-md mt-5 ml-auto "
          onClick={() => setShowModal(true)}
        >
          <p className="text-xl">Add Product</p>
          <IoAddCircleSharp size={24} />
        </button>
        <button
          className="flex justify-center items-center gap-x-2 bg-metal px-3 py-2 rounded-md mt-5 ml-auto disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={roomProducts.SingleProducts.length === 0}
          onClick={() => generateQR()}
        >
          <p className="text-xl">Generate QR</p>
          <BsQrCode size={24} />
        </button>
      </div>
      <div>
        {roomProducts && (
          <>
            <div className="flex gap-x-5 my-[2rem]">
              {displayOptions.map((option, idx) => (
                <div
                  key={idx}
                  className={`flex justify-center items-center gap-x-2 border-2 border-white px-3 py-[4px] rounded-md cursor-pointer w-max text-white ${
                    currentDisplay === option &&
                    "border-none bg-gradient-to-r from-[#cc2b5e] to-[#753a88] text-white"
                  }`}
                  onClick={() => setCurrentDisplay(option)}
                >
                  <p>{option}</p>
                </div>
              ))}
            </div>
            <div className="relative h-[600px]">
              {currentDisplay === "Single Product" ? (
                <SingleProducts
                  roomID={id}
                  data={roomProducts.SingleProducts}
                  setCurrentProduct={setCurrentProduct}
                  setShowServiceModal={setShowServiceModal}
                />
              ) : (
                <BatchProducts data={roomProducts.BatchProducts} />
              )}
            </div>
          </>
        )}
      </div>
      {showModal && (
        <ProductModal
          setShowModal={setShowModal}
          setUserDetails={setUserDetails}
          id={userDetails.userID}
          roomID={id}
          batchProductsData={roomProducts.BatchProducts}
        />
      )}
      {showServiceModal && (
        <ServiceModal
          setShowServiceModal={setShowServiceModal}
          currentProduct={currentProduct}
          userID={userDetails.userID}
          roomID={id}
        />
      )}
    </div>
  );
};

export default SingleRoom;
