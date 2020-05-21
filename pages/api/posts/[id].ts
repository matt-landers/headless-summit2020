import { Post } from "../../../repos/posts";
import { NextApiHandler } from "next";

const handler: NextApiHandler = async (req, res) => {
  const {
    query: { id },
  } = req;

  let post = await Post(id.toString());
  res.json(post);
};

export default handler;
