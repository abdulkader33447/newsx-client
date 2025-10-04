import { useEffect, useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import useAxios from "../../Hooks/useAxios";
import { FaRegFileLines } from "react-icons/fa6";

const PostedBlog = () => {
  const [blogs, setBlogs] = useState([]);
  const axios = useAxios();

  useEffect(() => {
    const getBlogs = async () => {
      try {
        const res = await axios.get("/blogs");
        setBlogs(res.data.data || []);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };

    getBlogs();
  }, [axios]);

  return (
    <div className="w-11/12 mx-auto mt-10">
      <div className="bg-gray-100 text-gray-700 py-4 rounded-lg sm:w-80 w-full mx-auto mb-6">
        <div className="flex items-center gap-5 px-6">
          <FaRegFileLines className="text-[#F96708] p-2 bg-[#F96708]/20 rounded-lg size-10" />
          <h4>Total Posts</h4>
        </div>
        <hr className="text-gray-300 my-5" />

        <div className="px-6">
          <p className="">{blogs.length}</p>
          <p>Lifetime</p>
        </div>
      </div>
      {/* Header */}
      <h1 className="text-2xl font-semibold mb-6">Recent Posts</h1>

      {/* Table */}
      <div className="overflow-x-auto rounded-lg shadow">
        <table className="min-w-full text-sm text-left">
          <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
            <tr>
              <th className="px-4 py-3">S/N</th>
              <th className="px-4 py-3">Title</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Views</th>
              <th className="px-4 py-3">Date Published</th>
              <th className="px-4 py-3">Author</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {blogs.map((blog, index) => (
              <tr
                key={blog._id}
                className="border-b border-gray-200 hover:bg-gray-50 transition"
              >
                <td className="px-4 py-3">
                  {String(index + 1).padStart(2, "0")}
                </td>
                <td className="px-4 py-3">{blog.title}</td>
                <td className="px-4 py-3">
                  <span
                    className={`font-medium ${
                      blog.status === "Published"
                        ? "text-green-500"
                        : blog.status === "Draft"
                        ? "text-blue-500"
                        : "text-green-500"
                    }`}
                  >
                    {blog.status}Published
                  </span>
                </td>
                <td className="px-4 py-3">{blog.views || "0"}</td>
                <td className="px-4 py-3">
                  {blog.publish_date
                    ? new Date(blog.publish_date).toLocaleDateString()
                    : "N/A"}
                </td>
                <td className="px-4 py-3">{blog.author}</td>
                <td className="px-4 py-3 flex gap-3">
                  <button className="text-blue-500 hover:text-blue-700">
                    <FaEdit />
                  </button>
                  <button className="text-red-500 hover:text-red-700">
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PostedBlog;
