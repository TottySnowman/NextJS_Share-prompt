import { post } from "@utils/PromptType";
import PromptCard from "./PromptCard";
type personal = {
  name: string;
  desc: string;
  handleEdit?: (post: post) => void;
  handleDelete?: (post: post) => void;
  data: post[];
};
const Personal = ({ ...props }: personal) => {
  return (
    <section className="w-full">
      <h1 className="head_text text-left">
        <span className="blue_gradient">{props.name}</span> Profile
      </h1>
      <p className="desc text-left">{props.desc}</p>

      <div className="mt-10 prompt_layout">
        {props.data.map((post) => (
          <PromptCard
            key={post._id}
            _id={post._id}
            prompt={post.prompt}
            tag={post.tag}
            creator={post.creator}
            handleEdit={() => props.handleEdit && props.handleEdit(post)}
            handleDelete={() => props.handleDelete && props.handleDelete(post)}
          />
        ))}
      </div>
    </section>
  );
};

export default Personal;
