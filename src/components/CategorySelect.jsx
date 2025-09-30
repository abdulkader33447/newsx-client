import { useState } from "react";
import { FaTimes } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";

const CategorySelect = ({ register, setValue, errors, options }) => {
  const [categories, setCategories] = useState([]);
  const [selected, setSelected] = useState("");

  const addCategory = () => {
    if (selected && !categories.includes(selected)) {
      const newCategories = [...categories, selected];
      setCategories(newCategories);
      setValue("categories", newCategories); // react-hook-form এ value আপডেট
      setSelected("");
    }
  };

  const removeCategory = (cat) => {
    const newCategories = categories.filter((c) => c !== cat);
    setCategories(newCategories);
    setValue("categories", newCategories);
  };

  const handleSelectChange = (e) => {
    setSelected(e.target.value);
  };

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700">
        Categories <span className="text-red-600">*</span>
      </label>

      {/* Selected Categories Display */}
      <div className="flex flex-wrap items-center gap-2 border border-gray-300 rounded p-2 mt-1">
        {categories.map((cat, idx) => (
          <span
            key={idx}
            className="flex items-center gap-1 bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-sm"
          >
            {cat}
            <button
              type="button"
              onClick={() => removeCategory(cat)}
              className="text-blue-500 hover:text-red-500"
            >
              <FaTimes size={12} />
            </button>
          </span>
        ))}

        {/* Dropdown */}
        <div className="relative flex-1">
          <select
            className="w-full border-none focus:ring-0 p-1 outline-none appearance-none"
            value={selected}
            onChange={handleSelectChange}
          >
            <option value="">-- Select Category --</option>
            {options.map((opt, idx) => (
              <option key={idx} value={opt}>
                {opt}
              </option>
            ))}
          </select>

          <span className="absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none">
            <IoIosArrowDown />
          </span>
        </div>

        <button
          type="button"
          onClick={addCategory}
          className="bg-blue-500 text-white px-2 py-1 rounded text-sm"
        >
          Add
        </button>
      </div>

      {/* Hidden field for react-hook-form */}
      <input
        type="hidden"
        {...register("categories", { required: "Categories are required" })}
      />

      {errors.categories && (
        <p className="text-red-500 text-sm mt-1">{errors.categories.message}</p>
      )}
    </div>
  );
};

export default CategorySelect;
