import React, { useContext } from "react";
import { DataGridContext } from "./DataGrid";

const Row = ({ row }) => {
  const { selectedRows, setSelectedRows } = useContext(DataGridContext);

  const toggleRowSelection = () => {
    const newSelection = new Set(selectedRows);
    if (newSelection.has(row)) newSelection.delete(row);
    else newSelection.add(row);
    setSelectedRows(newSelection);
  };

  const isSelected = selectedRows.has(row);

  return (
    <div
      className={`data-grid-row ${isSelected ? "selected" : ""}`}
      onClick={toggleRowSelection}
    >
      {Object.keys(row).map((key) => (
        <div key={key} >
          {row[key]}
        </div>
      ))}
    </div>
  );
};

export default Row;
