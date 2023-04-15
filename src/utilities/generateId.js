import { v4 as uuid } from "uuid";

const generateID = (flag) => {
  //   const id = uuid().slice(0, 8);
  //   return id;
  const { type, details } = flag;

  switch (type) {
    case "addRoom":
      return `${details.deptID}R${generateDigits(
        details.roomCount + 1,
        "room"
      )}`;
    case "singleProduct":
      return generateSingleProductID(details);
    case "batchProduct":
      return `${details.deptID}-BAT-${generateDigits(
        details.count + 1,
        "product"
      )}`;
  }
};

function generateSingleProductID(details) {
  const { category, deptID, count } = details;

  switch (category) {
    case "Computer":
      return `${deptID}-COM-${generateDigits(count + 1, "product")}`;
    case "CPU":
      return `${deptID}-CPU-${generateDigits(count + 1, "product")}`;
    case "Smart Board":
      return `${deptID}-SMB-${generateDigits(count + 1, "product")}`;
    case "UPS":
      return `${deptID}-UPS-${generateDigits(count + 1, "product")}`;
    case "Router":
      return `${deptID}-ROU-${generateDigits(count + 1, "product")}`;
  }
}

function generateDigits(number, flag) {
  if (flag === "room") return number < 10 ? `0${number}` : number;
  if (flag === "product")
    return number < 10 ? `00${number}` : number < 99 ? `0${number}` : number;
}

export default generateID;
