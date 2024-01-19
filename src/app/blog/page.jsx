import PostCard from "@/components/postCard/postCard";
import React, { useState, useEffect } from "react";
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
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          "https://blog-app-silk-tau.vercel.app/api/blog",
          {
            cache: "no-store",
          }
        );

        if (!res.ok) {
          throw new Error("Something went wrong");
        }

        const posts = await res.json();
        setPosts(posts);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);
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
