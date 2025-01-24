import React, { useContext } from "react";
import { DataGridContext } from "./DataGrid";

const Column = ({ field, sortable, filter, children }) => {
  const { setSortConfig, sortConfig, setFilteredData, data } = useContext(DataGridContext);

  const handleSort = () => {
    setSortConfig((prev) => ({
      field,
      direction: prev.field === field && prev.direction === "asc" ? "desc" : "asc",
    }));
  };

  const handleFilter = (event) => {
    const value = event.target.value;
    setFilteredData(
      data.filter((row) =>
        String(row[field]).toLowerCase().includes(value.toLowerCase())
      )
    );
  };

  return (
    <div className="data-grid-column">
      <div onClick={sortable ? handleSort : undefined}>
        {children} {sortable && (sortConfig.field === field ? (sortConfig.direction === "asc" ? "↑" : "↓") : "")}
      </div>
      {filter && (
        <input
          type="text"
          placeholder={`Filter ${field}`}
          onChange={handleFilter}
        />
      )}
    </div>
  );
};

export default Column;
