import { useState, useContext } from "react";
import generateID from "../../../utilities/generateId";
import {
  AiOutlineDown,
  IoWarningOutline,
} from "../../../utilities/IconsImport";
import axios from "axios";
import { Context } from "../../../Context/Context";

const SingleProductForm = ({ setShowModal, userID, roomID }) => {
  const { setRoomProducts } = useContext(Context);
  const [autoIDErrMsg, setAutoIDErrMsg] = useState(false);
  const [formData, setFormData] = useState({
    productID: "",
    category: "",
    productName: "",
    modelNumber: "",
    datePurchased: "",

    supplierName: "",
    supplierContact: "",

    warrantyDate: "",
    warrantyNote: "",

    processor: "",
    RAM: "",
    hardDrive: "",
    os: "",

    costOfItem: "",
    discountPercent: "",
  });

  const addProduct = () => {
    axios({
      method: "POST",
      url: "http://localhost:5000/products",
      data: {
        flag: "single",
        userID: userID,
        roomID: roomID,
        type: "single",
        ...formData,
      },
    })
      .then((res) => {
        setFormData({
          productID: "",
          category: "",
          productName: "",
          modelNumber: "",
          datePurchased: "",

          supplierName: "",
          supplierContact: "",

          warrantyDate: "",
          warrantyNote: "",

          processor: "",
          RAM: "",
          hardDrive: "",
          os: "",

          costOfItem: "",
          discountPercent: "",
        });
        setShowModal(false);
        const { data } = res;

        console.log(res);
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

  const categories = ["Computer", "CPU", "Smart Board", "UPS", "Router"];

  const handleChange = (e) => {
    setFormData((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };
  return (
    <form
      className="flex flex-col gap-y-5 w-[350px] mx-auto justify-start text-black mt-6 scrollbar pr-2 h-[80%] relative"
      style={{ overflowY: "scroll" }}
    >
      {autoIDErrMsg && (
        <div className="bg-warningRed p-2 text-white font-semibold flex justify-center items-center gap-2">
          <IoWarningOutline size={22} className="w-[40px]" />
          <p className="text-center text-sm">
            Category is required to generate Auto-ID
          </p>
        </div>
      )}
      {/* PRODUCT INFO */}
      <div>
        <p className="text-xl font-bold border-b-black border-b-2 w-max pb-1 mb-4">
          Product Information
        </p>
        <div className="flex flex-col gap-y-3">
          <div className="rounded-md bg-transparent border-[2px] flex justify-between items-center border-black pl-3">
            <input
              type="text"
              placeholder="Product ID"
              className="py-2 bg-transparent text-black placeholder:text-black outline-none rounded-md"
              name="productID"
              value={formData.productID}
              onChange={handleChange}
            />
            {!formData.productID && (
              <div
                className="text-primaryBlue font-semibold px-2 rounded-md rounded-bl-none rounded-tl-none  cursor-pointer py-2 pr-3
              hover:bg-primaryBlue/20"
                onClick={() => {
                  if (!formData.category) return setAutoIDErrMsg(true);
                  if (autoIDErrMsg) setAutoIDErrMsg(false);
                  console.log(window.location.pathname);
                  setFormData((prev) => {
                    return {
                      ...prev,
                      productID: generateID({
                        type: "singleProduct",
                        details: {
                          category: formData.category,
                          deptID: window.location.pathname.split("/")[2],
                          count: 0,
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
          <input
            type="text"
            placeholder="Model Number"
            className="px-4 py-2 rounded-md outline-none text-black placeholder:text-black bg-transparent border-[2px]"
            name="modelNumber"
            value={formData.modelNumber}
            onChange={handleChange}
          />
          <div className="rounded-md bg-transparent border-[2px] flex justify-start items-center border-black px-4 py-2">
            <p className="mr-5">Date of Purchase</p>
            <input
              type="date"
              className=" rounded-md outline-none text-black placeholder:text-black bg-transparent"
              style={{ colorScheme: "light" }}
              name="datePurchased"
              value={formData.datePurchased}
              onChange={handleChange}
            />
          </div>
        </div>
      </div>
      {/* SUPPLIER INFO */}
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
      {/* WARRANTY INFO */}
      <div>
        <p className="text-xl font-bold border-b-black border-b-2 w-max pb-1 mb-4">
          Warranty Information
        </p>
        <div className="flex flex-col gap-y-3">
          <div className="rounded-md bg-transparent border-[2px] flex justify-start items-center border-black px-4 py-2">
            <p className="mr-5">Warranty Date</p>
            <input
              type="date"
              className="rounded-md outline-none text-black placeholder:text-black bg-transparent"
              style={{ colorScheme: "light" }}
              name="warrantyDate"
              value={formData.warrantyDate}
              onChange={handleChange}
            />
          </div>

          <textarea
            placeholder="Warranty Note..."
            className="px-4 py-2 rounded-md outline-none text-black placeholder:text-black bg-transparent border-[2px]"
            name="warrantyNote"
            value={formData.warrantyNote}
            onChange={handleChange}
          />
        </div>
      </div>
      {/* SYS INFO */}
      <div>
        <p className="text-xl font-bold border-b-black w-max pb-1 mb-4">
          <span className="border-b-2 pb-1">System Information</span>
          <span className="italic"> (optional)</span>
        </p>
        <div className="flex flex-col gap-y-3">
          <input
            type="text"
            placeholder="Processor"
            className="px-4 py-2 rounded-md outline-none text-black placeholder:text-black bg-transparent border-[2px]"
            name="processor"
            value={formData.processor}
            onChange={handleChange}
          />
          <input
            type="text"
            placeholder="Hard Drive"
            className="px-4 py-2 rounded-md outline-none text-black placeholder:text-black bg-transparent border-[2px]"
            name="hardDrive"
            value={formData.hardDrive}
            onChange={handleChange}
          />
          <input
            type="text"
            placeholder="RAM"
            className="px-4 py-2 rounded-md outline-none text-black placeholder:text-black bg-transparent border-[2px]"
            name="RAM"
            value={formData.RAM}
            onChange={handleChange}
          />
          <input
            type="text"
            placeholder="Operating System"
            className="px-4 py-2 rounded-md outline-none text-black placeholder:text-black bg-transparent border-[2px]"
            name="os"
            value={formData.os}
            onChange={handleChange}
          />
        </div>
      </div>
      {/* COST INFO */}
      <div>
        <p className="text-xl font-bold border-b-black border-b-2 w-max pb-1 mb-4">
          Cost Information
        </p>
        <div className="flex flex-col gap-y-3">
          <div className="px-4 py-2 rounded-md outline-none text-black placeholder:text-black bg-transparent border-[2px] flex">
            <p>Cost of Item: </p>
            <div className="ml-2 flex ">
              <p>₹</p>
              <input
                type="number"
                min={0}
                placeholder="0"
                className={`outline-none text-black placeholder:text-black bg-transparent ml-1 text-left`}
                name="costOfItem"
                value={formData.costOfItem}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="px-4 py-2 rounded-md outline-none text-black placeholder:text-black bg-transparent border-[2px] flex">
            <p>Discount Percentage:</p>
            <div className="flex justify-start">
              <input
                type="text"
                className="outline-none text-black placeholder:text-black bg-transparent mx-1 w-7 border-b-2 text-right"
                name="discountPercent"
                value={formData.discountPercent}
                onChange={handleChange}
              />
              <p>%</p>
            </div>
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

export default SingleProductForm;
