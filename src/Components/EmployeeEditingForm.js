import Container from 'react-bootstrap/Container';
import {default as Brow} from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useEffect, useState } from 'react';
import Select from 'react-select';
import React from 'react';
import CryptoJS from 'crypto-js';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';

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
      onSubmit(inputEmployeeFirstName, inputEmployeeLastName, inputEmployeeEmail, inputEmployeeManager, inputEmployeeSalary, document.getElementById('input_role').value, inputEmployeeBirthDate);
    }

    function onDeleteEmployee(){
      onDelete(selectedEmployee.emp_number, selectedEmployee.line_manager);
    }


    return(
        <div>
          <Container>
          {inputEmployeeEmail && editing &&(
            <img src={'https://gravatar.com/avatar/'+inputEmployeeEmailHash}/>
          )}
          
            
            <Brow >
              <Col  className='right-align'>
                First Name
                <input type="text" value={inputEmployeeFirstName} onChange={(e)=> setInputEmployeeFirstName(e.target.value)} id="input_first_name" className='input-box'/>
                
              </Col>
              <Col  className='right-align'>
                <p>Last Name 
                <input type="text" value={inputEmployeeLastName} onChange={(e)=>setInputEmployeeLastName(e.target.value)} id="input_last_name" className='input-box'/>
                </p>
              </Col>
              <Col  className='right-align'>
                <p>Email 
                <input type="text" value={inputEmployeeEmail} onChange={(e)=>setInputEmployeeEmail(e.target.value)} id="input_email" className='input-box'/>
                </p>
              </Col>
            </Brow>
            <Brow>
              <Col  className='right-align'>
                <p>Role
                <select value={inputEmployeeRole} id="input_role" onChange={(e)=>setInputEmployeeRole(e.target.value)} className='input-box'>
                  {roles.map((role)=>(
                    <option key={role.id} value={role.id}>{role.role_name}</option>
                  ))}

                </select>
                </p>
              </Col>
              <Col  className='right-align'>
                <p>Salary
                <input type="text" value={inputEmployeeSalary} onChange={(e)=>setInputEmployeeSalary(e.target.value)} id="input_salary" className='input-box'/>
                </p>
              </Col>
              <Col  className='right-align'>
                <p>Birth Date
                <input type="date" id="input_birthdate" value={inputEmployeeBirthDate} onChange={(e)=>setInputEmployeeBirthDate(e.target.value)} className='input-box'/>
                </p>
              </Col>
            </Brow>
            <Brow>
            <Col>
            </Col>
            <Col>
            </Col>
            <Col>
           
            Line Manager
            
              <div>
              <Select options={employees} value={inputEmployeeManager} onChange={(e)=>setInputEmployeeManager(e)} id="input_line_manager" selected={inputEmployeeManager}/>
              </div>
              
            
            </Col>

            </Brow>
            <Brow>
            <Col>
            
            {editing ?(
              <>
            <Button onClick={onDeleteEmployee} className='delete-button'>Delete Employee</Button>
            <Button onClick={onSendData} className='submit-button'>Submit Changes</Button>
            </>
            ) : (
              <>
              <Button onClick={onSendData} className='create-button'>Create Employee</Button>
              </>
            )}
            
            </Col>
            
            </Brow>
          </Container>
        </div>
        
    )

}

export default EmployeeEditingForm;