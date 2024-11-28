import Container from 'react-bootstrap/Container';
import {default as Brow} from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useEffect, useState } from 'react';

function EmployeeEditingForm({selectedEmployee, onSubmit, roles}){
    
    //States for the currently selected employee details
    const [inputEmployeeFirstName, setInputEmployeeFirstName] = useState('');
    const [inputEmployeeLastName, setInputEmployeeLastName] = useState('');
    const [inputEmployeeEmail, setInputEmployeeEmail] = useState('');
    const [inputEmployeeSalary, setInputEmployeeSalary] = useState('');
    const [inputEmployeeRole, setInputEmployeeRole] = useState(0);

    useEffect(()=>{
        if (selectedEmployee){
            setInputEmployeeFirstName(selectedEmployee.first_name);
            setInputEmployeeLastName(selectedEmployee.last_name);
            setInputEmployeeEmail(selectedEmployee.email);
            setInputEmployeeSalary(selectedEmployee.salary);
            setInputEmployeeRole(selectedEmployee.emp_role)
        }
    }, [selectedEmployee])

    return(
        <div>
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
            <button onClick={onSubmit}>Submit Changes</button>
            </Brow>
          </Container>
        </div>
        
    )

}

export default EmployeeEditingForm;