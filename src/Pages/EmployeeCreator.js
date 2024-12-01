//Page for Creating a new Employee
import { useEffect } from "react";
import getData from "../Components/getData";
import sendData from "../Components/sendData";
import EmployeeEditingForm from "../Components/EmployeeEditingForm";
import { useState } from "react";
import employeeValidation from "../Components/Rules/employeeValidation";
import Spinner from 'react-bootstrap/Spinner';

function EmployeeCreator(){
    const [employeeData, setEmployeeData] = useState([]);
    const [roleData, setRoleData] = useState([]);
    const [loadingData, setLoadingData] = useState(true);
    const [newEmployeeData, setNewEmployeeData] = useState([]);
    const [editingFormEmployeeData, setEditingFormEmployeeData] = useState([])

    //Get the role data, employee data, and create a template employee
    useEffect(()=> {
        setLoadingData(true);
        const fetchEmployeeData = async()=>{
            const employees = await getData("employees");
            setEmployeeData(employees);
        }
        const fetchRoleData = async()=>{
            const roles = await getData("roles");
            setRoleData(roles);
        }
        const createNewEmployeeData = ()=>{
            setNewEmployeeData({
              first_name: '',
              last_name: '',
              birthdate: '1990-01-01',
              salary: 0,
              line_manager: null,
              email: ''
            })
          }

        fetchEmployeeData();
        fetchRoleData();
        createNewEmployeeData();
    }, [])

    //Function for creating a new employee
    function createNewEmployee(first_name, last_name, email, lineManager, salary, role, birthdate){
        let newEmployee = {
          first_name: first_name, 
          last_name: last_name,
          email: email,
          line_manager: lineManager.emp_number,
          salary: salary,
          emp_role: role,
          birthdate: birthdate
        }

        //Validate the employee details
        if (employeeValidation(first_name, last_name, email, salary, true)){
            createEmployee(newEmployee);
            setEmployeeData((prevEmployeeData)=>[...prevEmployeeData, newEmployee]);
        }
        
      }

      //UseEffect for once the employeeData is loaded or altered
      useEffect(()=>{
        if (employeeData.length > 0 && Array.isArray(employeeData)){
            const mappedData = employeeData.map((employee)=>({
                ...employee,
                id: employee.emp_number,
                value: employee.emp_number,
                label: employee.first_name + ' ' + employee.last_name,
                birthdate: employee.birthdate.split("T")[0]
            }))

            let noLineManager = {
                emp_number: null,
                first_name: 'No Line Manager',
                last_name: '',
                id: 0,
                value: 0,
                label: 'No Line Manager'
            }
            setEditingFormEmployeeData(mappedData);
            setEditingFormEmployeeData((prevData)=> [...prevData, noLineManager]);
            setLoadingData(false);
        }
      }, [employeeData])

          //Create new employee by sending the data to the backend
        const createEmployee = async(data)=>{
            resetNewEmployee();
            sendData(data, "employees", 2);
      }

      function resetNewEmployee(){
        setNewEmployeeData({
            first_name: '',
            last_name: '',
            birthdate: '1990-01-01',
            salary: 0,
            line_manager: null,
            email: ''
          })
      }


    return (
        <div className = "Employee Creator">
            { loadingData == false ?(
                <>
                <EmployeeEditingForm selectedEmployee={newEmployeeData} onSubmit={createNewEmployee} roles={roleData} employees={editingFormEmployeeData}/>
                </>
            ):(
                <Spinner animation="border" role="status"></Spinner>
            )}
        </div>
    )
}

export default EmployeeCreator;