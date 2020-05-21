import { Posts } from "../../../server/repo/posts";
import { NextApiHandler } from "next";

const handler: NextApiHandler = async (req, res) => {
  let posts = await Posts();
  for (let post of posts) {
    delete post["content"];
  }
  res.json(posts);
};

export default handler;
