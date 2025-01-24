import React, { useContext } from "react";
import { DataGridContext } from "./Datagrid";

const Column = ( {field,sortable,filter,children} ) => {
  const { setSortConfig, sortConfig, setFilteredData, data } =
    useContext(DataGridContext);
  const handleSort = () => {
    setSortConfig((prev) => ({
      field,
      direction:
        prev.field === field && prev.diection === "asc" ? "desc" : "asc",
    }));
  };

  const handleFilter = (e) => {
    const value = e.target.value;

    setFilteredData(
      data.filter((row) => {
        return String(row[field]).toLowerCase().includes(value.toLowerCase());
      })
    );
  };
  return (
    <div>
      <div onClick={sortable ? handleSort : undefined}>
        {children}
        {sortable &&
          (sortConfig.field === field
            ? sortConfig.direction === "asc"
              ? "up"
              : "down"
            : "")}
      </div>
      {filter && (
        <input type="text" placeholder="" onChange={handleFilter}></input>
      )}
    </div>
  );
};

export default Column;
