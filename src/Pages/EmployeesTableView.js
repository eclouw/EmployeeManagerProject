import Spinner from 'react-bootstrap/Spinner';
import getData from '../Components/getData';
import axios from "axios";
import { useState } from 'react';
import { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import EmployeesTable from '../Components/EmployeeTable';
import EmployeeEditingForm from '../Components/EmployeeEditingForm';
import Card from 'react-bootstrap/Card';
import sendData from '../Components/sendData';


function EmployeesTableView(){
    const [employeeData, setEmployeeData] = useState([]);
    const [loadingEmployeeData, setLoadingEmployeeData] = useState(true);
    const [tableData, setTableData] = useState({nodes : []})
    const [selectedEmployee, setSelectedEmployee] = useState([]);
    const [roleData, setRoleData] = useState([]);


      //Get Employee Data
      useEffect(() => {
        const fetchEmployeeData = async()=>{
          const employees = await getData("employees");
          console.log("Fetched employees", employees)
          setEmployeeData(employees);
        }

        const fetchRoleData = async()=>{
          const roles = await getData("roles");
          console.log("Fetched roles", roles);
          setRoleData(roles);
        }

        fetchEmployeeData();
        fetchRoleData();
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


    //Get the employee that is selected in the table
    const getSelectedEmployee = (employee) =>{
      setSelectedEmployee(employee);
    }

    //Update employee details
    function updateEmployeeDetails(){
      const index = tableData.nodes.findIndex((item)=> item.id === selectedEmployee.id);
      
      let employees = [...tableData.nodes];
      
      let employee = {...employees[index]}
      
      //update the details in the data to what the user has inputed
      employee.first_name = document.getElementById('input_first_name').value;
      employee.last_name = document.getElementById('input_last_name').value;
      employee.email = document.getElementById('input_email').value;
      //BELOW STILL NEED TO BE IMPLEMENTED FOR UPDATING ON THE BACKEND
      employee.role = document.getElementById('input_role').value;

      employees[index] = employee;

      upDateData(employee)
      console.log(employee);
      
      setTableData({nodes: employees});
    }

    //TEMP FUNCTION TO TEST IF SENDING TO BACKEND WORKS
    const upDateData = async(data) =>{
      sendData(data, "employees");
    }

    const data = tableData;
    

    

    return (
    <div className='EmployeesTable'>
        {loadingEmployeeData || tableData.nodes.length===0 ?(
          <Spinner animation='border'/>
        ):(
          <>
          <Card>
            <Card.Body>
              <Card.Title>Employees</Card.Title>
            <EmployeesTable data = {tableData} onSelection={getSelectedEmployee}/>
            </Card.Body>
          </Card>
          <Card>
            <Card.Body>
            <Card.Title>Employee Editor</Card.Title>
            <Card.Subtitle>Currently Selected Employee with ID:{selectedEmployee.emp_number}</Card.Subtitle>
            <EmployeeEditingForm selectedEmployee={selectedEmployee} onSubmit={updateEmployeeDetails} roles={roleData}/>
            </Card.Body>
          </Card>
          
          
          </>
        )}
        
    </div>
    );
}

export default EmployeesTableView;