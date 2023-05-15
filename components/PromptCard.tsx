import { useState } from "react";
import { post } from "@utils/PromptType";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";

const PromptCard = ({
  _id,
  prompt,
  creator,
  tag,
  handleTagClick,
  handleEdit,
  handleDelete,
}: post) => {
  const [copied, setCopied] = useState<string>("");
  const { data: session } = useSession();
  const pathName = usePathname();
  const router = useRouter();
  const post: post = {
    _id,
    prompt,
    creator,
    tag,
  };
  const handleCopyClick = () => {
    setCopied(prompt);
    navigator.clipboard.writeText(prompt);
    setTimeout(() => setCopied(""), 3000);
  };

  const load_profile = () => {
    if (creator._id === session?.user?.id) {
      router.push("/profile");
    } else {
      router.push(`/profile/${creator._id}?name=${creator.username}`);
    }
  };

  return (
    <div className="prompt_card">
      <div className="flex justify-between items-start gap-5">
        <div
          className="flex-1 flex justify-start items-center gap-3 cursor-pointer"
          onClick={() => load_profile()}
        >
          <Image
            src={creator.image as string}
            alt="user_image"
            width={40}
            height={40}
            className="rounded-full object-contain"
          />

          <div className="flex flex-col">
            <h3 className="font-satoshi font-semibold text-gray-900">
              {creator.username}
            </h3>
          </div>
        </div>
        <div className="copy_btn">
          <Image
            src={
              copied === prompt
                ? "/assets/icons/tick.svg"
                : "/assets/icons/copy.svg"
            }
            alt="copy_btn"
            width={12}
            height={12}
            onClick={handleCopyClick}
          />
        </div>
      </div>
      <p className="my-4 font-satoshi text-sm text-gray-700">{prompt}</p>
      <p
        className="font-inter text-sm blue_gradient cursor-pointer"
        onClick={() => handleTagClick && handleTagClick(tag)}
      >
        #{tag}
      </p>

      {session?.user?.id === creator._id && pathName === "/profile" && (
        <div className="mt-5 flex-center gap-4 border-t border-gray-100 pt-3">
          <p
            className="font-inter text-sm green_gradient cursor-pointer"
            onClick={() => handleEdit && handleEdit(post)}
          >
            Edit
          </p>
          <p
            className="font-inter text-sm orange_gradient cursor-pointer"
            onClick={() => handleDelete && handleDelete(post)}
          >
            Delete
          </p>
        </div>
      )}
    </div>
  );
};

export default PromptCard;
