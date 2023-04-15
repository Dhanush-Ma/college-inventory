import Product from "./Product";
import { singleProductHeadings } from "../../utilities/tableDetails";


const SingleProducts = ({
  data,
  setCurrentProduct,
  setShowServiceModal,
  roomID,
}) => {

  return (
    <>
      <div className="container scrollbar rounded-sm relative">
        <table>
          <thead>
            <tr>
              {singleProductHeadings.map((heading, idx) => (
                <th key={idx}>{heading}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.length > 0 ? (
              data.map((item, idx) => {
                return (
                  <Product
                  key={idx}
                    roomID={roomID}
                    item={item}
                    length={singleProductHeadings.length}
                    setCurrentProduct={setCurrentProduct}
                    setShowServiceModal={setShowServiceModal}
                  />
                );
              })
            ) : (
              <p className="w-max ml-1 mt-5">No product data Available!</p>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default SingleProducts;
