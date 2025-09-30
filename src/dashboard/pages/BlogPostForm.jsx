import { useState } from "react";
import { useForm } from "react-hook-form";

const BlogPostForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const onSubmit = async (data) => {
    try {
      // এখানে API কল যোগ করতে পারো (যেমন Strapi বা অন্য CMS)
      console.log("Form Data:", data);
      setSuccess("Blog post saved successfully!");
      setError("");
      reset();
      console.log("form submitted",data);
    } catch (err) {
      setError("Failed to save blog post. Please try again.");
      setSuccess("");
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen">
      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Blog Post</h2>
          <div>
            <button className="bg-green-500 text-white px-4 py-2 rounded mr-2">Publish</button>
            <button className="bg-blue-500 text-white px-4 py-2 rounded">Save</button>
          </div>
        </div>

        <div className="border-b border-gray-300 mb-4 pb-2 flex justify-between">
          <span className="text-blue-600">API ID: Z077279158</span>
          <span className="text-gray-500">Editing Draft Version</span>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Title *</label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
              {...register("title", { required: "Title is required" })}
            />
            {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>}
          </div>

          {/* Image Placeholder */}
          <div className="border border-dashed border-gray-300 p-4 text-center text-gray-500">
            Click to Add an Asset or Drag & Drop One in This Area
          </div>

          {/* Is Featured */}
          <div className="flex items-center space-x-4">
            <label className="block text-sm font-medium text-gray-700">Is Featured</label>
            <select className="border border-gray-300 rounded p-2">
              <option>TRUE</option>
              <option>FALSE</option>
            </select>
          </div>

          {/* Tags */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Tags *</label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
              {...register("tags", { required: "Tags are required" })}
            />
            {errors.tags && <p className="text-red-500 text-sm mt-1">{errors.tags.message}</p>}
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Category *</label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
              {...register("category", { required: "Category is required" })}
            />
            {errors.category && <p className="text-red-500 text-sm mt-1">{errors.category.message}</p>}
          </div>

          {/* Author */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Author *</label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
              {...register("author", { required: "Author is required" })}
            />
            {errors.author && <p className="text-red-500 text-sm mt-1">{errors.author.message}</p>}
          </div>

          {/* Summary */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Summary</label>
            <textarea
              className="w-full border border-gray-300 rounded p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows="3"
              {...register("summary")}
            />
          </div>

          {/* Meta Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Meta Description</label>
            <textarea
              className="w-full border border-gray-300 rounded p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows="3"
              {...register("metaDescription")}
            />
          </div>

          {/* Blog Content */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Blog Content *</label>
            <textarea
              className="w-full border border-gray-300 rounded p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows="6"
              {...register("content", { required: "Content is required" })}
            />
            {errors.content && <p className="text-red-500 text-sm mt-1">{errors.content.message}</p>}
          </div>

          {/* Information Section */}
          <div className="text-sm text-gray-500 mt-4">
            <p>Created: 6 seconds ago</p>
            <p>By: deshit-bd team</p>
            <p>Last Update: 6 seconds ago</p>
            <p>By: deshit-bd team</p>
          </div>
        </form>

        {/* Sidebar Actions */}
        <div className="mt-6 space-y-2">
          <button className="w-full bg-purple-500 text-white py-2 rounded hover:bg-purple-600">Edit The Model</button>
          <button className="w-full bg-purple-500 text-white py-2 rounded hover:bg-purple-600">Configure The View</button>
          <button className="w-full bg-red-500 text-white py-2 rounded hover:bg-red-600">Delete This Entry</button>
        </div>
      </div>
    </div>
  );
};

export default BlogPostForm;