import { useEffect, useState } from 'react';
import getData from '../Components/getData';
import Accordion from 'react-bootstrap/Accordion';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import roleValidation from '../Components/Rules/roleValidation';

function RoleEditor(){
    const [roleData, setRoleData] = useState([]);
    const [dataReady, setDataReady] = useState(false);
    const [editedRoleData, setEditedRoleData] = useState([]);
    const [filterText, setFilterText] = useState('');
    const [newRoleName, setNewRoleName] = useState('');
    const [newRoleDescription, setNewRoleDescription] = useState('');

    //Get the role data from the backend
    useEffect(()=> {
        const fetchRoleData = async()=>{
            const roles = await getData("roles");
            console.log("roles", roles);
            setRoleData(roles);
        }

        fetchRoleData();
    }, [])

    useEffect(()=>{
        if (roleData.length > 0 && Array.isArray(roleData)){
            setEditedRoleData(roleData);
            setDataReady(true);
        }
    }, [roleData])

    function updateRole(id){
        const updatedRole = editedRoleData.find((role)=> role.id === id);
        if (roleValidation(updatedRole.role_name, updatedRole.role_description, roleData, id, true)){
            console.log(updatedRole);
        }else{
            console.log('invalid role')
        }
        
    }

    //Update the editedrole data
    function updateEditedData(id, field, value){
        if (field == 'role_name'){
           setEditedRoleData((prevData) => prevData.map((role)=>
        role.id === id ? {...role, role_name: value} : role))
        }else if (field == 'role_description'){
            setEditedRoleData((prevData) => prevData.map((role)=>
                role.id === id ? {...role, role_description: value} : role)) 
        }

        console.log(editedRoleData);
    }

    //update the filter
    function updateFilter(value){
        setFilterText(value);
    }

    function createNewRole(){
        if (roleValidation(newRoleName, newRoleDescription, roleData, -1, true)){

        }else{
            console.log('invalid role')
        }
    }

    return(
        <div className='role-editor-page'>
            {dataReady && roleData.length > 0 ?(
                <>
                <p>Filter by name 
                    <input type='text' value={filterText} onChange={(e)=>updateFilter(e.target.value)} style={{marginLeft: '1rem'}}/>
                </p>
                <Accordion defaultActiveKey="0">
                <Accordion.Item>
                        <Accordion.Header><b>Add New Role</b></Accordion.Header>
                        <Accordion.Body>
                            <Row>
                                <p><b>Name</b>
                                <input type="text" defaultValue={newRoleName} onChange={(e)=> setNewRoleName(e.target.value)} style={{marginLeft: '1rem'}}/>
                                </p>
                            </Row>
                            <Row>
                                <p><b>Description</b></p>
                                <textarea value={newRoleDescription} onChange={(e)=> setNewRoleDescription(e.target.value)} rows={3} cols={50} style={{marginBottom: '1rem'}}/>
                                    
                            </Row>
                            <Row>
                                <Button onClick={createNewRole}>Submit Changes</Button>
                            </Row>
                            
                        </Accordion.Body>
                    </Accordion.Item>
                    {editedRoleData.map((role)=> role.role_name.toLowerCase().includes(filterText.toLowerCase()) &&(
                        <Accordion.Item eventKey={role.id}>
                            <Accordion.Header>{role.role_name}</Accordion.Header>
                            <Accordion.Body>
                                <Row>
                                    {role.unassigned ? (
                                        <>
                                        <b>This role is a special role and only the description may be edited. Employees that do not have a role are assigned this role.</b>
                                        </>
                                    ): (
                                        <p><b>Name</b>
                                        <input type="text" defaultValue={role.role_name} onChange={(e)=> updateEditedData(role.id, 'role_name', e.target.value)} style={{marginLeft: '1rem'}}/>
                                        </p>
                                    )}
                                    
                                </Row>
                                
                                <Row>
                                    <p><b>Description</b></p>
                                    <textarea value={role.role_description} onChange={(e)=> updateEditedData(role.id, 'role_description', e.target.value)} rows={3} cols={50} style={{marginBottom: '1rem'}}/>
                                    
                                </Row>
                                <Row>
                                    <Button onClick={()=> updateRole(role.id)}>Submit Changes</Button>
                                </Row>
                            </Accordion.Body>
                        </Accordion.Item>
                    ))}
                    
                </Accordion>
                </>
            ):(
                <>
                </>
            )}
        </div>
    )

}

export default RoleEditor;