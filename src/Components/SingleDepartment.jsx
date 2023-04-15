import { useState, useContext, useEffect } from "react";
import { Context } from "../Context/Context";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import PieChart from "./Chart Components/PieChart";
import formatDate from "../utilities/formatDate";
import { BsArrowRight, IoAddCircleSharp } from "../utilities/IconsImport";
import RoomModal from "./Modal Components/RoomModal";

const SingleDepartment = () => {
  const { id } = useParams();
  const { userDetails, setUserDetails } = useContext(Context);
  const [allRoomServices, setAllRoomServices] = useState([]);
  const [allRoomProducts, setAllRoomProducts] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const departmentDetials = userDetails.organizationDepartments.filter(
    (dept) => dept.deptID === id
  );
  const roomsArr = userDetails.organizationDepartmentRooms.filter(
    (room) => room.deptID === id
  );

  useEffect(() => {
    setAllRoomServices([]);
    roomsArr.map((room) => {
      axios
        .get(`http://localhost:5000/services?id=${room.labID}`)
        .then(function (response) {
          const { data } = response;
          const obj = { labID: room.labID, data };
          setAllRoomServices((prev) => [...prev, obj]);
        })
        .catch(function (error) {
          console.log(error);
        });
    });
  }, []);

  useEffect(() => {
    setAllRoomProducts([]);
    roomsArr.map((room) => {
      axios
        .get(`http://localhost:5000/products?id=${room.labID}`)
        .then(function (response) {
          const { data } = response;
          const obj = { labID: room.labID, data };
          setAllRoomProducts((prev) => [...prev, obj]);
        })
        .catch(function (error) {
          console.log(error);
        });
    });
  }, []);

  const categories = [
    "Computer",
    "CPU",
    "Router",
    "Smart Board",
    "UPS",
    "Mouse",
    "Keyboard",
    "Chairs",
    "Power Cables",
  ];

  const singleProdCategories = [
    "Computer",
    "CPU",
    "Router",
    "Smart Board",
    "UPS",
  ];
  const batchProdCategories = ["Mouse", "Keyboard", "Chairs", "Power Cables"];

  return (
    <>
      <button
        className="flex justify-center items-center gap-x-2 bg-metal px-3 py-2 rounded-md  ml-auto absolute right-5"
        onClick={() => setShowModal(true)}
      >
        <p className="font-semibold text-xl">Add</p>
        <IoAddCircleSharp size={24} />
      </button>
      <div className="overflow-x-scroll scrollbar">
        <p className="text-3xl mb-6 text-center">
          {departmentDetials[0].deptName}
        </p>
        <div className="flex flex-col gap-y-5 items-center">
          {roomsArr.map((room, idx) => (
            <div key={idx} to={`${room.labID}`}>
              <div className="border-2 rounded-md p-5  w-[900px] max-w-[900px]  h-[500px] ">
                <Link
                  to={`${room.labID}`}
                  className="flex justify-center items-center pb-8"
                >
                  <p className="text-xl text-center font-bold uppercase">
                    {room.labID}{" "}
                    <span className="mx-1" style={{ fontSize: 25 }}>
                      &#183;
                    </span>{" "}
                    {room.labName}
                  </p>
                  <BsArrowRight className="ml-auto" size={32} />
                </Link>
                <div className="flex justify-between gap-x-5 h-[calc(100%-4rem)]">
                  <div className="w-1/2 bg-[#fafafa] text-black p-3 rounded-t-xl overflow-y-scroll scrollbar">
                    <div className="flex justify-between ">
                      {new Array(5).fill(null).map(() => (
                        <div className="w-5 h-5 bg-black rounded-full"></div>
                      ))}
                    </div>
                    <p className="text-center font-bold text-lg mt-5 mb-2">
                      Service History
                    </p>

                    {allRoomServices &&
                      allRoomServices
                        .filter(
                          (roomServices) => roomServices.labID === room.labID
                        )
                        .map((item) => {
                          const { data } = item;
                          if (data.length > 0) {
                            return data.map((service, idx) => (
                              <div
                                key={idx}
                                className="flex gap-5 border-2 p-4 mb-3 rounded-md"
                              >
                                <div className="font-semibold text-md">
                                  <p>Product ID</p>
                                  <p>Service Date</p>
                                  <p>Service Cost</p>
                                  <p>Description</p>
                                </div>
                                <div>
                                  <p>{service.productID}</p>
                                  <p>{formatDate(service.date)}</p>
                                  <p>₹ {service.cost}</p>
                                  <p>{service.description}</p>
                                </div>
                              </div>
                            ));
                          } else return <p>N/A</p>;
                        })}
                  </div>
                  <div className="w-1/2">
                    {allRoomProducts &&
                      allRoomProducts
                        .filter((roomDetail) => roomDetail.labID === room.labID)
                        .map((item) => {
                          const { data } = item;
                          if (data.length > 0) {
                            let derivedData = [];
                            const singleProductsArr = data.filter(
                              (item) => item.type === "single"
                            );
                            const batchProductsArr = data.filter(
                              (item) => item.type === "batch"
                            );

                            for (
                              let i = 0;
                              i < singleProdCategories.length;
                              i++
                            ) {
                              const obj = {
                                category: singleProdCategories[i],
                                count: singleProductsArr.filter(
                                  (item) =>
                                    item.category === singleProdCategories[i]
                                ).length,
                              };

                              derivedData.push(obj);
                            }

                            for (
                              let i = 0;
                              i < batchProdCategories.length;
                              i++
                            ) {
                              const filteredArray = batchProductsArr.filter(
                                (item) =>
                                  item.category === batchProdCategories[i]
                              );

                              const obj = {
                                category: batchProdCategories[i],
                                count:
                                  filteredArray.length > 0
                                    ? filteredArray.reduce(
                                        (acc, cur) =>
                                          acc + Number(cur.quantity),
                                        0
                                      )
                                    : 0,
                              };

                              derivedData.push(obj);
                            }

                            const chartData = {
                              labels: categories.map((data) => data),

                              datasets: [
                                {
                                  label: "Total Count",
                                  data: derivedData.map((data) => data.count),
                                  backgroundColor: [
                                    "rgba(75,192,192,0.5)",
                                    "#ecf0f1",
                                    "#50AF95",
                                    "#FFFF00",
                                    "#2a71d0",
                                    "#14f549",
                                    "#0000ff",
                                    "#000000",
                                    "#FFA500",
                                  ],
                                  borderColor: [
                                    "rgba(75,192,192,1)",
                                    "#ecf0f1",
                                    "#50AF95",
                                    "#FFFF00",
                                    "#2a71d0",
                                    "#14f549",
                                    "#0000ff",
                                    "#000000",
                                    "#FFA500",
                                  ],
                                  borderWidth: 1,
                                },
                              ],
                            };
                            return <PieChart chartData={chartData} />;
                          } else
                            return (
                              <div className="w-full h-full flex justify-center items-center">
                                <div className="border-2 w-[70%] h-[75%] rounded-full flex justify-center items-center">
                                  <p>No PieChart data available!</p>
                                </div>
                              </div>
                            );
                        })}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {showModal && (
        <RoomModal
          setShowModal={setShowModal}
          id={userDetails.userID}
          setUserDetails={setUserDetails}
          deptID={id}
          roomCount={roomsArr.length}
        />
      )}
    </>
  );
};

export default SingleDepartment;
