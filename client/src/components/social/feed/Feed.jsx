import React from 'react'
import "./feed.css"
import Share from '../share/Share';

const Feed = () => {
    return (
        <div className="feed">
          <div className="feedWrapper">
            <Share />
            {/* {Posts.map((p) => (
              <Post key={p.id} post={p} />
            ))} */}
          </div>
        </div>
      );
}

export default Feed