"use client";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Personal from "@components/Profile";
import { post } from "@utils/PromptType";
const Profile = () => {
  const [posts, setPosts] = useState<post[]>([]);
  const { data: session } = useSession();
  const router = useRouter();
  const handleEdit = (post: post) => {
    router.push(`update-prompt?id=${post._id}`);
  };
  const handleDelete = async (post: post) => {
    const hasConfirmed = confirm(
      "Are you sure you want to delete this prompt?"
    );
    if (!hasConfirmed) return;

    try {
      await fetch(`/api/prompt/${post._id}`, {
        method: "DELETE",
      });

      const filteredPosts = posts.filter((p) => p._id !== post._id);
      setPosts(filteredPosts);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`/api/users/${session?.user?.id}/posts`);
      const data = await response.json();
      setPosts(data);
      console.log(data);
    };
    if (session?.user?.id) fetchPosts();
  }, []);
  return (
    <Personal
      name="My"
      desc="Welcome to your peronalized profile page"
      handleEdit={handleEdit}
      handleDelete={handleDelete}
      data={posts}
    />
  );
};
export default Profile;
