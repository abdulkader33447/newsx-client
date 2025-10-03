const Pagination = ({ page, totalPages, setPage }) => {
  const pageNumbers = [];

  let startPage = Math.max(1, page - 2);
  let endPage = Math.min(totalPages, page + 2);

  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="flex justify-center items-center sm:gap-15 gap-8 mt-8 pb-8">
      <button
        className="cursor-pointer hover:bg-gray-100 px-4 py-2 border rounded-xl bg-white text-black disabled:opacity-50"
        disabled={page === 1}
        onClick={() => setPage(page - 1)}
      >
        Prev
      </button>

      {startPage > 1 && (
        <>
          <button
            className={`px-4 py-2 border rounded ${
              page === 1 ? "bg-blue-500 text-white" : ""
            }`}
            onClick={() => setPage(1)}
          >
            1
          </button>
          {startPage > 2 && <span className="px-2">...</span>}
        </>
      )}

      {pageNumbers.map((num) => (
        <button
          key={num}
          className={` ${
            page === num ? "text-white" : "text-[#503AF2]"
          }`}
          onClick={() => setPage(num)}
        >
          {num}
        </button>
      ))}

      {endPage < totalPages && (
        <>
          {endPage < totalPages - 1 && <span className="px-2">...</span>}
          <button
            className={`px-4 py-2 border rounded ${
              page === totalPages ? "bg-blue-500 text-white" : "text-blue-500"
            }`}
            onClick={() => setPage(totalPages)}
          >
            {totalPages}
          </button>
        </>
      )}

      <button
        className="cursor-pointer hover:bg-gray-100 px-4 py-2 border rounded-xl bg-white text-black disabled:opacity-50"
        disabled={page === totalPages}
        onClick={() => setPage(page + 1)}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
