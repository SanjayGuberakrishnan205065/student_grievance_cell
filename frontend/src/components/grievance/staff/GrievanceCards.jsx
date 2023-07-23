import axios from "axios";
import { useEffect, useState } from "react";
import StaffGrievanceCard from "./StaffGrievanceCard";
import HashLoaderWithText from "../../loaders/HashLoaderWithText";
import Filters from "../Filters";
import ReactPaginate from "react-paginate";
import Paginate from "../../Paginate";

const GrievanceCards = ({ userType }) => {
  const [filters, setFilters] = useState({
    status: "All",
    department: "All",
    type: "All",
  });
  const [loading, setLoading] = useState(true);
  const [grievances, setGrievances] = useState([]);
  const [visibleGrievances, setVisibleGrievances] = useState([]);
  const [visibleAnonymousGrievances, setVisibleAnonymousGrievances] = useState(
    []
  );
  const [anonymousGrievances, setAnonymousGrievances] = useState([]);
  const regularGrievancesApi =
    userType === "admin"
      ? "/api/admin/grievances/view"
      : "/api/grievance/staff";
  const anonymousGrievancesApi =
    userType === "admin"
      ? "/api/admin/anonymous-grievances/view"
      : "/api/grievance/staff/anonymous";

  useEffect(() => {
    axios.get(regularGrievancesApi).then((res) => {
      setVisibleGrievances(res.data.grievances);
      setGrievances(res.data.grievances);
      axios.get(anonymousGrievancesApi).then((res) => {
        setLoading(false);
        setAnonymousGrievances(res.data.grievances);
        setVisibleAnonymousGrievances(res.data.grievances);
      });
    });
  }, []);

  useEffect(() => {
    setLoading(true);
    setVisibleGrievances(
      grievances.filter((grievance) => {
        if (filters.status !== "All") {
          if (grievance.grievanceStatus.title !== filters.status) {
            return false;
          }
        }
        if (userType === "admin" && filters.department !== "All") {
          if (grievance.student.department.name !== filters.department) {
            return false;
          }
        }
        if (filters.type !== "All") {
          if (grievance.grievanceType.name !== filters.type) {
            return false;
          }
        }
        return true;
      })
    );
    setVisibleAnonymousGrievances(
      anonymousGrievances.filter((grievance) => {
        if (filters.status !== "All") {
          if (grievance.grievanceStatus.title !== filters.status) {
            return false;
          }
        }
        if (filters.type !== "All") {
          if (grievance.grievanceType.name !== filters.type) {
            return false;
          }
        }
        return true;
      })
    );
    setLoading(false);
  }, [filters]);

  // pagination
  const [itemsPerPageRegular, setItemsPerPageRegular] = useState(6);
  const [itemOffsetRegular, setItemOffsetRegular] = useState(0);
  const endOffset = itemOffsetRegular + itemsPerPageRegular;
  const currentItemsRegular = visibleGrievances.slice(
    itemOffsetRegular,
    endOffset
  );
  const pageCountRegular = Math.ceil(
    visibleGrievances.length / itemsPerPageRegular
  );
  const handlePageClickRegular = (event) => {
    const newOffset =
      (event.selected * itemsPerPageRegular) % visibleGrievances.length;
    setItemOffsetRegular(newOffset);
  };

  const [itemsPerPageAnonymous, setItemsPerPageAnonymous] = useState(6);
  const [itemOffsetAnonymous, setItemOffsetAnonymous] = useState(0);
  const endOffsetAnonymous = itemOffsetAnonymous + itemsPerPageAnonymous;
  const currentItemsAnonymous = visibleAnonymousGrievances.slice(
    itemOffsetAnonymous,
    endOffsetAnonymous
  );
  const pageCountAnonymous = Math.ceil(
    visibleAnonymousGrievances.length / itemsPerPageAnonymous
  );
  const handlePageClickAnonymous = (event) => {
    const newOffset =
      (event.selected * itemsPerPageAnonymous) %
      visibleAnonymousGrievances.length;
    setItemOffsetAnonymous(newOffset);
  };

  return (
    <div className="container mx-auto pb-5 px-3">
      <h1 className="text-4xl font-extrabold my-5">
        {userType === "staff" ? "Grievances assigned to you" : "Grievances"}
      </h1>
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
            userType={userType}
          />
          <h1 className="text-2xl mb-2">Regular Grievances</h1>
          {visibleGrievances.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                {currentItemsRegular.map((grievance) => (
                  <StaffGrievanceCard
                    grievance={grievance}
                    key={grievance._id}
                    userType={userType}
                  />
                ))}
              </div>
              <Paginate
                pageCount={pageCountRegular}
                handlePageClick={handlePageClickRegular}
                itemsPerPage={itemsPerPageRegular}
                setItemsPerPage={setItemsPerPageRegular}
              />
            </>
          ) : (
            <div className="flex justify-center items-center">
              <h1 className="text-2xl">No grievances found</h1>
            </div>
          )}
          <h1 className="text-2xl mt-5 mb-2">Anonymous Grievances</h1>
          {visibleAnonymousGrievances.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                {currentItemsAnonymous.map((grievance) => (
                  <StaffGrievanceCard
                    grievance={grievance}
                    key={grievance._id}
                    userType={userType}
                    isAnonymousGrievance={true}
                  />
                ))}
              </div>
              <Paginate
                pageCount={pageCountAnonymous}
                handlePageClick={handlePageClickAnonymous}
                itemsPerPage={itemsPerPageAnonymous}
                setItemsPerPage={setItemsPerPageAnonymous}
              />
            </>
          ) : (
            <div className="flex justify-center items-center">
              <h1 className="text-2xl">No grievances found</h1>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
export default GrievanceCards;
