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
import Accordion from 'react-bootstrap/Accordion';


function EmployeesTableView(){
    const [employeeData, setEmployeeData] = useState([]);
    const [loadingEmployeeData, setLoadingEmployeeData] = useState(true);
    const [tableData, setTableData] = useState({nodes : []})
    const [selectedEmployee, setSelectedEmployee] = useState([]);
    const [roleData, setRoleData] = useState([]);
    const [noLineManagerEmployee, setNoLineManagerEmployee] = useState([]);
    
    //Create a template employee for no line manager to show correctly on table
    let noLineManager = {
      emp_number: null,
      first_name: '',
      last_name: '',
      id: 0,
      value: 0,
      label: 'No Line Manager'
    }

      //Get Employee Data
      useEffect(() => {
        const fetchRoleData = async()=>{
          const roles = await getData("roles");
          console.log("Fetched roles", roles);
          setRoleData(roles);
        }


        fetchEmployeeData();
        fetchRoleData();
      }, [])

      const fetchEmployeeData = async()=>{
        setLoadingEmployeeData(true);
        const employees = await getData("employees");
        console.log("Fetched employees", employees)
        setEmployeeData(employees);
      }



      //UseEffect for when employeeData is altered
      useEffect(()=>{
        setLoadingEmployeeData(true);
        if (employeeData.length > 0 && Array.isArray(employeeData)){
          const mappedData = employeeData.map((employee) => ({
            ...employee,
            id: employee.emp_number, //map emp_number to id to allow for selection in the table
            value: employee.emp_number,
            label: employee.first_name + ' ' + employee.last_name,
            birthdate: employee.birthdate.split("T")[0],
        }));
        setTableData({ nodes: mappedData.concat(noLineManager) });
        setLoadingEmployeeData(false);
        }
      }, [employeeData])

    //Get the employee that is selected in the table
    const getSelectedEmployee = (employee) =>{
      if (employee.line_manager){
        setSelectedEmployee(employee);
      }else{
        console.log("selected employee without line manager", employee)
        setSelectedEmployee(employee);
      }
      
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
        
        setTableData({nodes: employees});
      }
      
      
    }
    //Get the role name from the role id
    function updateRoleName(id){
      const newRole = roleData.find((item)=> item.id == id);
      return newRole.role_name;
    }

    //Update an employee's data by sending the employee data to the backend
    const upDateData = async(data) =>{
      sendData(data, "employees", 1);
    }


    const deleteEmployee= async(emp_number, line_manager)=>{
      //Delete the employee on the database
      const response = await sendData({emp_number: emp_number, line_manager: line_manager}, "employees", 3);
      fetchEmployeeData();
      
      
      
    }
    
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
          
          
          
          
          </>
        )}
        <Accordion defaultActiveKey="0">
            <Accordion.Item eventKey='0'>
              <Accordion.Header><h3>Employee Editor</h3></Accordion.Header>
              <Accordion.Body>
              <EmployeeEditingForm selectedEmployee={selectedEmployee} onSubmit={updateEmployeeDetails} roles={roleData} employees={tableData.nodes} editing={true} onDelete={deleteEmployee}/>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        
    </div>
    );
}

export default EmployeesTableView;