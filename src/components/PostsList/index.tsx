import React, { useState, useEffect, useRef, useCallback } from "react";
import PostItem from "../PostItem";
import style from "./PostsList.module.scss";
import { useNavigate, useLocation } from "react-router-dom";
import useIntersectionObserver from "../../hooks/useIntersectionObserver";
import useUpdateQueryParams from "../../hooks/useUpdateQueryParams";
import { PostType } from "../../api/types";
import { fetchPosts } from "../../api/posts";

const PostsList = () => {
  const [posts, setPosts] = useState<PostType[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const [initialLoad, setInitialLoad] = useState(true);
  const [observerStopped, setObserverStopped] = useState(false);
  const loader = useRef(null);

  const navigate = useNavigate();
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const pageParam = parseInt(queryParams.get("page") || "1");
  const [page, setPage] = useState(pageParam);

  useUpdateQueryParams(page, pageParam, navigate);

  const handleObserver = useCallback(
    (entities: any[]) => {
      if (isLoading || initialLoad || observerStopped) {
        return;
      }
      const target = entities[0];
      if (target.isIntersecting) {
        setPage((prev) => prev + 1);
      }
    },
    [isLoading, initialLoad, observerStopped]
  );

  // observer initialition
  useIntersectionObserver(loader, handleObserver, observerStopped);

  // fetch posts
  useEffect(() => {
    if (initialLoad) {
      setInitialLoad(false);
      return;
    }

    // Остановка observer'а после загрузки пяти страниц
    if (page >= 5) {
      setObserverStopped(true);
    }

    setIsLoading(true);
    fetchPosts({ limit: 10, page: page }).then((result) => {
      if (result) {
        setPosts((prev) => [...prev, ...result]);
        setIsLoading(false);
      }
    });
  }, [page, initialLoad]);

  return (
    <div className={style.postsList}>
      {posts.map((post) => (
        <PostItem post={post} key={post.id} />
      ))}
      {observerStopped && (
        // Показываем кнопку только если observer остановлен
        <button
          className={style.loadButton}
          onClick={() => setPage((prev) => prev + 1)}
          disabled={isLoading}
        >
          {isLoading ? "Loading..." : "Load More"}
        </button>
      )}
      <div ref={loader} />
    </div>
  );
};

export default PostsList;
