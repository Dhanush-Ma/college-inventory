import React from "react";
import "../../table.css";
import formatDate from "../../utilities/formatDate";
import { AiOutlineDown } from "../../utilities/IconsImport";
import {
  batchProductAcessors,
  batchProductHeadings,
} from "../../utilities/tableDetails";

const BatchProducts = ({ data }) => {
  return (
    <div className="container scrollbar rounded-sm">
      <table>
        <thead>
          <tr>
            {batchProductHeadings.map((heading, idx) => (
              <th key={idx}>{heading}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((item, idx) => {
              return (
                <tr key={idx}>
                  {batchProductAcessors.map((accessor, idx) => {
                    if (accessor === "datePurchased")
                      return (
                        <td key={idx} className="capitalize">
                          {formatDate(item[accessor])}
                        </td>
                      );
                    return (
                      <td key={idx} className="capitalize">
                        {item[accessor]}
                      </td>
                    );
                  })}
                </tr>
              );
            })
          ) : (
            <p className="w-max ml-1 mt-5">No product data Available!</p>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default BatchProducts;
