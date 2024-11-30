import Container from 'react-bootstrap/Container';
import {default as Brow} from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useEffect, useState } from 'react';
import Select from 'react-select';
import React from 'react';
import CryptoJS from 'crypto-js';

function EmployeeEditingForm({selectedEmployee, onSubmit, roles, employees, editing, onDelete}){
    //States for the currently selected employee details
    const [inputEmployeeFirstName, setInputEmployeeFirstName] = useState('');
    const [inputEmployeeLastName, setInputEmployeeLastName] = useState('');
    const [inputEmployeeEmail, setInputEmployeeEmail] = useState('');
    const [inputEmployeeSalary, setInputEmployeeSalary] = useState('');
    const [inputEmployeeRole, setInputEmployeeRole] = useState(0);
    const [inputEmployeeManager, setInputEmployeeManager] = useState([]);
    const [inputEmployeeBirthDate, setInputEmployeeBirthDate] = useState('');
    const [inputEmployeeEmailHash, setInputEmployeeEmailHash] = useState('');
    console.log(roles);

    useEffect(()=>{
        if (selectedEmployee != undefined){
            setInputEmployeeFirstName(selectedEmployee.first_name);
            setInputEmployeeLastName(selectedEmployee.last_name);
            setInputEmployeeEmail(selectedEmployee.email);
            setInputEmployeeSalary(selectedEmployee.salary);
            setInputEmployeeRole(selectedEmployee.emp_role)
            setInputEmployeeBirthDate(selectedEmployee.birthdate)
            //Set the employee line manager
            const lManager = employees.find((item)=> item.emp_number == selectedEmployee.line_manager);
            setInputEmployeeManager(lManager);

            //Get the email hash for gravatar
            if (selectedEmployee.email){
              const hash = CryptoJS.SHA256(selectedEmployee.email.trim().toLowerCase()).toString(CryptoJS.enc.Hex);
              setInputEmployeeEmailHash(hash);
            }
            
            
        }
    }, [selectedEmployee])

    function onSendData(){
      console.log("role from form", document.getElementById('input_role').value);
      onSubmit(inputEmployeeFirstName, inputEmployeeLastName, inputEmployeeEmail, inputEmployeeManager, inputEmployeeSalary, document.getElementById('input_role').value, inputEmployeeBirthDate);
    }

    function onDeleteEmployee(){
      onDelete(selectedEmployee.emp_number, selectedEmployee.line_manager);
    }

    console.log("frome employee table", employees);

    return(
        <div>
          {inputEmployeeEmail && (
            <img src={'https://gravatar.com/avatar/'+inputEmployeeEmailHash}/>
          )}
          
            <Container>
            <Brow>
              <Col>
                <p>First Name 
                <input type="text" value={inputEmployeeFirstName} onChange={(e)=> setInputEmployeeFirstName(e.target.value)} id="input_first_name"/>
                </p>
              </Col>
              <Col>
                <p>Last Name 
                <input type="text" value={inputEmployeeLastName} onChange={(e)=>setInputEmployeeLastName(e.target.value)} id="input_last_name"/>
                </p>
              </Col>
              <Col>
                <p>Email 
                <input type="text" value={inputEmployeeEmail} onChange={(e)=>setInputEmployeeEmail(e.target.value)} id="input_email"/>
                </p>
              </Col>
            </Brow>
            <Brow>
              <Col>
                <p>Role
                <select value={inputEmployeeRole} id="input_role" onChange={(e)=>setInputEmployeeRole(e.target.value)}>
                  {roles.map((role)=>(
                    <option key={role.id} value={role.id}>{role.role_name}</option>
                  ))}

                </select>
                </p>
              </Col>
              <Col>
                <p>Salary
                <input type="text" value={inputEmployeeSalary} onChange={(e)=>setInputEmployeeSalary(e.target.value)} id="input_salary"/>
                </p>
              </Col>
              <Col>
                <p>Birth Date
                <input type="date" id="input_birthdate" value={inputEmployeeBirthDate} onChange={(e)=>setInputEmployeeBirthDate(e.target.value)}/>
                </p>
              </Col>
            </Brow>
            <Brow>
            <Col>
            <p>
              Line Manager
              <Select options={employees} value={inputEmployeeManager} onChange={(e)=>setInputEmployeeManager(e)} id="input_line_manager" selected={inputEmployeeManager}/>
            </p>
            </Col>
            <Col>
            Select Line Manager
            </Col>
            </Brow>
            <Brow>
            <button onClick={onSendData}>Submit Changes</button>
            {editing &&(
            <button onClick={onDeleteEmployee}>Delete Employee</button>
            )}
            </Brow>
          </Container>
        </div>
        
    )

}

export default EmployeeEditingForm;