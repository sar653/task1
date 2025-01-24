import React, { useState, useMemo, createContext } from "react";


export const DataGridContext = createContext();

const DataGrid = ({ data, defaultSort, children }) => {
  const [sortConfig, setSortConfig] = useState(defaultSort || {});
  const [selectedRows, setSelectedRows] = useState(new Set());
  const [filteredData, setFilteredData] = useState(data);

  const sortedData = useMemo(() => {
    if (!sortConfig.field) return filteredData;
    const sorted = [...filteredData].sort((a, b) => {
      const dir = sortConfig.direction === "asc" ? 1 : -1;
      return a[sortConfig.field] > b[sortConfig.field] ? dir : -dir;
    });
    return sorted;
  }, [filteredData, sortConfig]);

  return (
    <DataGridContext.Provider
      value={{
        data: sortedData,
        sortConfig,
        setSortConfig,
        selectedRows,
        setSelectedRows,
        setFilteredData,
      }}
    >
      <div className="data-grid">{children}</div>
    </DataGridContext.Provider>
  );
};

export default DataGrid;
