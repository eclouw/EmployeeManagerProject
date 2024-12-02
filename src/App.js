import logo from './logo.svg';
import './App.css';
import EmployeesTableView from './Pages/EmployeesTableView';
import EmployeeCreator from './Pages/EmployeeCreator';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import HomePage from './Pages/HomePage';
import NavBar from './Components/UI/NavBar';
import RoleEditor from './Pages/RoleEditor';
import Login from './Pages/Login';
import { useState } from 'react';
import useToken from './Components/useToken';



function App() {
  const {token, setToken} = useToken();
  if (!token){
    return <Login setToken={setToken}/>
  }
  
  return (
    <>
    <BrowserRouter>
    <NavBar/>
    <div className="container">
      <Routes>
      <Route path="/" element={<HomePage token={token}/>}/>
      <Route path="/login" element={<Login/>}/>
        <Route path="/edit/Employee" element={<EmployeesTableView/>}/>
        <Route path="/create/Employee" element={<EmployeeCreator/>}/>
        <Route path="/edit/Roles" element={<RoleEditor/>}/>
      </Routes>
      </div>
    </BrowserRouter>
    </>
  );
}

export default App;
