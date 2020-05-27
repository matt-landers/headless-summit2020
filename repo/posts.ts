import { useEffect, useState } from "react";

let _posts = [];

export const Post = async (uid: string) => {
  const result = await fetch(`${process.env.API_URL}/api/posts/${uid}`);
  return await result.json();
};

export const Posts = async () => {
  if (_posts.length > 0) return _posts;
  const url = `${process.env.API_URL}/api/posts`;
  const result = await fetch(url);
  if (!result.ok) {
    return [];
  }
  _posts = await result.json();
  return [..._posts];
};
