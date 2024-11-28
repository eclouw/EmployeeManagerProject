import Spinner from 'react-bootstrap/Spinner';
import getData from '../Components/getData';
import axios from "axios";
import { useState } from 'react';
import { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import EmployeesTable from '../Components/EmployeeTable';
import EmployeeEditingForm from '../Components/EmployeeEditingForm';


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
          <EmployeeEditingForm selectedEmployee={selectedEmployee} onSubmit={updateEmployeeDetails}/>

          <p>Currently Selected Employee with ID:{selectedEmployee.emp_number}</p>
          
          </>
        )}
        
    </div>
    );
}

export default EmployeesTableView;