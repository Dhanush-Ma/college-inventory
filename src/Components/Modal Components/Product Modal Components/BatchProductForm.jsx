import React, { useState, useContext } from "react";
import generateID from "../../../utilities/generateId";
import { AiOutlineDown } from "../../../utilities/IconsImport";
import axios from "axios";
import { Context } from "../../../Context/Context";
const BatchProductForm = ({
  setShowModal,
  userID,
  roomID,
  batchProductsData,
}) => {
  const { setRoomProducts } = useContext(Context);
  const [formData, setFormData] = useState({
    batchID: "",
    category: "",
    productName: "",
    quantity: 0,
    datePurchased: "",
    supplierName: "",
    supplierContact: "",
    costPerItem: 0,
    totalCost: "",
  });

  const addProduct = () => {
    axios({
      method: "POST",
      url: "http://localhost:5000/products",
      data: {
        flag: "batch",
        userID: userID,
        roomID: roomID,
        type: "batch",
        ...formData,
      },
    })
      .then((res) => {
        setFormData({
          batchID: "",
          category: "",
          productName: "",
          quantity: 0,
          datePurchased: "",
          supplierName: "",
          supplierContact: "",
          costPerItem: 0,
          totalCost: "",
        });
        setShowModal(false);
        const { data } = res;

        // set up the updated records
        const singleProductsArr = data.filter((item) => item.type === "single");
        const batchProductsArr = data.filter((item) => item.type === "batch");

        setRoomProducts({
          SingleProducts: singleProductsArr,
          BatchProducts: batchProductsArr,
        });
        alert("Product added Successfully!");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const categories = ["mouse", "keyboard", "chairs", "power cables"];

  const handleChange = (e) => {
    if (e.target.name === "costPerItem") {
      setFormData((prev) => {
        return {
          ...prev,
          [e.target.name]: e.target.value,
          totalCost: prev.quantity * e.target.value,
        };
      });
    }

    if (e.target.name === "quantity") {
      setFormData((prev) => {
        return {
          ...prev,
          [e.target.name]: e.target.value,
          totalCost: prev.costPerItem * e.target.value,
        };
      });
    }

    setFormData((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };

  return (
    <form className="flex flex-col gap-y-5 w-[350px] mx-auto justify-start text-black overflow-scroll mt-6  scrollbar pr-2 h-[80%]">
      <div>
        <p className="text-xl font-bold border-b-black border-b-2 w-max pb-1 mb-4">
          Product Information
        </p>
        <div className="flex flex-col gap-y-3">
          <div className="rounded-md bg-transparent border-[2px] flex justify-between items-center border-black pl-3">
            <input
              type="text"
              placeholder="Batch ID"
              className="py-2 bg-transparent text-black placeholder:text-black outline-none rounded-md"
              name="batchID"
              value={formData.batchID}
              onChange={handleChange}
            />
            {!formData.batchID && (
              <div
                className="text-primaryBlue font-semibold px-2 rounded-md rounded-bl-none rounded-tl-none  cursor-pointer py-2 pr-3
              hover:bg-primaryBlue/20"
                onClick={() => {
                  setFormData((prev) => {
                    return {
                      ...prev,
                      batchID: generateID({
                        type: "batchProduct",
                        details: {
                          deptID: window.location.pathname.split("/")[2],
                          count: batchProductsData.length,
                        },
                      }),
                    };
                  });
                }}
              >
                Auto-ID
              </div>
            )}
          </div>
          <div className="rounded-md outline-none text-black placeholder:text-black bg-transparent border-[2px] flex justify-between items-center pr-3">
            <select
              className="capitalize px-3 py-2  rounded-md outline-none text-black placeholder:text-black bg-transparent  appearance-none w-full z-10"
              name="category"
              value={formData.category}
              onChange={handleChange}
            >
              <option value={""} className="px-4 py-2 rounded-full">
                Product Category
              </option>
              {categories.map((category, idx) => (
                <option value={category} className="capitalize" key={idx}>
                  {category}
                </option>
              ))}
            </select>
            <AiOutlineDown className="ml-3" size={18} />
          </div>
          <input
            type="text"
            placeholder="Product Name"
            className="px-4 py-2 rounded-md outline-none text-black placeholder:text-black bg-transparent border-[2px]"
            name="productName"
            value={formData.productName}
            onChange={handleChange}
          />
          <div className="px-4 py-2 rounded-md outline-none text-black placeholder:text-black bg-transparent border-[2px] flex">
            <p className="">Quantity: </p>
            <input
              type="number"
              min={0}
              placeholder="0"
              className={`outline-none text-black placeholder:text-black bg-transparent ml-2 text-left`}
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
            />
          </div>
          <div className="rounded-md bg-transparent border-[2px] flex justify-start items-center border-black px-4 py-2">
            <p className="mr-5">Date of Purchase</p>
            <input
              type="date"
              placeholder="Product Name"
              className="rounded-md outline-none text-black placeholder:text-black bg-transparent"
              style={{ colorScheme: "light" }}
              name="datePurchased"
              value={formData.datePurchased}
              onChange={handleChange}
            />
          </div>
        </div>
      </div>
      <div>
        <p className="text-xl font-bold border-b-black border-b-2 w-max pb-1 mb-4">
          Supplier Information
        </p>
        <div className="flex flex-col gap-y-3">
          <input
            type="text"
            placeholder="Supplier Name"
            className="px-4 py-2 rounded-md outline-none text-black placeholder:text-black bg-transparent border-[2px] w-full"
            name="supplierName"
            value={formData.supplierName}
            onChange={handleChange}
          />
          <input
            type="text"
            placeholder="Supllier Contact"
            className="px-4 py-2 rounded-md outline-none text-black placeholder:text-black bg-transparent border-[2px] w-full"
            name="supplierContact"
            value={formData.supplierContact}
            onChange={handleChange}
          />
        </div>
      </div>
      <div>
        <p className="text-xl font-bold border-b-black border-b-2 w-max pb-1 mb-4">
          Cost Information
        </p>
        <div className="flex flex-col gap-y-3">
          <div className="px-4 py-2 rounded-md outline-none text-black placeholder:text-black bg-transparent border-[2px] flex">
            <p>Cost Per Item: </p>
            <div className="ml-2 flex ">
              <p>₹</p>
              <input
                type="number"
                min={0}
                placeholder="0"
                className={`outline-none text-black placeholder:text-black bg-transparent ml-1 text-left`}
                name="costPerItem"
                value={formData.costPerItem}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="px-4 py-2 rounded-md outline-none text-black placeholder:text-black bg-transparent border-[2px] flex">
            <p>Total Cost: </p>
            <input
              readOnly
              type="text"
              min={0}
              placeholder="₹ 0"
              className={`outline-none text-black placeholder:text-black bg-transparent ml-2 text-left`}
              name="totalCost"
              value={formData.totalCost}
              onChange={handleChange}
            />
          </div>
        </div>
      </div>
      <div
        className="bg-blackShade text-white px-2 py-2 rounded-md cursor-pointer text-center "
        onClick={addProduct}
      >
        ADD
      </div>
    </form>
  );
};

export default BatchProductForm;
