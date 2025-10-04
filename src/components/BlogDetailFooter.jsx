import imgOne from "../assets/image 11.png";
import imgTwo from "../assets/image-1.png";
import imgThree from "../assets/image-2.png";

const BlogDetailFooter = () => {
  return (
    <div className="w-11/12 lg:w-10/12 mx-auto mt-20 bg-[#01001E] text-white p-6 lg:py-30 lg:px-55 rounded-2xl">
      {/* Heading */}
      <h1 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-center lg:text-left">
        Blogs You May Love
      </h1>

      {/* Image Grid */}
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div>
          <img
            src={imgOne}
            alt="Blog"
            className="w-full h-auto rounded-lg object-cover hover:scale-105 transition-transform duration-700"
          />
          <p className="text-[#ADCDFE]/70 my-4">Software Development</p>
          <h1 className="sm:text-2xl text-xl">
            Top 20 Fintech Software Development Companies(2025)
          </h1>
          <p className="mt-3 font-light">Fintech software development is all about building specific system that are designed to meet the needs of the Fintech industry</p>
        </div>
        <div>
          <img
            src={imgTwo}
            alt="Blog"
            className="w-full h-auto rounded-lg object-cover hover:scale-105 transition-transform duration-700"
          />
          <p className="text-[#ADCDFE]/70 my-4">Software Development</p>
          <h1 className="sm:text-2xl text-xl">
            Top 20 Fintech Software Development Companies(2025)
          </h1>
          <p className="mt-3 font-light">Fintech software development is all about building specific system that are designed to meet the needs of the Fintech industry</p>
        </div>
        <div>
          <img
            src={imgThree}
            alt="Blog"
            className="w-full h-auto rounded-lg object-cover hover:scale-105 transition-transform duration-700"
          />
          <p className="text-[#ADCDFE]/70 my-4">Software Development</p>
          <h1 className="sm:text-2xl text-xl">
            Top 20 Fintech Software Development Companies(2025)
          </h1>
          <p className="mt-3 font-light">Fintech software development is all about building specific system that are designed to meet the needs of the Fintech industry</p>
        </div>
      </div>
    </div>
  );
};

export default BlogDetailFooter;
