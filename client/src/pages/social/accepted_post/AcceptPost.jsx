import React, { useEffect, useState } from "react";

const AcceptPost = () => {
  const [post, setPost] = useState([]);

  useEffect(() => {
    const loadPosts = async () => {
      try {
        let res = await authApi().get(endpoints["public-posts"]);
        setPost(res.data);
      } catch (error) {
        console.log(error);
      }
    };
  }, []);
  return <div>AcceptPost</div>;
};

export default AcceptPost;
