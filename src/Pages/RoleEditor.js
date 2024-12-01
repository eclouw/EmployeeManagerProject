import { useEffect, useState } from 'react';
import getData from '../Components/getData';
import Accordion from 'react-bootstrap/Accordion';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
function RoleEditor(){
    const [roleData, setRoleData] = useState([]);
    const [dataReady, setDataReady] = useState(false);
    const [editedRoleData, setEditedRoleData] = useState([]);
    const [filterText, setFilterText] = useState('');

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
        console.log(id);
    }

    //Update the editedrole data
    function updateEditedData(id, field, value){
        if (field == 'role_name'){
           setEditedRoleData((prevData) => prevData.map((role)=>
        role.id === id ? {...role, role_name: value} : role))
        }else if (field == 'role_description'){
            setEditedRoleData((prevData) => prevData.map((role)=>
                role.id === id ? {...role, role_description: value} : role)) 
        }else if (field == 'has_superior'){
            setEditedRoleData((prevData) => prevData.map((role)=>
                role.id === id ? {...role, has_superior: value} : role)) 
        }

        console.log(editedRoleData);
    }

    //update the filter
    function updateFilter(value){
        setFilterText(value);
    }

    return(
        <div className='role-editor-page'>
            {dataReady && roleData.length > 0 ?(
                <>
                <p>Filter by name 
                    <input type='text' value={filterText} onChange={(e)=>updateFilter(e.target.value)} style={{marginLeft: '1rem'}}/>
                </p>
                <Accordion defaultActiveKey="0">
                    {editedRoleData.map((role)=> role.role_name.toLowerCase().includes(filterText.toLowerCase()) &&(
                        <Accordion.Item eventKey={role.id}>
                            <Accordion.Header>{role.role_name}</Accordion.Header>
                            <Accordion.Body>
                                <Row>
                                    <p>Name
                                        <input type="text" defaultValue={role.role_name} onChange={(e)=> updateEditedData(role.id, 'role_name', e.target.value)}/>
                                    </p>
                                </Row>
                                <Row>
                                    <p>Requires Superior
                                        {role.has_superior ?(
                                            <input type="checkbox" onChange={(e)=> updateEditedData(role.id, 'has_superior', false)} checked='true'/>
                                        ):(
                                            <input type="checkbox" onChange={(e)=> updateEditedData(role.id, 'has_superior', true)}/>
                                        )}
                                    </p>
                                </Row>
                                <Row>
                                    <p>Description
                                        <input type="text" defaultValue={role.role_description} onChange={(e)=> updateEditedData(role.id, 'role_description', e.target.value)}/>
                                    </p>
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