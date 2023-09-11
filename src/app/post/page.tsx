"use client";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";

type Author = {
  name: string;
};

type PostModel = {
  id: number;
  title: string;
  content: string;
  published: boolean;
  autherId: number;
  author: Author;
};

export default function Page() {
  const { data: session, status } = useSession();

  const [data, setData] = useState<PostModel[] | null>(null);
  const [isLoading, setLoading] = useState(true);

  if (!session) {
    return (
      <>
        <h1>Posts</h1>
        <p>You must be signed in to view this page</p>
      </>
    );
  }

  const token = session?.user.accessToken;

  useEffect(() => {
    setLoading(true);
    fetch("http://localhost:3000/api/post", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  if (isLoading) return <p>Loading...</p>;
  if (!data) return <p>No posts data</p>;

  return (
    <>
      <h1>Posts</h1>
      <p>This page show to logined user</p>
      <ul>
        {data.map((post: PostModel) => {
          return (
            <li key={post.id}>
              <b>{post.author.name}</b> : {post.title}
            </li>
          );
        })}
      </ul>
    </>
  );
}
