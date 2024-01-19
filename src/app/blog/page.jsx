import PostCard from "@/components/postCard/postCard";
import styles from "./blog.module.css";

const BlogPage = ({ posts }) => {
  return (
    <div className={styles.container}>
      {posts.map((post) => (
        <div className={styles.post} key={post.id}>
          <PostCard post={post} />
        </div>
      ))}
    </div>
  );
};

export async function getServerSideProps() {
  // FETCH DATA FROM AN API OR DATABASE
  try {
    const res = await fetch("https://blog-app-silk-tau.vercel.app/api/blog", {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Something went wrong");
    }

    const posts = await res.json();

    return {
      props: {
        posts,
      },
    };
  } catch (error) {
    console.error("Error fetching data:", error.message);
    return {
      props: {
        posts: [],
      },
    };
  }
}

export default BlogPage;
