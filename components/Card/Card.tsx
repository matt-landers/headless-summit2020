import Link from "next/link";
import styles from "./Card.module.scss";

export const Card = ({ post }) => (
  <Link href="/posts/[id]" as={`/posts/${post.uid}`}>
    <div className={styles.card}>
      <span className={styles.site}>{post.link.split("/")[2]}</span>
      <h3
        className={styles.title}
        dangerouslySetInnerHTML={{ __html: post.title.rendered }}
      />
      <div
        className={styles.excerpt}
        dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}
      ></div>
      <div className={styles.bar}></div>
    </div>
  </Link>
);
