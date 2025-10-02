import { useState, useMemo } from "react";
import { useController, useForm } from "react-hook-form";
import { FiFilm } from "react-icons/fi";
import TagsInput from "../../components/TagsInput";
import CategorySelect from "../../components/CategorySelect";
import axios from "axios";
import JoditEditor from "jodit-react";
import debounce from "lodash.debounce";
import useAxios from "../../Hooks/useAxios";
import Swal from "sweetalert2";

const categoryOptions = [
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
];

const BlogPostForm = () => {
  const axiosInstance = useAxios();

  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
    reset,
  } = useForm();

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const [imageUrl, setImageUrl] = useState(""); // uploaded image url
  const [loading, setLoading] = useState(false);

  // 🔹 Image Upload to imgbb
  const handleImgUpload = async (e) => {
    const image = e.target.files[0];
    if (!image) return;

    setImagePreview(URL.createObjectURL(image));

    const formData = new FormData();
    formData.append("image", image);

    const imageUploadUrl = `https://api.imgbb.com/1/upload?key=${
      import.meta.env.VITE_imgbb_api_key
    }`;

    try {
      const res = await axios.post(imageUploadUrl, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      const uploadedUrl = res.data.data.url;
      setImageUrl(uploadedUrl);
    } catch (err) {
      console.error("Image upload failed:", err.response?.data || err);
      setError("Image upload failed");
    }
  };

  // 🔹 Submit Blog
  const onSubmit = async (data) => {
    setLoading(true);
    setError("");
    try {
      const { image, ...rest } = data;

      const postData = {
        ...rest,
        imageUrl, // uploaded image url
      };

      const blogRef = await axiosInstance.post("/blogs", postData);
      // console.log("Blog saved:", blogRef.data);

      setSuccess("Blog post saved successfully!");
      reset();
      setImagePreview(null);
      setImageUrl("");

      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Blog published",
        showConfirmButton: false,
        timer: 2000,
      });
    } catch (err) {
      setError("Failed to save blog post. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Jodit Editor useController
  const { field } = useController({
    name: "content",
    control,
    defaultValue: "",
    rules: { required: "Content is required" },
  });

  const config = useMemo(
    () => ({
      height: 500,
      placeholder: "Start writing your content here...",
    }),
    []
  );

  const debouncedChange = useMemo(
    () =>
      debounce((newContent) => {
        field.onChange(newContent);
      }, 500),
    [field.onChange]
  );

  const renderJoditEditor = useMemo(() => {
    return (
      <JoditEditor
        value={field.value}
        onChange={debouncedChange}
        config={config}
      />
    );
  }, [field.value, config, debouncedChange]);

  return (
    <div className="min-h-screen">
      <div className="sm:max-w-3xl mx-auto bg-[#E5E0E5] shadow-lg rounded-lg sm:p-6 p-3">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Blog Post</h2>
          <div>
            <button
              onClick={handleSubmit(onSubmit)}
              className="bg-green-500 cursor-pointer text-white px-4 py-2 rounded mr-2"
              disabled={loading}
            >
              {loading ? "Publishing..." : "Publish"}
            </button>
          </div>
        </div>

        {error && <p className="text-red-500">{error}</p>}
        {success && <p className="text-green-500">{success}</p>}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Title + Image */}
          <div className="flex items-center justify-center gap-5">
            {/* Title */}
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700">
                Title <span className="text-red-600">*</span>
              </label>
              <textarea
                className="w-full border border-gray-300 rounded p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                {...register("title", { required: "Title is required" })}
              ></textarea>
              {errors.title && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.title.message}
                </p>
              )}
            </div>

            {/* Image Upload */}
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700">
                Image
              </label>
              <div className="border border-dashed bg-white border-gray-300 p-4 text-center text-gray-500">
                <div className="flex justify-center items-center h-full">
                  <FiFilm className="text-4xl text-[#6200EE]" />
                </div>
                {imagePreview && (
                  <div className="mt-4">
                    <label className="block text-start text-sm font-medium text-gray-700">
                      Preview:
                    </label>
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="mt-2 max-h-20 rounded border"
                    />
                  </div>
                )}
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImgUpload}
                />
              </div>
            </div>
          </div>

          {/* Publish Date + Featured */}
          <div className="flex sm:flex-row flex-col sm:gap-5 gap-8">
            <div className="space-x-5">
              <label className="block text-lg font-medium text-gray-700">
                Publish_on
              </label>
              <input
                type="date"
                className="mb-5 border border-gray-300 rounded-md p-2"
                {...register("publish_date")}
              />
              <input
                type="time"
                className="border border-gray-300 rounded-md p-2"
                {...register("publish_time")}
              />
            </div>

            <div>
              <label className="block text-lg font-medium text-gray-700">
                Is_Featured
              </label>
              <select
                className="border border-gray-300 rounded-md p-2"
                {...register("is_featured", {
                  required: "Please select an option",
                })}
              >
                <option value="" disabled>
                  -- Select --
                </option>
                <option value="true">TRUE</option>
                <option value="false">FALSE</option>
              </select>
              {errors.is_featured && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.is_featured.message}
                </p>
              )}
            </div>
          </div>

          {/* Tags */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Tags <span className="text-red-600">*</span>
            </label>
            <TagsInput
              register={register}
              setValue={setValue}
              errors={errors}
            />
          </div>

          {/* Category */}
          <CategorySelect
            register={register}
            setValue={setValue}
            errors={errors}
            options={categoryOptions}
          />

          {/* Author */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Author <span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              placeholder="Author"
              className="w-full border border-gray-300 rounded p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
              {...register("author", { required: "Author is required" })}
            />
          </div>

          {/* Summary */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Summary <span className="text-red-600">*</span>
            </label>
            <textarea
              className="w-full border border-gray-300 rounded p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows="3"
              placeholder="Summary"
              {...register("summary")}
            />
          </div>

          {/* Meta Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Meta Description
            </label>
            <textarea
              className="w-full border border-gray-300 rounded p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows="3"
              placeholder="Description"
              {...register("metaDescription")}
            />
          </div>

          {/* Blog Content */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Blog Content <span className="text-red-600">*</span>
            </label>
            {renderJoditEditor}
            {errors.content && (
              <p className="text-red-500 text-sm mt-1">
                {errors.content.message}
              </p>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default BlogPostForm;
