import React from "react";
import PostsList from "../components/PostsList";

const Posts = () => {
  return (
    <div className="posts">
      <h1 className="page-title">Posts list</h1>
      <PostsList />
    </div>
  );
};

export default Posts;
