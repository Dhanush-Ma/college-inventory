import React, { createContext, useState } from "react";

export const Context = createContext();

const ContextProvider = (props) => {
  const [user, setUser] = useState(null);
  const [userDetails, setUserDetails] = useState(null);
  const [roomServiceDetails, setRoomServiceDetails] = useState([]);
  const [roomProducts, setRoomProducts] = useState({
    SingleProducts: [],
    BatchProducts: [],
  });

  return (
    <Context.Provider
      value={{
        user,
        setUser,
        userDetails,
        setUserDetails,
        roomServiceDetails,
        setRoomServiceDetails,
        roomProducts,
        setRoomProducts,
      }}
    >
      {props.children}
    </Context.Provider>
  );
};

export default ContextProvider;
