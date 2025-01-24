
import React from "react";
import DataGrid from "./DataGrid";
import Header from "./Header";
import Column from "./Column";
import Body from "./Body";
import Row from "./Row";

const Main = () => {
  const data = [
    { id: 1, name: "Apple", age: 25 },
    { id: 2, name: "Banana", age: 30 },
    { id: 3, name: "grapes", age: 35 },
  ];

  return (
    <DataGrid data={data} defaultSort={{ field: "name", direction: "asc" }}>
      <Header>
        <Column field="name" sortable filter>
          Name
        </Column>
        <Column field="age" sortable>
          Age
        </Column>
      </Header>
      <Body>
        {(rows) =>
          rows.map((row) => (
            <Row key={row.id} row={row} />
          ))
        }
      </Body>
    </DataGrid>
  );
};

export default Main;
