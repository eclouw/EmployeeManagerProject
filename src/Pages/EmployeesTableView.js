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
import employeeValidation from '../Components/Rules/employeeValidation';


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
            value: employee.emp_number,
            label: employee.first_name + ' ' + employee.last_name,
            birthdate: employee.birthdate.split("T")[0],
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
    function updateEmployeeDetails(first_name, last_name, email, newLineManager, salary, role, birthdate){
      const index = tableData.nodes.findIndex((item)=> item.id === selectedEmployee.id);
      
      let employees = [...tableData.nodes];
      
      let employee = {...employees[index]}

      //Ensure that the employee details are valid
      if (employeeValidation(first_name, last_name, email, salary, true)){
        //update the details in the data to what the user has inputed
        employee.first_name = first_name;
        employee.last_name = last_name;
        employee.email = email;
        employee.emp_role = role;
        employee.role_name = updateRoleName(role);

        //update the line manager details
        employee.line_manager = newLineManager.emp_number;
        employee.manager_name = newLineManager.first_name + ' ' + newLineManager.last_name;

        employee.salary = salary;
        employee.birthdate = birthdate;
        employees[index] = employee;
        

        upDateData(employee)
        console.log(employee);
        
        setTableData({nodes: employees});
      }
      
      
    }

    function updateRoleName(id){
      const newRole = roleData.find((item)=> item.id == id);
      return newRole.role_name;
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
            <EmployeeEditingForm selectedEmployee={selectedEmployee} onSubmit={updateEmployeeDetails} roles={roleData} employees={tableData.nodes}/>
            </Card.Body>
          </Card>
          
          
          </>
        )}
        
    </div>
    );
}

export default EmployeesTableView;