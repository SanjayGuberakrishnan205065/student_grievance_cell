const Filters = ({ filters, setFilters, userType }) => {
  const grievanceStatuses = [
    "All",
    "Assigned",
    "In Progress",
    "Resolved",
    "Closed",
    "Reopened",
  ];
  const departments = [
    "All",
    "Information Technology",
    "Aerospace Engineering",
    "Automobile Engineering",
    "Electronics Engineering",
    "Instrumentation Engineering",
    "Production Technology",
    "Rubber and Plastics Technology",
    "Computer Technology",
  ];
  const grievanceTypes = [
    "All",
    "Academic",
    "Administration",
    "Library",
    "Infrastructure",
    "Personal / Others",
  ];
  return (
    <div className="border-b p-3 border-gray-400 m-3">
      <h1 className="text-xl">Filters</h1>
      <div>
        <div className="flex gap-5 flex-wrap">
          <div>
            <label className="mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Grievance Status:
            </label>
            <select
              className="bg-gray-50 w-32 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-1 ms-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              value={filters.status}
              onChange={(e) => {
                setFilters({ ...filters, status: e.target.value });
              }}
            >
              {grievanceStatuses.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </div>
          {userType === "admin" && (
            <div>
              <label className="mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Department:
              </label>
              <select
                className="bg-gray-50 w-48 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-1 ms-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                value={filters.department}
                onChange={(e) => {
                  setFilters({ ...filters, department: e.target.value });
                }}
              >
                {departments.map((department) => (
                  <option key={department} value={department}>
                    {department}
                  </option>
                ))}
              </select>
            </div>
          )}
          <div>
            <label className="mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Grievance Type:
            </label>
            <select
              className="bg-gray-50 w-48 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-1 ms-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              value={filters.type}
              onChange={(e) => {
                setFilters({ ...filters, type: e.target.value });
              }}
            >
              {grievanceTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Filters;
