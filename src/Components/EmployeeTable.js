import {Table, Header, HeaderRow, Body, Row, HeaderCell, Cell} from '@table-library/react-table-library/table';
import {HeaderCellSelect, CellSelect, SelectClickTypes, SelectTypes, useRowSelect} from "@table-library/react-table-library/select";
import { usePagination } from "@table-library/react-table-library/pagination";
import { useTheme } from '@table-library/react-table-library/theme';
import { getTheme } from '@table-library/react-table-library/baseline';
import { useState } from 'react';

function EmployeeTable({data,  onSelection, roles}){
    data = data;


    //Table Pagination
    const LIMIT = 5;
    console.log("data", data);
    const pagination = usePagination(data,{
      state:{
        page: 0,
        size: LIMIT,
      },
      onChange: onPaginationChange,
    },
    {
      isServer: false,
    }
  )

  function onPaginationChange(action, state){
    new DocumentFragment({
      offset: state.page * LIMIT,
      limit: LIMIT
    });
  }

  //table theme
  const theme = useTheme(getTheme());

  function onselectionchange(action, state){
    console.log("Action:", action);
    console.log("Selection State:", state);
    findSelectedEmployee(state.id)
    
    
  }

  

  function findSelectedEmployee(id){
    const employee = data.nodes.find((item)=>item.emp_number === id)
    if (onSelection){
        onSelection(employee);
        
    }
    
    
  }

  const sel = useRowSelect(data, {
    onChange: onselectionchange,
    selectAllRows: false,
  })


  return(
    <>
          <Table data={data} theme={theme} select={sel} pagination={pagination}>
            {
              (tableList)=>(
                <>
                <Header>
                  <HeaderRow>
                  <HeaderCell>
                      Employee Number
                    </HeaderCell>
                    <HeaderCell>
                      First Name
                    </HeaderCell>
                    <HeaderCell>
                      Last Name
                    </HeaderCell>
                    <HeaderCell>
                      Role
                    </HeaderCell>
                    <HeaderCell>
                      Line Manager
                    </HeaderCell>
                    <HeaderCell>
                      Salary
                    </HeaderCell>
                    <HeaderCell>
                      Email
                    </HeaderCell>
                    <HeaderCell>
                      Birth Date
                    </HeaderCell>
                  </HeaderRow>
                </Header>
                <Body>
                  {tableList.map((item)=>(
                    <Row key={item.emp_number} item={item} id={item.emp_number}>
                      <Cell>{item.emp_number}</Cell>
                      <Cell>{item.first_name}</Cell>
                      <Cell>{item.last_name}</Cell>
                      <Cell>{item.role_name}</Cell>
                      <Cell>{item.manager_name}</Cell>
                      <Cell>{item.salary}</Cell>
                      <Cell>{item.email}</Cell>
                      <Cell>
                        {item.birthdate}
                      </Cell>
                    </Row>
                    
                  ))}
                </Body>
                </>
              )
            }
          </Table>
          <div style={{
              display:"flex",
              justifyContent:"space-between",
            }}
            >
          <span>Total Rows: {data.nodes.length}</span>
          <span>Rows per page: {LIMIT}
          
          <button type="button" disabled={pagination.state.page === 0}
          onClick={()=>pagination.fns.onSetPage(0)}>{"|<"}</button>
          <button type="button" disabled={pagination.state.page === 0}
          onClick={()=>pagination.fns.onSetPage(pagination.state.page -1)}>{"<"}</button>
          <button type="button" disabled={pagination.state.page + 1 === Math.ceil(data.nodes.length/LIMIT)}
          onClick={()=>pagination.fns.onSetPage(pagination.state.page+1)}>{">"}</button>
          <button type="button" disabled={pagination.state.page +1 === Math.ceil(data.nodes.length/LIMIT)}
          onClick={()=>pagination.fns.onSetPage(Math.ceil(data.nodes.length/LIMIT) - 1)}>{">|"}</button></span></div>
          </>
  )
}

export default EmployeeTable;