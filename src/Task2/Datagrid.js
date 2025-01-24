import React, { Children, createContext, useMemo, useState } from "react";
export const DataGridContext = createContext();

const Datagrid = ( {  data,defaultSort,children}) => {
  const [sortConfig, setSortConfig] = useState(  defaultSort||{});
  const [selectedrows, setselectedrows] = useState(new Set());
  const [filteredData, setfilteredData] = useState(data);

  const sortedData = useMemo(() => {
    if (sortConfig.field) return filteredData;
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
        selectedrows,
        setselectedrows,
        setfilteredData,
      }}
    >
      <div> {children}</div>
    </DataGridContext.Provider>
  );
};

export default Datagrid;
