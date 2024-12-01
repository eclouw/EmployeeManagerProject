import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import '../Components/UI/styles/styles.css';
import 'bootstrap/dist/css/bootstrap.min.css';
function HomePage(){

    return(
        <div className="HomePage">
            <h1>Welcome</h1>
            <Container >
                <Row style={{height: '18rem', margin: '0'}} className='app-icon-row'>
                    <Col>
                    </Col>
                    <Col className='app-icon-col'>
                        <Card style={{ width: '100%', height: '35rem'}}>
                            <Card.Img variant='top' src='/images/emp_new_icon.jpg'/>
                            <Card.Body className="d-flex flex-column justify-content-between">
                                <Card.Title>
                                    Create New Employee
                                </Card.Title>
                                <Card.Text>
                                    Click the button below to navigate to the page for creating an employee
                                </Card.Text>
                                <Link to="/create/employee">
                                    <Button variant="primary" style={{width: '100%'}}>Create New Employee</Button>
                                </Link>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col className='app-icon-col'>
                    <Card style={{ width: '100%' , height: '35rem'}}>
                            <Card.Img variant='top' src='/images/emp_edit_icon.jpg'/>
                            <Card.Body className="d-flex flex-column justify-content-between">
                                <Card.Title>
                                    <p>Edit Employees</p>
                                </Card.Title>
                                <Card.Text>
                                    Click the button below to navigate to the page for viewing the employees in a table and editing them
                                </Card.Text>
                                <Link to="/edit/employee">
                                    <Button variant="primary" style={{width: '100%'}}>Edit Employees</Button>
                                </Link>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col className='app-icon-col'>
                    <Card style={{ width: '100%' , height: '35rem'}}>
                            <Card.Img variant='top' src='/images/role_edit_icon.png'/>
                            <Card.Body className="d-flex flex-column justify-content-between">
                                <Card.Title>
                                    <p>Edit Roles</p>
                                </Card.Title>
                                <Card.Text>
                                    Click the button below to navigate to the page for editing employee roles
                                </Card.Text>
                                <Link to="/edit/Roles">
                                    <Button variant="primary" style={{width: '100%'}}>Edit Roles</Button>
                                </Link>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default HomePage;