import { useState } from "react";
import { AiFillCloseCircle } from "../../utilities/IconsImport";
import generateID from "../../utilities/generateId";
import axios from "axios";
import BatchProductForm from "./Product Modal Components/BatchProductForm";
import SingleProductForm from "./Product Modal Components/SingleProductForm";

const ProductModal = ({ setShowModal, id, roomID, batchProductsData }) => {
  const formOptions = ["Single Product", "Batch Products"];
  const [currentForm, setCurrenForm] = useState("Single Product");

  return (
    <div className="w-full h-full bg-[#121212]/80 absolute top-0 left-0">
      <div className="w-[60%] h-[80%] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#dbdbdb] absolute">
        <div className="w-[350px] mx-auto items-center py-5 pb-0 h-full ">
          <div className="flex flex-col justify-between h-max">
            <h1 className="text-black text-center text-xl font-medium mb-3">
              Add Product Details!
            </h1>
            <div className="flex mx-auto gap-x-5">
              {formOptions.map((option, idx) => {
                return (
                  <div
                    key={idx}
                    className={`flex justify-center items-center gap-x-2 border-2 border-blackShade px-3 py-[4px] rounded-md cursor-pointer text-black ${
                      currentForm === option &&
                      "border-none bg-gradient-to-r from-[#cc2b5e] to-[#753a88] text-white"
                    }`}
                    onClick={() => setCurrenForm(option)}
                  >
                    <p>{option}</p>
                  </div>
                );
              })}
            </div>
          </div>

          {currentForm === "Single Product" ? (
            <SingleProductForm
              setShowModal={setShowModal}
              userID={id}
              roomID={roomID}
            />
          ) : (
            <BatchProductForm
              setShowModal={setShowModal}
              userID={id}
              roomID={roomID}
              batchProductsData={batchProductsData}
            />
          )}
        </div>
        <AiFillCloseCircle
          onClick={() => setShowModal(false)}
          size={48}
          color="#fff"
          className="rounded-full absolute -top-5 -right-5 bg-black cursor-pointer"
        />
      </div>
    </div>
  );
};

export default ProductModal;

