import React, { memo } from "react";
import { useSelector } from "react-redux";

const Component2 = () => {
  const users = useSelector((state) => state.user.list);
  console.log(users);
  return (
    <div>
      {users.map((user) => <p key={user.id}>{user.name}</p> )}
    </div>
  );
};

export default memo(Component2);