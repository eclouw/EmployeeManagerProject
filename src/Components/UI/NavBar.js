import React from "react";
import { Link } from "react-router-dom";
import './styles/navBar.css';
import { useState } from "react";
import Offcanvas from 'react-bootstrap/Offcanvas';
import Button from 'react-bootstrap/Button';

function NavBar(){
    const [showApplicationList, setShowApplicationList] = useState(false);

    const handleShow = ()=> setShowApplicationList(true);
    const handleClose = ()=> setShowApplicationList(false);
    return(
        <>
        <div class="navbar">
            <h1>eclouw</h1>
            <nav>
                <ul>
                    <li><Link to ="/">Home</Link></li>
                    <li><Button onClick={handleShow} variant="link" className="button-nav">Applications</Button></li>
                </ul>
            </nav>
        </div>
        <Offcanvas show={showApplicationList} onHide={handleClose}>
            <Offcanvas.Header closeButton>
                <Offcanvas.Title><p>Applications</p></Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                    <p>
                    <ul className="application-list">
                    <Link to ="/create/Employee"><li>Create Employee</li></Link>
                    <Link to ="/edit/Employee"><li>Edit Employee</li></Link> 
                    <Link to ="/edit/Roles"><li>Edit Roles</li> </Link>
                    </ul>
                    </p>
                </Offcanvas.Body>
        </Offcanvas>
        </>
    )
}

export default NavBar;