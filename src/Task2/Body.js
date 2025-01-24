import React, { useContext } from 'react'
import { DataGridContext } from './Datagrid'
  
const Body = ({children}) => {

      const {data}=useContext(DataGridContext)
  return (
    <div className='data-grid-body'> {children(data)}</div>
  )
}

export default Body