import React from "react";

const SearchPost = ({ post }) => {
  return (
    <>
      {post &&
        post
          .slice()
          .reverse()
          .map((p) => (
            <div className="post" key={p.id}>
              <div className="postWrapper">
                <div className="postTop"></div>
              </div>
            </div>
          ))}
    </>
  );
};

export default SearchPost;
