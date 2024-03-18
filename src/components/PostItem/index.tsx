import React, { FC } from "react";
import style from "./PostItem.module.scss";
import { Link } from "react-router-dom";
import { PostType } from "../../api/types";

interface PostItemProps {
  post: PostType;
}

const PostItem: FC<PostItemProps> = ({ post }) => {
  return (
    <div className={style.postItem}>
      <Link to={`/post/${post.id}`}>
        <h2>
          {post.id} {post.title}
        </h2>
      </Link>
      <p>{post.body}</p>
    </div>
  );
};

export default PostItem;
