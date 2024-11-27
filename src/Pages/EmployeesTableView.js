import { CompactTable } from '@table-library/react-table-library/compact';
import getData from '../Components/getData';
import axios from "react-axios";
import { useState } from 'react';
import { useEffect } from 'react';

function EmployeesTableView(){
    const [employeeData, setEmployeeData] = useState([]);
      
      //Get Employee Data
      useEffect(() => {
        const fetchEmployeeData = async()=>{
          const emps = await getData("employees");
          setEmployeeData(emps);
          console.log(emps); 
        }

        fetchEmployeeData();
      }, [])

    return (
    <div className='EmployeesTable'>
        <h1>Test</h1>
        <CompactTable columns={COLUMNS} data={data}/>
    </div>
    );
}

export default EmployeesTableView;