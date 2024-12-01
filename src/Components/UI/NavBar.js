import React from "react";
import { Link } from "react-router-dom";
import './styles/navBar.css';

function NavBar(){
    return(
        <div class="navbar">
            <h1>eclouw</h1>
            <nav>
                <ul>
                    <li><Link to ="/">Home</Link></li>
                    <li><Link to ="/create/Employee">Create Employee</Link></li>
                    <li><Link to ="/edit/Employee">Edit Employee</Link></li>
                </ul>
            </nav>
        </div>
    )
}

export default NavBar;