import { Layout } from "../../components";
import styles from "../../styles/post.module.scss";
import { GetServerSideProps } from "next";
import { Post as GetPost } from "../../repo/posts";
import { scrub } from "../../utils";

const Post = ({ post }) => {
  return (
    <Layout className={styles.post}>
      <header>
        <h2 className={styles.sitetitle}>
          Headless WordPress and Content Management Systems
        </h2>
      </header>
      <article className={styles.article}>
        <span className={styles.metadata}>PUBLISHED: </span>
        <span className={styles.metadataValue}>
          {new Date(post.date).toLocaleDateString("en-us", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </span>
        <span> </span>
        <span className={styles.metadata}>VIEW ON: </span>
        <span className={styles.metadataValue}>
          <a href={post?.link} target="_blank">
            {post?.site}
          </a>
        </span>
        <h1 className={styles.blogtitle}>{post?.title?.rendered}</h1>
        <div
          dangerouslySetInnerHTML={{ __html: scrub(post?.content?.rendered) }}
        ></div>
      </article>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const post = await GetPost((ctx as any).params["id"]);

  return { props: { post } };
};

export default Post;
