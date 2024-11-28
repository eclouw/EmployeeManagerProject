import Container from 'react-bootstrap/Container';
import {default as Brow} from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function EmployeeEditingForm({selectedEmployee, onSubmit}){

    return(
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
            <button onClick={onSubmit}>Submit Changes</button>
            </Brow>
          </Container>
        </div>
        
    )

}

export default EmployeeEditingForm;