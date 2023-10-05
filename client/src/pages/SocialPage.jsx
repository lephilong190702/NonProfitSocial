import React from "react";

const SocialPage = () => {
  return (
    <>
      <div>SocialPage</div>
      <div>
        <header>
          <h1>Welcome to MySocial</h1>
        </header>
        <main>
          <section className="post-form">
            <h2>Create a New Post</h2>
            {/* Form for creating a new post */}
            <form>
              <textarea placeholder="What's on your mind?"></textarea>
              <button type="submit">Post</button>
            </form>
          </section>
          <section className="post-list">
            <h2>Recent Posts</h2>
            {/* List of recent posts */}
            <ul>
              <li>
                <p>Post 1: Lorem ipsum dolor sit amet.</p>
              </li>
              <li>
                <p>Post 2: Consectetur adipiscing elit.</p>
              </li>
              <li>
                <p>Post 3: Nullam fringilla purus at justo.</p>
              </li>
            </ul>
          </section>
        </main>
      </div>
    </>
  );
};

export default SocialPage;
