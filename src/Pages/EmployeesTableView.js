import {Table, Header, HeaderRow, Body, Row, HeaderCell, Cell} from '@table-library/react-table-library/table';
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
          console.log("employee data is: " + employeeData.length)
          setTableData({nodes: employeeData})
          setLoadingEmployeeData(false);
        }
      }, [employeeData])

      useEffect(()=>{
        console.log("tabledata",tableData)
      }, [tableData])

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

    return (
    <div className='EmployeesTable'>
        {loadingEmployeeData && tableData.length===0 ?(
          <p>loading</p>
        ):(
          <>
          <Table data={tableData} theme={theme}>
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
                    <Row key={item.emp_number} item={item}>
                      <Cell>{item.emp_number}</Cell>
                      <Cell>{item.first_name}</Cell>
                      <Cell>{item.last_name}</Cell>
                      <Cell>{item.emp_role}</Cell>
                      <Cell>{item.line_manager}</Cell>
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
          </>
        )}
    </div>
    );
}

export default EmployeesTableView;