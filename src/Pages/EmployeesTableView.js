import {Table, Header, HeaderRow, Body, Row, HeaderCell, Cell} from '@table-library/react-table-library/table';
import {HeaderCellSelect, CellSelect, SelectClickTypes, SelectTypes, useRowSelect} from "@table-library/react-table-library/select";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Spinner from 'react-bootstrap/Spinner';
import Container from 'react-bootstrap/Container';
import {default as Brow} from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useTheme } from '@table-library/react-table-library/theme';
import { getTheme } from '@table-library/react-table-library/baseline';
import getData from '../Components/getData';
import axios from "react-axios";
import { useState } from 'react';
import { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';


function EmployeesTableView(){
    const [employeeData, setEmployeeData] = useState([]);
    const [loadingEmployeeData, setLoadingEmployeeData] = useState(true);
    const [tableData, setTableData] = useState({nodes : []})
    const [selectedEmployee, setSelectedEmployee] = useState([]);

    //States for the currently selected employee details
    const [inputEmployeeFirstName, setInputEmployeeFirstName] = useState('');
    
      
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

    function updateEmployeeDetails(){
      const index = tableData.nodes.findIndex((item)=> item.id === selectedEmployee.id);
      
      let employees = [...tableData.nodes];
      
      let employee = {...employees[index]}
      
      //update the details in the data to what the user has inputed
      employee.first_name = document.getElementById('input_first_name').value;
      employee.last_name = document.getElementById('input_last_name').value;
      employee.email = document.getElementById('input_email').value;
      employees[index] = employee;
      
      setTableData({nodes: employees});
    }

    const data = tableData;

    const sel = useRowSelect(data, {
      onChange: onselectionchange,
      selectAllRows: false,
    }, [tableData, loadingEmployeeData])

    

    return (
    <div className='EmployeesTable'>
        {loadingEmployeeData || tableData.nodes.length===0 ?(
          <Spinner animation='border'/>
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
          <p>Currently Selected Employee with ID:{selectedEmployee.emp_number}</p>
          <div>
          <Container>
            <Brow>
              <Col>
                <p>First Name 
                <input type="text" defaultValue={selectedEmployee.first_name} id="input_first_name"/>
                </p>
              </Col>
              <Col>
                <p>Last Name 
                <input type="text" defaultValue={selectedEmployee.last_name} id="input_last_name"/>
                </p>
              </Col>
              <Col>
                <p>Email 
                <input type="text" defaultValue={selectedEmployee.email} id="input_email"/>
                </p>
              </Col>
            </Brow>
            <Brow>
              <Col>
                <p>Role
                <input type="text" defaultValue={selectedEmployee.role_name}/>
                </p>
              </Col>
              <Col>
                <p>Salary
                <input type="text" defaultValue={selectedEmployee.salary}/>
                </p>
              </Col>
              <Col>
                <p>Birth Date
                <input type="text" defaultValue={selectedEmployee.birthdate}/>
                </p>
              </Col>
            </Brow>
            <Brow>
            <Col>
            <p>
              Line Manager
              <input type="text" defaultValue={selectedEmployee.manager_name}/>
            </p>
            </Col>
            <Col>
            Select Line Manager
            </Col>
            </Brow>
            <Brow>
            <button onClick={updateEmployeeDetails}>Submit Changes</button>
            </Brow>
          </Container>
        </div>
          </>
        )}
        
    </div>
    );
}

export default EmployeesTableView;