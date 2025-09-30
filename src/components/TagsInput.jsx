import { useState } from "react";
import { FaTimes } from "react-icons/fa";

const TagsInput = ({ register, setValue, errors }) => {
  const [tags, setTags] = useState([]);

  const addTag = (e) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      const value = e.target.value.trim();
      if (value && !tags.includes(value)) {
        const newTags = [...tags, value];
        setTags(newTags);
        setValue("tags", newTags); // react-hook-form value update
      }
      e.target.value = "";
    }
  };

  const removeTag = (tagToRemove) => {
    const newTags = tags.filter((tag) => tag !== tagToRemove);
    setTags(newTags);
    setValue("tags", newTags);
  };

  return (
    <div>
      <div className="flex flex-wrap items-center gap-2 border border-gray-300 rounded p-2 mt-1 focus-within:ring-2 focus-within:ring-blue-500">
        {tags.map((tag, idx) => (
          <span
            key={idx}
            className="flex items-center gap-1 bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-sm"
          >
            {tag}
            <button
              type="button"
              onClick={() => removeTag(tag)}
              className="text-blue-500 hover:text-red-500"
            >
              <FaTimes size={12} />
            </button>
          </span>
        ))}

        <input
          type="text"
          onKeyDown={addTag}
          placeholder="Type and press Enter..."
          className="flex-1 border-none focus:ring-0 p-1 outline-none"
        />
      </div>

      {/* Hidden field for react-hook-form */}
      <input
        type="hidden"
        {...register("tags", { required: "Tags are required" })}
      />

      {errors.tags && (
        <p className="text-red-500 text-sm mt-1">{errors.tags.message}</p>
      )}
    </div>
  );
};

export default TagsInput;
