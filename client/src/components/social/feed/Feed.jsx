import React, { useEffect, useState } from 'react';
import "./feed.css";
import Share from '../share/Share';
import ApiConfig, { endpoints } from '../../../configs/ApiConfig';
import Post from '../post/Post';

const Feed = () => {
  const [posts, setPosts] = useState([]); // Sử dụng một mảng để lưu trữ danh sách bài viết

  useEffect(() => {
    const loadPosts = async () => {
      try {
        const response = await ApiConfig.get(endpoints["post"]);
        setPosts(response.data);
      } catch (error) {
        console.error("Error loading posts:", error);
      }
    }

    loadPosts();
  }, []);

  return (
    <div className="feed">
      <div className="feedWrapper">
        <Share />
        {/* Hiển thị danh sách bài viết */}
        {posts.map((post) => (
          <Post
            key={post.id}
            id={post.id}
            content={post.content}
            createDate={post.createDate}
            emoji={post.status}
            userId={post.user_id}
          />
        ))}
      </div>
    </div>
  );
}

export default Feed;
