import React, { useState, useEffect } from "react";
import { getDataFromServer } from "../server-requests";
import { Post } from "./Post.jsx";

export default function Posts({ token }) {
  const [posts, setPosts] = useState([]);

  async function getPosts() {
    const data = await getDataFromServer(token, "/api/posts");
    setPosts(data);
  }

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <div>
      {posts.map((post) => (
        <Post key={post.id} postJSON={post} token={token} />
      ))}
    </div>
  );
}
