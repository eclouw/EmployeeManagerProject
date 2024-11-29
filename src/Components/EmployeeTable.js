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


  //enable sorting for the table
  function onSortChange(action, state){
    console.log(action, state);
    // if (state.sortKey == 'emp_number'){
    //     //const sorted = [...data.nodes].sort((a,b) => a.emp_number - b.emp_number);
    //     //setSortedData({nodes: sorted});
    // }else if (state.sortKey == 'first_name'){
    //     const sorted = [...data.nodes].sort((a,b) => a.first_name.localeCompare(b.first_name));
    //     setSortedData({nodes: sorted});
    // }else if (state.sortKey == 'last_name'){
    //     const sorted = [...data.nodes].sort((a,b) => a.last_name.localeCompare(b.last_name));
    //     setSortedData({nodes: sorted});
    // }else if (state.sortKey == 'role_name'){
    //     const sorted = [...data.nodes].sort((a,b) => a.role_name.localeCompare(b.role_name));
    //     setSortedData({nodes: sorted});
    // }else if (state.sortKey == 'manager_name'){
    //     const sorted = [...data.nodes].sort((a,b) => a.manager_name.localeCompare(b.manager_name));
    //     setSortedData({nodes: sorted});
    // }else if (state.sortKey == 'salary'){
    //     const sorted = [...data.nodes].sort((a,b) => a.salary - b.salary);
    //     setSortedData({nodes: sorted});
    // }else if (state.sortKey == 'email'){
    //     const sorted = [...data.nodes].sort((a,b) => a.email.localeCompare(b.email));
    //     setSortedData({nodes: sorted});
    // }
    //TODO: IMPLEMENT SORTING FOR THE BIRTHDATE
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
            emp_number: (array) => array.sort((a,b) => a.emp_number - b.emp_number),
            first_name: (array) => array.sort((a,b) => a.first_name.localeCompare(b.first_name)),
            last_name: (array) => array.sort((a,b) => a.last_name.localeCompare(b.last_name)),
            role_name: (array) => array.sort((a,b) => a.role_name.localeCompare(b.role_name)),
            manager_name: (array) => array.sort((a,b) => a.manager_name.localeCompare(b.manager_name)),
            salary: (array) => array.sort((a,b) => a.salary - b.salary),
            email: (array) => array.sort((a,b) => a.email.localeCompare(b.email)),
            birthdate:(array) => array.sort((a,b) => a.birthdate.localeCompare(b.birthdate))
        }
    })


  return(
    <>
          <Table data={data} theme={theme} select={sel} pagination={pagination} sort={sort}>
            {
              (tableList)=>(
                <>
                <Header>
                  <HeaderRow>
                  <HeaderCellSort sortKey="emp_number">
                      Employee Number
                    </HeaderCellSort>
                    <HeaderCellSort sortKey='first_name'>
                      First Name
                    </HeaderCellSort>
                    <HeaderCellSort sortKey='last_name'>
                      Last Name
                    </HeaderCellSort>
                    <HeaderCellSort sortKey="role_name">
                      Role
                    </HeaderCellSort>
                    <HeaderCellSort sortKey='manager_name'>
                      Line Manager
                    </HeaderCellSort>
                    <HeaderCellSort sortKey='salary'>
                      Salary
                    </HeaderCellSort>
                    <HeaderCellSort sortKey='email'>
                      Email
                    </HeaderCellSort>
                    <HeaderCellSort sortKey="birthdate">
                      Birth Date
                    </HeaderCellSort>
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