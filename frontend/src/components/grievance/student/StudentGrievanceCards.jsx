import axios from "axios";
import { useEffect, useState } from "react";
import HashLoaderWithText from "../../loaders/HashLoaderWithText";
import StudentGrievanceCard from "./StudentGrievanceCard";
import Filters from "../Filters";
import Paginate from "../../Paginate";

const StudentGrievanceCards = () => {
  const [filters, setFilters] = useState({
    status: "All",
    type: "All",
  });
  const [loading, setLoading] = useState(true);
  const [visibleGrievances, setVisibleGrievances] = useState([]);
  const [grievances, setGrievances] = useState([]);
  useEffect(() => {
    axios.get("/api/grievance/student").then((res) => {
      setGrievances(res.data.grievances);
      setVisibleGrievances(res.data.grievances);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    setLoading(true);
    setVisibleGrievances(
      grievances.filter((grievance) => {
        if (
          filters.status !== "All" &&
          grievance.grievanceStatus.title !== filters.status
        ) {
          return false;
        }
        if (
          filters.type !== "All" &&
          grievance.grievanceType.name !== filters.type
        ) {
          return false;
        }
        return true;
      })
    );
    setLoading(false);
  }, [filters]);

  // pagination
  const [itemsPerPage, setItemsPerPage] = useState(6);
  const [itemOffset, setItemOffset] = useState(0);
  const endOffset = itemOffset + itemsPerPage;
  const currentItems = visibleGrievances.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(visibleGrievances.length / itemsPerPage);
  const handlePageClick = (event) => {
    const newOffset =
      (event.selected * itemsPerPage) % visibleGrievances.length;
    setItemOffset(newOffset);
  };

  return (
    <div className="container mx-auto pb-5 px-3">
      <h1 className="text-4xl font-extrabold my-5">Grievances Raised by you</h1>
      {loading ? (
        <div className="flex mt-10 pt-10 justify-center">
          <div>
            <HashLoaderWithText
              text="Loading  grievances..."
              textclassName="text-xl m-3"
              size={65}
            />
          </div>
        </div>
      ) : (
        <div>
          <Filters
            filters={filters}
            setFilters={setFilters}
            userType="student"
          />
          {visibleGrievances.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                {currentItems.map((grievance) => (
                  <StudentGrievanceCard
                    key={grievance._id}
                    grievance={grievance}
                  />
                ))}
              </div>
              <Paginate
                handlePageClick={handlePageClick}
                pageCount={pageCount}
                currentItems={currentItems}
                itemsPerPage={itemsPerPage}
                setItemsPerPage={setItemsPerPage}
              />
            </>
          ) : (
            <div className="flex mt-10 pt-10 justify-center">
              <h1 className="text-2xl font-bold">No grievances found</h1>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
export default StudentGrievanceCards;
