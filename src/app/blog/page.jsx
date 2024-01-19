import PostCard from "@/components/postCard/postCard";
import styles from "./blog.module.css";

// FETCH DATA WITH AN API
const getData = async () => {
  const res = await fetch("https://blog-app-silk-tau.vercel.app/api/blog", {
    // const res = await fetch("http://localhost:3000/api/blog", {
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error("Something went wrong");
  }
  return res.json();
};

const BlogPage = async () => {
  // FETCH DATA WITH AN API
  const posts = await getData();
  // FETCH DATA WITHOUT AN API
  // const posts = await getPosts();
  // console.log("posts :>> ", posts);
  return (
    <div className={styles.container}>
      {posts.map((post, index) => (
        <div className={styles.post} key={index}>
          <PostCard post={post} />
        </div>
      ))}
    </div>
  );
};

export default BlogPage;
