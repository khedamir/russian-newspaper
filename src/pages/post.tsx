import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { fetchPost } from "../api/post";
import { PostType } from "../api/types";

const Post = () => {
  const [post, setPost] = useState<PostType>();
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    fetchPost({ id: Number(id) }).then((result) => {
      if (result) {
        setPost(result);
        setLoading(false);
      }
    });
  }, [id]);

  return (
    <div className="post">
      {loading ? (
        "loading..."
      ) : (
        <>
          <h1 className="page-title">{post?.title}</h1>
          <p>{post?.body}</p>
          <Link to={"/"} className="back">
            Back to main page
          </Link>
        </>
      )}
    </div>
  );
};

export default Post;
