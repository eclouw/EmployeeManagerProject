import logo from './logo.svg';
import './App.css';
import EmployeesTableView from './Pages/EmployeesTableView';
import EmployeeCreator from './Pages/EmployeeCreator';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import HomePage from './Pages/HomePage';
import NavBar from './Components/UI/NavBar';

function App() {
  return (
    <>
    <BrowserRouter>
    <NavBar/>
    <div class="container">
      <Routes>
      <Route path="/" element={<HomePage/>}/>
        <Route path="/edit/Employee" element={<EmployeesTableView/>}/>
        <Route path="/create/Employee" element={<EmployeeCreator/>}/>
      </Routes>
      </div>
    </BrowserRouter>
    </>
  );
}

export default App;
