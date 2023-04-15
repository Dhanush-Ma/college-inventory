import moment from "moment";

const formatDate = (date) => {
    const reqDate = moment(date).format("DD-MM-YYYY");

    return reqDate
};

export default formatDate;
