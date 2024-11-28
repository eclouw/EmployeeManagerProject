import {Table, Header, HeaderRow, Body, Row, HeaderCell, Cell} from '@table-library/react-table-library/table';
import {HeaderCellSelect, CellSelect, SelectClickTypes, SelectTypes, useRowSelect} from "@table-library/react-table-library/select";
import { usePagination } from "@table-library/react-table-library/pagination";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Spinner from 'react-bootstrap/Spinner';
import Container from 'react-bootstrap/Container';
import {default as Brow} from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useTheme } from '@table-library/react-table-library/theme';
import { getTheme } from '@table-library/react-table-library/baseline';
import getData from '../Components/getData';
import axios from "axios";
import { useState } from 'react';
import { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import EmployeesTable from '../Components/EmployeeTable';


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



    const getSelectedEmployee = (employee) =>{
      console.log("selected",employee);
      console.log("fires");
      setSelectedEmployee(employee);
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

      sendData(employee)
      console.log(employee);
      
      setTableData({nodes: employees});
    }

    //TEMP FUNCTION TO TEST IF SENDING TO BACKEND WORKS
    const sendData = async(data) =>{
      try{
        const response = await axios.post('http://localhost:5000/api/employee/edit/submit', data);
        console.log(response.data);
      }catch (error){
        console.log('error sending data', error);
      }
    }

    const data = tableData;
    

    

    return (
    <div className='EmployeesTable'>
        {loadingEmployeeData || tableData.nodes.length===0 ?(
          <Spinner animation='border'/>
        ):(
          <>
          <EmployeesTable data = {tableData} onSelection={getSelectedEmployee}/>
          

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
        <div>
          
        </div>
          </>
        )}
        
    </div>
    );
}

export default EmployeesTableView;