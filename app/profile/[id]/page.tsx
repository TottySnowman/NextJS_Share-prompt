"use client";
import { useState, useEffect } from "react";
import { post } from "@utils/PromptType";
import { useRouter, useSearchParams } from "next/navigation";
import Personal from "@components/Profile";
type params = {
  id: string;
};
type profileParams = {
  params: params;
};
const Profile = ({ params }: profileParams) => {
  const [posts, setPosts] = useState<post[]>([]);
  const searchParams = useSearchParams();
  const profileName = searchParams.get("name");

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`/api/users/${params.id}/posts`);
      const data = await response.json();
      setPosts(data);
      console.log(data);
    };
    if (params.id) fetchPosts();
  }, []);
  return (
    <Personal
      name={profileName as string}
      desc="See all posts of this user"
      data={posts}
    />
  );
};
export default Profile;
