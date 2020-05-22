import fetch from "node-fetch";

const BLOGS = process.env.BLOGS.split(",");
const CATEGORIES = process.env.CATEGORIES.split(",");

interface PostCache {
  urls?: Array<string>;
  posts?: Array<any>;
  lastCached?: number;
}

const EXPIRE_IN = 5 * 60 * 1000; //5 minutes

const _cache: PostCache = {};

export const Post = async (uid: string) => {
  const posts = await Posts();
  return posts.find((post) => post.uid === uid);
};

export const Posts = async () => {
  if (_cache?.lastCached && Date.now() - _cache.lastCached < EXPIRE_IN) {
    return [..._cache.posts];
  }

  const posts = [];
  const urls = await PostURLs();
  for (const url of urls) {
    const result = await fetch(url);
    if (result.ok) {
      const data = await result.json();
      for (let post of data) {
        post.uid = url.split("/")[2] + post.id;
        posts.push(post);
      }
    }
  }

  posts.sort((a, b) => {
    const adate = new Date(a.date_gmt),
      bdate = new Date(b.date_gmt);

    if (adate < bdate) return -1;
    if (adate > bdate) return 1;
    return 0;
  });

  _cache.posts = posts;
  _cache.lastCached = Date.now();
  return [...posts];
};

const PostURLs = async (): Promise<Array<string>> => {
  const urls = [];

  for (const blog of BLOGS) {
    const result = await fetch(`${blog}/wp-json/wp/v2/categories`);
    if (result.ok) {
      const wpcats: Array<any> = await result.json();
      const catids = [];
      for (const wpcat of wpcats) {
        if (CATEGORIES.includes(wpcat.slug)) {
          catids.push(wpcat.id);
        }
      }
      urls.push(`${blog}/wp-json/wp/v2/posts?categories=${catids.join(",")}`);
    }
  }
  _cache.urls = urls;
  return urls;
};
