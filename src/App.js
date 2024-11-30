import logo from './logo.svg';
import './App.css';
import EmployeesTableView from './Pages/EmployeesTableView';
import EmployeeCreator from './Pages/EmployeeCreator';
import {BrowserRouter, Route, Routes} from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/edit/Employee" Component={EmployeesTableView}/>
        <Route path="/create/Employee" Component={EmployeeCreator}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
