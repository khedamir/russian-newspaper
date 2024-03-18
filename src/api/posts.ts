import { PostType } from "./types";

type FecthPostParams = {
  limit: number;
  page: number;
};

const fetchPosts = async ({ limit, page }: FecthPostParams) => {
  try {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/posts?_limit=${limit}&_page=${page}`
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data as PostType[];
  } catch (error) {
    console.error("There has been a problem with your fetch operation:", error);
  }
};

export { fetchPosts };
