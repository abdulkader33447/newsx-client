import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router";
import useAxios from "../Hooks/useAxios";
import Loading from "../components/Loading";
import { MdOutlineKeyboardDoubleArrowRight } from "react-icons/md";
import {
  FaChevronDown,
  FaFacebook,
  FaLinkedin,
  FaTwitter,
} from "react-icons/fa";
import desit from "../assets/image 12 (1).png";
import { GoArrowRight, GoLink } from "react-icons/go";
import BlogDetailFooter from "../components/BlogDetailFooter";

const BlogDetail = () => {
  const { id } = useParams();
  const axios = useAxios();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  const location = useLocation();
  // console.log(location.pathname);
  const currentPath = location.pathname.replace(/^\//, "");
  console.log(currentPath);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await axios.get(`/blogs/${id}`);
        setBlog(res.data.data);
      } catch (error) {
        console.error("Error fetching blog details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [axios, id]);

  if (loading) return <Loading />;
  if (!blog) return <p>Blog not found</p>;

  return (
    <div className="mt-15 pb-10 bg-[#E3F5FF] min-h-screen">
      <div className="sm:w-8/12 w-11/12 mx-auto py-10">
        <p className="py-1 px-4 mb-3 rounded-full border border-gray-300 bg-[#FAF6D4] w-fit mx-auto">
          {blog.categories}
        </p>
        <h1 className="sm:text-5xl text-2xl text-center font-bold mb-4">
          {blog.title}
        </h1>
        {/* <p className="text-gray-400 mb-2">Author: {blog.author}</p> */}
        <p className="text-gray-500 text-center my-10">
          Publish Date: {blog.publish_date}
        </p>
        <div className="mb-6 text-gray-500">
          <p className="flex flex-wrap items-center justify-center gap-2 text-[#2F00DA]/70">
            <span>Home</span>{" "}
            <MdOutlineKeyboardDoubleArrowRight className="size-5" />{" "}
            {blog.categories}{" "}
            <MdOutlineKeyboardDoubleArrowRight className="size-5" />
            <span className="text-black font-semibold">{blog.title}</span>
          </p>
        </div>
        <img
          src={blog.imageUrl}
          alt={blog.title}
          className="w-full h-80 object-cover rounded mb-6 hover:scale-105 transition-transform duration-700"
        />
        <div className="flex gap-5 mt-20">
          <div className="w-1/4 hidden lg:block">
            <h3 className="flex items-center gap-20 text-lg text-[#2F00DA]/70 font-semibold mb-4 cursor-pointer w-fit mx-auto">
              <span className="leading-none">Table of Contents</span>
              <FaChevronDown className="inline-block align-middle w-4 h-4" />
            </h3>
            <hr className="text-gray-300" />
            <div className="my-10 space-y-6">
              <h2 className="text-lg text-[#2F00DA]/70 font-semibold">
                Contributors
              </h2>
              <img src={desit} alt="image" className="w-7/12 " />
            </div>
            <hr className="text-gray-300" />
            <div className="flex  gap-4 mt-10 text-[#B3B3B3] items-center">
              <GoLink className="bg-white size-8 rounded-md border-2 border-gray-300 p-1" />
              <FaFacebook className="bg-white size-8 rounded-md border-2 border-gray-300 p-1" />
              <FaTwitter className="bg-white size-8 rounded-md border-2 border-gray-300 p-1" />
              <FaLinkedin className="bg-white size-8 rounded-md border-2 border-gray-300 p-1" />
            </div>
            <div className="mt-10 h-[500px] bg-[#D6F4FE]/50 p-4 rounded-lg">
              <h1 className="text-3xl font-semibold">
                Want to accelerate your software development company?
              </h1>
              <p className="mt-4 text-gray-700">
                It has become a prerequisite for companies to develop custom
                software products to stay competitive.
              </p>
              <button className="flex items-center justify-between gap-6 mt-4 border-none bg-[#2F00DA]/90 text-white px-4 py-2 rounded-lg cursor-pointer">
                Hire The Best Team <GoArrowRight className="size-7" />
              </button>
            </div>
          </div>
          <div className="prose prose-invert lg:max-w-8/13 mx-auto text-gray-700">
            <div dangerouslySetInnerHTML={{ __html: blog.content }} />
          </div>
        </div>
      </div>
      <div>
        {/* <BlogDetailFooter /> */}
        <BlogDetailFooter />
      </div>
    </div>
  );
};

export default BlogDetail;
