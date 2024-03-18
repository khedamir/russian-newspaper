import { PostType } from "./types";

type FecthPostParams = {
  id: number;
};

const fetchPost = async ({ id }: FecthPostParams) => {
  try {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/posts/${id}`
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data as PostType;
  } catch (error) {
    console.error("There has been a problem with your fetch operation:", error);
  }
};

export { fetchPost };
