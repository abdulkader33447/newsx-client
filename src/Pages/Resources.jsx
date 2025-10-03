import { useEffect, useState } from "react";
import useAxios from "../Hooks/useAxios";
import { AiOutlineUser } from "react-icons/ai";
import Loading from "../components/Loading";
import useAuth from "../Hooks/useAuth";
import Pagination from "../components/Pagination";
import CategorySearch from "../components/CategorySearch";

const Resources = () => {
  const axiosInstance = useAxios();
  const { user } = useAuth();
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [categories, setCategories] = useState([
    ".NET",
    "AI",
    "Blockchain",
    "Blog",
    "Businesses",
    "Data Engineering",
    "Git",
    "Golang",
    "Java",
    "JavaScript",
    "Mobile App Development",
    "MVP",
    "Personal",
    "Programming & Development",
    "Python",
    "React",
    "Software Development",
    "SQL Server",
    "Staff-Augmentation",
    "Technology",
    "Web",
  ]);
  const [showCategories, setShowCategories] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  // get blogs with pagination
  useEffect(() => {
    const fetchBlogs = async () => {
      setLoading(true);
      try {
        const res = await axiosInstance.get(`/resources?page=${page}`);
        setBlogs(res.data.data);
        setTotalPages(res.data.totalPages);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, [axiosInstance, page]);

  const filteredCategories = categories.filter((cat) =>
    cat.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <Loading />;

  return (
    <div className="sm:pt-40 pt-28 lg:w-8/12 w-11/12 mx-auto">
      <h1 className="lg:text-5xl text-2xl font-semibold mb-5">
        Resources and insights
      </h1>
      <p className="mb-10">
        The latest industry news, interviews, technologies and resources.
      </p>
      {/* response && response.details && response.details.views ? response.details.views: 0 */}
      <div className="flex lg:flex-row flex-col justify-between gap-3 space-y-5 mb-10">
        {/* categories */}
        <div className="relative">
          <CategorySearch categories={categories} onSearch={setSearchTerm} />

          <h1 className="text-lg font-semibold text-[#74BEDC] cursor-pointer">
            Blog Categories
          </h1>

          {/* All Categories Button */}
          <button
            className="py-1 px-3 bg-[#503AF2] rounded cursor-pointer mt-3"
            onClick={() => setShowCategories(!showCategories)}
          >
            All Categories
          </button>

          {/* Category List */}

          {showCategories && (
            <div className="absolute top-fit left-0 w-fit backdrop-blur-md shadow-lg rounded mt-2 flex flex-col gap-2 z-auto md:shadow-none md:bg-transparent md:mt-2 md:z-auto">
              {filteredCategories.length > 0 ? (
                filteredCategories.map((cat, idx) => (
                  <span key={idx} className="px-3 py-1 rounded cursor-pointer">
                    {cat}
                  </span>
                ))
              ) : (
                <p className="text-sm text-gray-500">No categories found</p>
              )}
            </div>
          )}
        </div>

        {/* blogs list */}
        <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-4">
          {blogs.length === 0 ? (
            <p>No blogs found.</p>
          ) : (
            blogs.map((blog) => (
              <div key={blog._id} className="sm:w-96 w-11/12 mx-auto mb-10">
                <figure>
                  <img
                    src={blog.imageUrl}
                    alt={blog.title}
                    className="w-full h-56 object-cover rounded-t-lg"
                    loading="lazy"
                  />
                </figure>
                <div>
                  <h3 className="text-[#83C5E0] sm:text-xl text-lg sm:mt-5 mt-3">
                    {blog.categories}
                  </h3>
                  <h2 className="sm:text-2xl text-xl sm:my-5 my-3">
                    {blog.title}
                  </h2>
                  <p className="text-sm text-gray-400">{blog.summary}</p>
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
              </div>
            ))
          )}
        </div>
      </div>

      <Pagination page={page} totalPages={totalPages} setPage={setPage} />
    </div>
  );
};

export default Resources;
