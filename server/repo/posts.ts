import fetch from "node-fetch";
import { clone } from "../../utils";

const BLOGS = process.env.BLOGS.split(",");
const CATEGORIES = process.env.CATEGORIES.split(",");

interface PostCache {
  urls?: Array<string>;
  posts?: Array<any>;
  lastCached?: number;
}

const EXPIRE_IN = 15 * 60 * 1000; //15 minutes

const _cache: PostCache = {};

export const Post = async (uid: string) => {
  await Posts();
  const post = _cache.posts.find((post) => post.uid === uid);
  return post;
};

export const Posts = async (): Promise<Array<any>> => {
  if (_cache?.lastCached && Date.now() - _cache.lastCached < EXPIRE_IN) {
    return clone(_cache.posts);
  }

  const posts = [];
  const urls = await postURLs();
  const all = [];
  for (const url of urls) {
    all.push(
      fetch(url).then(async (result) => {
        if (result.ok) {
          const data = await result.json();
          for (let post of data) {
            post.site = result.url?.split("/")[2];
            post.uid = `${post.site}-${post.slug}`;
            posts.push(post);
          }
        }
      })
    );
  }

  await Promise.all(all);

  posts.sort((a, b) => {
    const adate = new Date(a.date_gmt),
      bdate = new Date(b.date_gmt);

    if (adate < bdate) return -1;
    if (adate > bdate) return 1;
    return 0;
  });

  _cache.posts = posts;
  _cache.lastCached = Date.now();
  const p = clone(posts);
  for (let post of p) {
    delete post["content"];
  }
  return p;
};

const postURLs = async (): Promise<Array<string>> => {
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
      urls.push(
        `${blog}/wp-json/wp/v2/posts?categories=${catids.join(
          ","
        )}&_fields=id,site,title,excerpt,slug,content`
      );
    }
  }
  _cache.urls = urls;
  return urls;
};
