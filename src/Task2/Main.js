import React, { useState, useEffect, useContext } from "react";
import Row from "./Row";
import Column from "./Column";
import Datagrid from "./Datagrid";
import Header from "./Header";
import Body from "./Body";
 

const Main = () => {
  const data = [
    {
      id: 1,
      name: "Apple",
      age: 25,
    },
    {
      id: 2,
      name: "banana",
      age: 25,
    },
    {
      id: 3,
      name: "grapes",
      age: 25,
    },
  ];

  return (
    <Datagrid data={data} defaultSort={{ field: "name", direction: "asc" }}>
      <Header>
        <Column field="name" sortable filter>
          Name
        </Column>
        <Column field="age" sortable filter>
          Age
        </Column>
      </Header>
      <Body>{(rows) => rows.map((row) => <Row key={row.id} row={row} />)}</Body>
    </Datagrid>
  );
};

export default Main;
