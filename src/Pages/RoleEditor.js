import { useEffect, useState } from 'react';
import getData from '../Components/getData';
import Accordion from 'react-bootstrap/Accordion';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import roleValidation from '../Components/Rules/roleValidation';
import sendData from '../Components/sendData';

function RoleEditor(){
    const [roleData, setRoleData] = useState([]);
    const [dataReady, setDataReady] = useState(false);
    const [editedRoleData, setEditedRoleData] = useState([]);
    const [filterText, setFilterText] = useState('');
    const [newRoleName, setNewRoleName] = useState('');
    const [newRoleDescription, setNewRoleDescription] = useState('');

    //Get the role data from the backend
    useEffect(()=> {
        

        fetchRoleData();
    }, [])

    const fetchRoleData = async()=>{
        const roles = await getData("roles");
        console.log("roles", roles);
        setRoleData(roles);
    }

    useEffect(()=>{
        if (roleData.length > 0 && Array.isArray(roleData)){
            setEditedRoleData(roleData);
            setDataReady(true);
        }
    }, [roleData])

    function updateRole(id){
        const updatedRole = editedRoleData.find((role)=> role.id === id);
        if (roleValidation(updatedRole.role_name, updatedRole.role_description, roleData, id, true)){
            sendUpdatedRoleData(updatedRole);
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

    //Create a new role
    function createNewRole(){
        if (roleValidation(newRoleName, newRoleDescription, roleData, -1, true)){
            let newRole = {
                role_name: newRoleName,
                role_description: newRoleDescription,
                id: editedRoleData.length +1,
            }
            sendNewRoleData(newRole);
            
        }else{
            console.log('invalid role')
        }
    }

    //Delete a role
    function deleteRole(id, name){
        if (window.confirm("Are you sure you want to delete role: " + name)){
            let delData = {
                id: id,
            }
            sendDeletionData(delData);
        }
    }

    //Async functions to ensure that role data is fetched after changes have been made and confirmed by server
    const sendDeletionData = async(data)=>{
        const res = await sendData(data, "roles", 3);
        fetchRoleData();
    }

    const sendNewRoleData = async(data)=>{
        const res = await sendData(data, "roles", 2);
        fetchRoleData();
    }

    const sendUpdatedRoleData= async(data)=>{
        const res = await sendData(data, "roles", 1);
        fetchRoleData();
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
                                        <b>This role is a special role and may not be edited. Employees that do not have a role are assigned this role.</b>
                                        </>
                                    ): role.has_superior==false ? (
                                        <>
                                        <b>This role is a special role and may not be edited. This role is the head of the company.</b>
                                        </>
                                        
                                    ): (
                                        <>
                                        <p><b>Name</b>
                                        <input type="text" defaultValue={role.role_name} onChange={(e)=> updateEditedData(role.id, 'role_name', e.target.value)} style={{marginLeft: '1rem'}}/>
                                        </p>
                                        </>
                                    )}
                                    
                                </Row>
                                
                                <Row>
                                    {role.has_superior == false ? (
                                        <></>
                                    ):(
                                        <>
                                        <p><b>Description</b></p>
                                        <textarea value={role.role_description} onChange={(e)=> updateEditedData(role.id, 'role_description', e.target.value)} rows={3} cols={50} style={{marginBottom: '1rem'}}/>
                                        </>
                                    )}
                                    
                                    
                                </Row>
                                <Row>
                                    {role.has_superior == false ? (
                                        <>
                                        </>
                                    ): (
                                        <Col>
                                        <Button onClick={()=> updateRole(role.id)} className='submit-button'>Submit Changes</Button>
                                        <Button onClick={()=> deleteRole(role.id, role.role_name)} className='delete-button'>Delete Role</Button>
                                        </Col>
                                        
                                    )}
                                    
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