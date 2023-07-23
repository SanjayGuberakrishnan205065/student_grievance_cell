import ReactPaginate from "react-paginate";
import { useEffect, useState } from "react";

const Paginate = ({
  handlePageClick,
  pageCount,
  itemsPerPage,
  setItemsPerPage,
}) => {
  const [itemsPerPageValues, setItemsPerPageValues] = useState(
    new Set([itemsPerPage, 5, 6, 10, 20, 30])
  );
  useEffect(() => {
    setItemsPerPageValues(new Set([parseInt(itemsPerPage), 5, 6, 10, 20, 30]));
  }, [itemsPerPage]);
  return (
    <div className="my-3">
      <div className="text-center">
        <label className="m-2 text-sm font-medium text-gray-900 dark:text-white">
          Items Per page
        </label>
        <select
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          onChange={(e) => setItemsPerPage(e.target.value)}
          value={itemsPerPage}
        >
          {Array.from(itemsPerPageValues)
            .sort((a, b) => a - b)
            .map((value) => (
              <option value={value} key={value}>
                {value}
              </option>
            ))}
        </select>
      </div>
      <ReactPaginate
        breakLabel="..."
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        previousLabel="< previous"
        renderOnZeroPageCount={null}
        pageClassName="inline-block p-3"
        previousClassName="inline-block p-3"
        nextClassName="inline-block p-3"
        className="text-center my-3"
        activeClassName="bg-blue-500 text-white rounded"
        disabledClassName="text-gray-400"
      />
    </div>
  );
};
export default Paginate;
