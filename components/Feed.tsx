"use client";
import { useState, useEffect } from "react";
import PromtCard from "./PromptCard";
import { post } from "@utils/PromptType";
type prompts = {
  data: post[];
};
const Feed = () => {
  const [searchText, setSearchText] = useState<string>("");
  const [posts, setPosts] = useState<post[]>([]);
  const [filteredResults, setFilteredResults] = useState<post[]>([]);
  const PromptCardList = ({ data }: prompts) => {
    return (
      <div className="mt-16 prompt_layout">
        {data.map((post) => (
          <PromtCard
            key={post._id}
            _id={post._id}
            prompt={post.prompt}
            tag={post.tag}
            creator={post.creator}
            handleTagClick={() => handleTagClick(post.tag)}
          />
        ))}
      </div>
    );
  };
  const handleTagClick = (tagname: string) => {
    setSearchText(tagname);
    filterSerachResults(tagname);
  };
  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch("/api/prompt");
      const data = await response.json();
      setPosts(data);
    };
    fetchPosts();
  }, []);
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(event.target.value);
    filterSerachResults(event.target.value);
  };

  const filterSerachResults = (searchText: string) => {
    const regex = new RegExp(searchText, "i");
    let filteredPrompts = posts.filter(
      (item) =>
        regex.test(item.creator.username) ||
        regex.test(item.tag) ||
        regex.test(item.prompt)
    );

    setFilteredResults(filteredPrompts);
  };
  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
          type="text"
          placeholder="Search for a tag or username"
          className="search_input peer"
          value={searchText}
          onChange={handleSearchChange}
          required
        />
      </form>

      {searchText ? (
        <PromptCardList data={filteredResults} />
      ) : (
        <PromptCardList data={posts} />
      )}
    </section>
  );
};

export default Feed;
