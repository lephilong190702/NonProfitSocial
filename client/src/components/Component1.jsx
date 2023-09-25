import React from "react";
import { useDispatch } from "react-redux";

import { addUser } from "../features/user/userSlice";

const Component1 = () => {
  const dispatch = useDispatch();

  const handleAddUser = () => dispatch(addUser("Luong Dat"));

  return <button onClick={handleAddUser}>Add new user</button>;
};

export default Component1;