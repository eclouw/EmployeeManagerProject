import {Table, Header, HeaderRow, Body, Row, HeaderCell, Cell} from '@table-library/react-table-library/table';
import {HeaderCellSelect, CellSelect, SelectClickTypes, SelectTypes, useRowSelect} from "@table-library/react-table-library/select";
import {useSort, HeaderCellSort, SortIconPositions, SortToggleType} from "@table-library/react-table-library/sort";
import { usePagination } from "@table-library/react-table-library/pagination";
import { useTheme } from '@table-library/react-table-library/theme';
import { getTheme } from '@table-library/react-table-library/baseline';
import { useEffect, useState } from 'react';
import React from 'react';

function EmployeeTable({data,  onSelection, roles}){
  const [filterTerm, setFilterTerm] = useState('');
  const [filterItem, setFilterItem] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const [dataLoading, setDataLoading] = useState(true);

  //Assign the filtered data to the data received
  useEffect(()=>{
    setFilteredData(data);
    setDataLoading(false);
  }, [])

  //If the data ever changes, reassaign the filtered data and filter the page to how it was filtered
  useEffect(()=>{
    setFilteredData(data);
    setDataLoading(false);
    filterTable();
  }, [data])


    //Table Pagination
    const LIMIT = 5;
    const pagination = usePagination(filteredData,{
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
    
    let filterTypes = [{
      filter_label: 'First Name',
      filter_value: 'first_name', 
    },
    {
      filter_label: 'Last Name',
      filter_value: 'last_name',
    },
    {
      filter_label: 'Employee Number',
      filter_value: 'emp_number',
      
    },
    {
      filter_label: 'Role',
      filter_value: 'role_name',
      
    },
    {
      filter_label: 'Line Manager',
      filter_value: 'manager_name',
      
    },
]

    


    //Filter the table when the term ic
    useEffect(()=>{
      filterTable();
    }, [filterTerm, filterItem])

    function filterTable(){
      
      setFilterItem(document.getElementById('filter_select').value)
      console.log(filterItem);
      console.log(filteredData);
      
        if (filterItem == 'first_name'){
          setFilteredData({
            nodes: data.nodes.filter((item) => item.first_name.toLowerCase().includes(filterTerm.toLowerCase()))
          })
        }else if (filterItem == 'last_name'){
          setFilteredData({
            nodes: data.nodes.filter((item) => item.last_name.toLowerCase().includes(filterTerm.toLowerCase()))
          })
        }else if (filterItem == 'emp_number'){
          setFilteredData({
            nodes: data.nodes.filter((item) => item.emp_number > 0 && item.emp_number.toString().toLowerCase().includes(filterTerm.toLowerCase()))
          })
        }else if (filterItem == 'role_name'){
          setFilteredData({
            nodes: data.nodes.filter((item) => typeof item.role_name == 'string' && item.role_name.toLowerCase().includes(filterTerm.toLowerCase()))
          })
        }else if (filterItem == 'manager_name'){
          setFilteredData({
            nodes: data.nodes.filter((item) => typeof item.manager_name == 'string' && item.manager_name.toLowerCase().includes(filterTerm.toLowerCase()))
          })
        }
      
      
    }

  return(
    <>
        <p>Filter by
          <select id='filter_select' onChange={filterTable}>
            {filterTypes.map((item)=>(
              <option value={item.filter_value}>
                {item.filter_label}
              </option>
            ))}
          </select>
        <input type='text' value={filterTerm} onChange={(e)=>setFilterTerm(e.target.value.trim())}/>
        </p>
        {dataLoading == false ?(
          <>
          <Table data={filteredData} theme={theme} select={sel} pagination={pagination} sort={sort}>
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
                  item.emp_number > 0 && (
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
                  )
                  
                  
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
        <span>Total Rows: {filteredData.nodes.length}</span>
        <span>Rows per page: {LIMIT}
        
        <button type="button" disabled={pagination.state.page === 0}
        onClick={()=>pagination.fns.onSetPage(0)}>{"|<"}</button>
        <button type="button" disabled={pagination.state.page === 0}
        onClick={()=>pagination.fns.onSetPage(pagination.state.page -1)}>{"<"}</button>
        <button type="button" disabled={pagination.state.page + 1 === Math.ceil(filteredData.nodes.length/LIMIT)}
        onClick={()=>pagination.fns.onSetPage(pagination.state.page+1)}>{">"}</button>
        <button type="button" disabled={pagination.state.page +1 === Math.ceil(filteredData.nodes.length/LIMIT)}
        onClick={()=>pagination.fns.onSetPage(Math.ceil(filteredData.nodes.length/LIMIT) - 1)}>{">|"}</button></span></div>
        </>
        ):(
          <>
          </>
        )}
        </>
          
  )
}

export default EmployeeTable;