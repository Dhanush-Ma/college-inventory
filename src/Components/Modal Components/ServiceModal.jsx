import { useContext, useState } from "react";
import { AiFillCloseCircle } from "../../utilities/IconsImport";

import axios from "axios";
import { Context } from "../../Context/Context";

const ServiceModal = ({ setShowServiceModal, currentProduct, userID, roomID }) => {
  const { setRoomServiceDetails } = useContext(Context);
  const [formData, setFormData] = useState({
    productID: currentProduct,
    cost: "",
    date: "",
    description: "",
  });

  const addService = () => {
    axios({
      method: "POST",
      url: "http://localhost:5000/services",
      data: {
        userID: userID,
        roomID: roomID,
        ...formData,
      },
    })
      .then((res) => {
        console.log(res.data)
        setRoomServiceDetails(res.data);
        setFormData({
          productID: currentProduct,
          cost: "",
          date: "",
          description: "",
        });
        setShowServiceModal(false);
        alert("Service details added Successfully!");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleChange = (e) => {
   
    setFormData((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };

  return (
    <div className="w-full h-full bg-[#121212]/80 absolute top-0 left-0">
      <div className="w-[60%] h-[80%] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#dbdbdb] absolute">
        <div className="w-[350px] flex flex-col items-center justify-center mx-auto py-5 pb-0 h-full">
          <div className="flex flex-col  h-max">
            <h1 className="text-black text-center text-xl font-medium mb-3">
              Add Service Details!
            </h1>
          </div>
          <form
            className="flex flex-col gap-y-5 w-[350px] mx-auto justify-start text-black mt-6 scrollbar pr-2 h-[80%]"
            style={{ overflowY: "scroll" }}
          >
            <div>
              <div className="flex flex-col gap-y-3">
                <input
                  type="text"
                  readOnly
                  className="px-4 py-2 rounded-md outline-none text-black placeholder:text-black bg-transparent border-[2px]"
                  name="modelNumber"
                  value={`Product ID: ${formData.productID}`}
                />
                
                <input
                  type="date"
                  className="px-4 py-2 rounded-md outline-none text-black placeholder:text-black bg-transparent border-[2px]"
                  style={{ colorScheme: "light" }}
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                />
                <div className="px-4 py-2 rounded-md outline-none text-black placeholder:text-black bg-transparent border-[2px] flex">
                  <p>Service Cost: </p>
                  <div className="ml-2 flex ">
                    <p>₹</p>
                    <input
                      type="number"
                      min={0}
                      placeholder="0"
                      className={`outline-none text-black placeholder:text-black bg-transparent ml-1 text-left`}
                      name="cost"
                      value={formData.cost}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <textarea
                  rows={10}
                  placeholder="Service Note..."
                  className="px-4 py-2 rounded-md outline-none text-black placeholder:text-black bg-transparent border-[2px]"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div
              className="bg-blackShade text-white px-2 py-2 rounded-md cursor-pointer text-center "
              onClick={addService}
            >
              ADD
            </div>
          </form>
        </div>
        <AiFillCloseCircle
          onClick={() => setShowServiceModal(false)}
          size={48}
          color="#fff"
          className="rounded-full absolute -top-5 -right-5 bg-black cursor-pointer"
        />
      </div>
    </div>
  );
};

export default ServiceModal;
