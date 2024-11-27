import {Table, Header, HeaderRow, Body, Row, HeaderCell, Cell} from '@table-library/react-table-library/table';
import {HeaderCellSelect, CellSelect, SelectClickTypes, SelectTypes, useRowSelect} from "@table-library/react-table-library/select";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useTheme } from '@table-library/react-table-library/theme';
import { getTheme } from '@table-library/react-table-library/baseline';
import getData from '../Components/getData';
import axios from "react-axios";
import { useState } from 'react';
import { useEffect } from 'react';

function EmployeesTableView(){
    const [employeeData, setEmployeeData] = useState([]);
    const [loadingEmployeeData, setLoadingEmployeeData] = useState(true);
    const [tableData, setTableData] = useState({nodes : []})
    const [selectedEmployee, setSelectedEmployee] = useState([]);
    
      
      //Get Employee Data
      useEffect(() => {
        const fetchEmployeeData = async()=>{
          const employees = await getData("employees");
          console.log("Fetched employees", employees)
          setEmployeeData(employees);
        }

        fetchEmployeeData();
      }, [])

      //UseEffect for when employeeData is altered
      useEffect(()=>{
        if (employeeData.length > 0 && Array.isArray(employeeData)){
          const mappedData = employeeData.map((employee) => ({
            ...employee,
            id: employee.emp_number, //map emp_number to id to allow for selection in the table
        }));
        setTableData({ nodes: mappedData });
        setLoadingEmployeeData(false);
        }
      }, [employeeData])



      //Create a table based on employee data
      const COLUMNS=[
       {
        label:'FirstName',
        renderCell:(item)=>item.first_name
       },
       {
        label:'LastName',
        renderCell:(item)=>item.last_name
       },

      ]

      
    //table theme
    const theme = useTheme(getTheme());

    function onselectionchange(action, state){
      console.log("Action:", action);
      console.log("Selection State:", state);
      console.log(tableData)
      findSelectedEmployee(state.id)
      
    }

    function findSelectedEmployee(id){
      setSelectedEmployee(
        tableData.nodes.find((item)=>item.emp_number === id)
      )
    }


    

    const data = tableData;

    const sel = useRowSelect(data, {
      onChange: onselectionchange,
      selectAllRows: false,
    }, [tableData, loadingEmployeeData])

    

    return (
    <div className='EmployeesTable'>
        {loadingEmployeeData || tableData.nodes.length===0 ?(
          <p>loading</p>
        ):(
          <>
          <Table data={data} theme={theme} select={sel}>
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
          <p>{selectedEmployee.first_name}</p>
          </>
        )}
        <div>
        
        </div>
    </div>
    );
}

export default EmployeesTableView;