import { useState, useEffect } from "react";
import useAxios from "../Hooks/useAxios";
import Loading from "../components/Loading";
import useAuth from "../Hooks/useAuth";
import { AiOutlineUser } from "react-icons/ai";
import { Link } from "react-router";

const RecentBlogs = () => {
  const axios = useAxios();

  const { user } = useAuth();
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
console.log(blogs, "from recent blog");

  const fetchBlogs = async () => {
    setLoading(true);
    try {
      const res = await axios.get("/blogs/recent");
      setBlogs(res.data.data);
    } catch (error) {
      console.error("Error fetching recent blogs:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="mt-15 bg-[#0C0A25] text-gray-200 min-h-screen">
      <div className="sm:w-8/12 w-11/12 mx-auto pt-10">
        <h1 className="lg:text-3xl text-2xl font-bold mb-6">
          Our Recent <br /> Blogs
        </h1>

        {/* Blog List */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-15">
          {blogs.length > 0 ? (
            blogs.map((blog) => (
              <div key={blog._id}>
                
                <img
                  src={blog.imageUrl}
                  alt={blog.title}
                  className="w-full h-40 object-cover rounded mb-3 hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                />
                <h3 className="text-[#83C5E0] sm:text-xl text-lg sm:mt-5 mt-3">
                    {blog.categories}
                  </h3>
                <Link to={`/blog/${blog._id}`} className="text-2xl font-semibold my-4">
                  {blog.title}
                </Link>
                <p className="text-sm text-gray-400 mt-2">{blog.summary}</p>
                <div className="mt-4 flex items-center gap-3">
                  <div>
                    {user?.photoURL ? (
                      <img
                        src={user?.photoURL}
                        alt="photoURL"
                        className="w-8 h-8 rounded-full"
                      />
                    ) : (
                      <AiOutlineUser className="size-8" />
                    )}
                  </div>
                  <div>
                    <div>Author: {blog.author}</div>
                    <div>Date: {blog.publish_date}</div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>No blogs found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default RecentBlogs;
