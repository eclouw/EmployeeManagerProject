import {Table, Header, HeaderRow, Body, Row, HeaderCell, Cell} from '@table-library/react-table-library/table';
import {HeaderCellSelect, CellSelect, SelectClickTypes, SelectTypes, useRowSelect} from "@table-library/react-table-library/select";
import {useSort, HeaderCellSort, SortIconPositions, SortToggleType} from "@table-library/react-table-library/sort";
import { usePagination } from "@table-library/react-table-library/pagination";
import { useTheme } from '@table-library/react-table-library/theme';
import { getTheme } from '@table-library/react-table-library/baseline';
import React from 'react';

function EmployeeTable({data,  onSelection, roles}){
    const[sortedData, setSortedData] = React.useState(data);


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

  //When an item in the table is selected
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

  //enable selection from the table
  const sel = useRowSelect(data, {
    onChange: onselectionchange,
    selectAllRows: false,
  })

  function sortByEmployeeNumber(reversed){
    const sorted = [...data.nodes].sort((a,b) => a.emp_number - b.emp_number);
    setSortedData({nodes: sorted});
    console.log(sortedData);
  }

  //enable sorting for the table
  function onSortChange(action, state){
    console.log(action, state);
    if (state.sortKey == 'emp_number'){
        sortByEmployeeNumber(state.reverse);
    }
  }
  const sort = useSort(data, {
    state:{
        sortKey: "emp_number",
        reverse:false,
    },
    onChange: onSortChange,
  },
    {
        sortFns:{
            EMP_NUMBER: (array) => array.sort((a, b) => (a.nodes || []).length - (b.nodes || []).length),
        }
    })


  return(
    <>
          <Table data={sortedData} theme={theme} select={sel} pagination={pagination} sort={sort}>
            {
              (tableList)=>(
                <>
                <Header>
                  <HeaderRow>
                  <HeaderCellSort sortKey="emp_number">
                      Employee Number
                    </HeaderCellSort>
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