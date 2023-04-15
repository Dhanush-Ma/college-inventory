import { useState, useContext } from "react";
import formatDate from "../../utilities/formatDate";
import { AiOutlineDown } from "../../utilities/IconsImport";
import { Context } from "../../Context/Context";
import axios from "axios";
import { singleProductAcessors } from "../../utilities/tableDetails";

const Product = ({
  item,
  length,
  setCurrentProduct,
  setShowServiceModal,
  roomID,
}) => {
  const [showInfo, setShowInfo] = useState(false);
  const { roomServiceDetails, setRoomProducts } = useContext(Context);

  const currentProductServices = roomServiceDetails.filter(
    (detail) => detail.productID === item.productID
  );

  const deleteProduct = (productID) => {
    axios({
      method: "DELETE",
      url: `http://localhost:5000/products`,
      data: {
        productID,
        roomID,
      },
    })
      .then((res) => {
        const { data } = res;

        // set up the updated records
        const singleProductsArr = data.filter((item) => item.type === "single");
        const batchProductsArr = data.filter((item) => item.type === "batch");

        setRoomProducts({
          SingleProducts: singleProductsArr,
          BatchProducts: batchProductsArr,
        });
        alert("Product deleted successfuly!");
        console.log(data);
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <tr key={item.productID}>
        {singleProductAcessors.map((accessor, idx) => {
          if (accessor === "datePurchased")
            return (
              <td key={idx} className="capitalize">
                {formatDate(item[accessor])}
              </td>
            );

          if (accessor === "dropdown")
            return (
              <td key={idx} className="capitalize">
                <AiOutlineDown
                  onClick={() => setShowInfo(!showInfo)}
                  className="cursor-pointer"
                  size={22}
                />
              </td>
            );

          return (
            <td key={idx} className="capitalize">
              {item[accessor]}
            </td>
          );
        })}
      </tr>
      {showInfo && (
        <tr>
          <td className="p-0" colspan={length}>
            <div className="bg-white text-black w-full p-5 flex flex-col gap-y-5">
              <div className="">
                <p className="text-xl font-bold border-b-black border-b-2 w-max pb-1 mb-4">
                  Service History
                </p>
                {currentProductServices.length > 0 ? (
                  currentProductServices.map((service, idx) => (
                    <div key={idx}>
                      <div className="flex gap-5">
                        <div className="font-semibold text-md">
                          <p>Service Date</p>
                          <p>Service Cost</p>
                          <p>Description</p>
                        </div>
                        <div>
                          <p>{formatDate(service.date)}</p>
                          <p>₹ {service.cost}</p>
                          <p>{service.description}</p>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <p>N/A</p>
                )}
              </div>
              <div className="flex  gap-10">
                <div>
                  <p className="text-xl font-bold border-b-black border-b-2 w-max pb-1 mb-4">
                    System Information
                  </p>
                  <div>
                    <div className="flex gap-5">
                      <div className="font-semibold text-md">
                        <p>Processor</p>
                        <p>Hard Drive</p>
                        <p>RAM</p>
                        <p>Operating System</p>
                      </div>
                      <div>
                        <p>{item.processor}</p>
                        <p>{item.hardDrive}</p>
                        <p>{item.RAM}</p>
                        <p>{item.os}</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <p className="text-xl font-bold border-b-black border-b-2 w-max pb-1 mb-4">
                    Warranty Information
                  </p>
                  <div className="flex gap-5">
                    <div className="font-semibold text-md">
                      <p>Claim Date</p>
                      <p>Note</p>
                    </div>
                    <div>
                      <p>{formatDate(item.warrantyDate)}</p>
                      <p>{item.warrantyNote}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex ml-auto gap-x-5">
                <button
                  className="border-2 p-[3px] px-[5px] rounded-xl border-[orange] text-[orange] hover:bg-[orange] hover:text-white"
                  onClick={() => {
                    setCurrentProduct(item.productID),
                      setShowServiceModal(true);
                  }}
                >
                  ADD SERVICE DETAILS
                </button>
                <button
                  onClick={() => {
                    deleteProduct(item.productID);
                  }}
                  className="border-2 p-[3px] px-[5px] rounded-xl border-[red] text-[red] hover:bg-[red] hover:text-white"
                >
                  DELETE
                </button>
              </div>
            </div>
          </td>
        </tr>
      )}
    </>
  );
};

export default Product;
