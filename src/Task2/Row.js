import React, { useContext } from "react";
import { DataGridContext } from "./Datagrid";
const Row = (  {row}) => {
  const { selectedrows, setSelectedRows } = useContext(DataGridContext);

  const toggleRowSelection = () => {
    const newSelection = new Set(selectedrows);
    if(newSelection.has(row)) newSelection.delete(row)
        else newSelection.add(row)
    setSelectedRows(newSelection)
  };

  
  
  
  
  const isSelected=selectedrows.has(row)
  
  
  
  
  
  
  
  
  
  return (
    <div
     className={`data-grid-row  ${isSelected?" selected":""}`}
    onClick={toggleRowSelection}>
      {Object.keys(row).map((key) => {
        <div> {row[key]}</div>;
      })}
    </div>
  );
};

export default Row;
