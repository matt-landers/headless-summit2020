import { useEffect, useState } from "react";

let _posts = [];

// export const Post = async (uid: string) => {
//   const result = await fetch(`/api/posts/${uid}`);

// };

export const Posts = async (baseurl: string) => {
  if (_posts.length > 0) return _posts;
  const result = await fetch(`${baseurl}api/posts`);
  if (!result.ok) {
    return [];
  }
  _posts = await result.json();
  return [..._posts];
};

// export const usePosts = () => {
//   const [posts, setPosts] = useState([]);
//   useEffect(() => {
//     Posts().then((p) => setPosts(p));
//   }, []);
//   return posts;
// };
