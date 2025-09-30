import { useState, useMemo } from "react";
import { useController, useForm } from "react-hook-form";
import { FiFilm } from "react-icons/fi";
import TagsInput from "../../components/TagsInput";
import CategorySelect from "../../components/CategorySelect";
import axios from "axios";
import JoditEditor from "jodit-react";
import debounce from "lodash.debounce";

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
  const [loading, setLoading] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
      setValue("image", file);
    }
  };

  const onSubmit = async (data) => {
    setLoading(true);
    setError("");
    try {
      let imageUrl = null;
      if (data.image) {
        const formData = new FormData();
        formData.append("image", data.image);

        // VITE_imgbb_api_key
        const imgbbApiKey = import.meta.env.VITE_imgbb_api_key;
        const response = await axios.post(
          `https://api.imgbb.com/1/upload?key=${imgbbApiKey}`,
          formData
        );
        imageUrl = response.data.data.url;
      }

      const postData = {
        ...data,
        imageUrl: imageUrl || "",
      };

      // You can add API calls here.
      console.log("Form Data with Image URL:", postData);
      setSuccess("Blog post saved successfully!");

      reset();
      setImagePreview(null);
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

  // Jodit Editor configuration
  const config = useMemo(
    () => ({
      height: 500,
      placeholder: "Start writing your content here...",
    }),
    []
  );

  //  Important change: Debounced Change Handler created
// field.onChange will be called after 300ms delay, which will reduce re-rendering.
  const debouncedChange = useMemo(
    () =>
      debounce((newContent) => {
        field.onChange(newContent);
      }, 3000), 
    [field.onChange]
  );
  
  // Place Jodit Editor inside useMemo to avoid unnecessary re-renders
  const renderJoditEditor = useMemo(() => {
    return (
      <JoditEditor
        value={field.value}
        // 🛠️ Debounced handler use here
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
          {/* Submit Button form */}
          <div>
            <button
              onClick={handleSubmit(onSubmit)}
              className="bg-green-500 cursor-pointer text-white px-4 py-2 rounded mr-2"
              disabled={loading}
            >
              {loading ? "Publishing..." : "Publish"}
            </button>
            <button className="bg-blue-500 text-white px-4 py-2 rounded">
              Save
            </button>
          </div>
        </div>

        <div className="border-b border-gray-300 mb-4 pb-2 flex justify-between">
          <span className="text-blue-600">API ID: Z077279158</span>
          <span className="text-gray-500">Editing Draft Version</span>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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

            {/* Image Input */}
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
                  {...register("image")}
                  onChange={handleImageChange}
                />
              </div>
              {errors.image && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.image.message}
                </p>
              )}
            </div>
          </div>

          {/* Is Featured */}
          <div className="flex sm:flex-row flex-col sm:gap-5 gap-8">
            {/* Publish_on */}
            <div className="space-x-5">
              <label className="block text-lg font-medium text-gray-700">
                Publish_on
              </label>
              <input
                type="date"
                className="mb-5 border border-gray-300 rounded-md p-2"
                {...register("publish_date")}
              />
              {errors.publish_date && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.publish_date.message}
                </p>
              )}
              <input
                type="time"
                className="border border-gray-300 rounded-md p-2"
                {...register("publish_time")}
              />
              {errors.publish_time && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.publish_time.message}
                </p>
              )}
            </div>

            {/* Is_Featured */}
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
            {errors.tags && (
              <p className="text-red-500 text-sm mt-1">{errors.tags.message}</p>
            )}
          </div>

          {/* Category */}
          <div>
            <CategorySelect
              register={register}
              setValue={setValue}
              errors={errors}
              options={categoryOptions}
            />
          </div>

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
            {errors.author && (
              <p className="text-red-500 text-sm mt-1">
                {errors.author.message}
              </p>
            )}
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

          {/* Blog Content (Jodit Editor) */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Blog Content <span className="text-red-600">*</span>
            </label>

            {/* Debounced Editor */}
            {renderJoditEditor}

            {errors.content && (
              <p className="text-red-500 text-sm mt-1">
                {errors.content.message}
              </p>
            )}
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
          <button className="w-full bg-purple-500 text-white py-2 rounded hover:bg-purple-600">
            Edit The Model
          </button>
          <button className="w-full bg-purple-500 text-white py-2 rounded hover:bg-purple-600">
            Configure The View
          </button>
          <button className="w-full bg-red-500 text-white py-2 rounded hover:bg-red-600">
            Delete This Entry
          </button>
        </div>
      </div>
    </div>
  );
};

export default BlogPostForm;