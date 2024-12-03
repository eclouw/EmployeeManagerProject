const express = require('express');
const {Pool} = require('pg');
const cors = require('cors');
const bodyParser = require('body-parser');
const crypto = require('crypto')

const app = express();
const PORT = 5000;

require('dotenv').config();

app.use(cors({
    origin: process.env.FRONTEND_URL,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));
app.use(bodyParser.json());

const pgData = new Pool({
    user: process.env.DB_USERNAME,
    host: process.env.ENDPOINT,
    database: process.env.DB_NAME,
    password: process.env.PASSWORD,
    port: 5432,

});

//Get all the roles from the database
app.get('/get/roles', async (request, result) => {
    
    try {
        const query = 'SELECT * from public.roles';
        const res = await pgData.query(query);

        result.json(res.rows);
    }catch (error) {
        console.error('Error executng query:', error);
        result.status(500).json({error: 'Error with query'});
    }
});

//get all the employees from the database
app.get('/get/employees', async (request, result) =>{

    try {
        const query = "SELECT e.*,r.role_name, CONCAT(m.first_name, ' ', m.last_name) AS manager_name FROM public.employees e JOIN roles r ON e.emp_role=r.id LEFT JOIN employees m ON e.line_manager = m.emp_number";
        const res = await pgData.query(query);
        console.log("Fetched Employees from database")
        console.log(res.rows.length);
        result.json(res.rows);
    }catch (error) {
        console.error('Error executng query:', error);
        result.status(500).json({error: 'Error with query'});
    }
})


//Update employee details
app.post('/api/employee/edit/submit', async (req, res)=>{
    console.log('Got data');
    const {first_name, last_name, email, emp_number, emp_role, line_manager, salary, birthdate} = req.body;
    console.log('Receieved first name:', first_name)
    console.log('Recieved last name', last_name)
    //First update the employees that this employee manages so that they get the line manager of the employee being edited
    const upQuery = "UPDATE public.employees SET line_manager = CASE WHEN (SELECT line_manager FROM public.employees WHERE emp_number =$1) <> $2 THEN (SELECT line_manager FROM public.employees WHERE emp_number = $1) ELSE line_manager END WHERE line_manager=$1"
    const upQueryResult = await pgData.query(upQuery, [emp_number, line_manager]);
    console.log(upQueryResult);
    

    
    try{
        

        const query = "UPDATE public.employees SET first_name = $1, last_name = $2, email = $3, emp_role = $5, line_manager = $6, salary = $7, birthdate = $8 WHERE emp_number = $4";
        const queryResult = await pgData.query(query, [first_name, last_name, email, emp_number, emp_role, line_manager, salary, birthdate]);
        console.log(queryResult);
        res.json({message: 'Employee Updated', recievedData: req.body});
    }catch (error) {
        console.error('Error executng query:', error);
        res.status(500).json({error: 'Error with query'});
    }
})

//Deleting an employee
app.post('/api/employee/delete', async (req, res)=>{
    console.log('Deleteing employee');
    const {emp_number, line_manager} = req.body;
    const updateQuery = "UPDATE public.employees SET line_manager = $2 WHERE line_manager = $1"
    const deleteQuery = "DELETE FROM public.employees WHERE emp_number = $1"
    
    try{
        const updateQueryResult = await pgData.query(updateQuery, [emp_number, line_manager]);
        const deleteQueryResult = await pgData.query(deleteQuery, [emp_number]);
        
        console.log(deleteQueryResult);
        console.log(updateQueryResult);
        res.json({message: "user deleted"});
    }catch (error){
        console.error('Error executng query:', error);
        res.status(500).json({error: 'Error with query'});
    }
    
})

//Creating an employee
app.post('/api/employee/create/submit', async (req, res)=>{
    console.log('Creating new employee');
    const {first_name, last_name, email, emp_role, line_manager, salary, birthdate} = req.body;
    console.log('Receieved first name:', first_name)
    console.log('Recieved last name', last_name)
  
        if (line_manager == "NULL"){
            try{
                const query = "INSERT INTO public.employees (first_name, last_name, email, emp_role, line_manager, salary, birthdate) VALUES ($1, $2, $3, $4, null, $5, $6)";
                const queryResult = await pgData.query(query, [first_name, last_name, email, emp_role, salary, birthdate]);
                console.log(queryResult);
                res.json({message: 'Employee Created', recievedData: req.body});
            }catch(error){
                console.error('Error executng query:', error);
                res.status(500).json({error: 'Error with query'});
            }
            
        }else{
            try{
            const query = "INSERT INTO public.employees (first_name, last_name, email, emp_role, line_manager, salary, birthdate) VALUES ($1, $2, $3, $4, $5, $6, $7)";
            const queryResult = await pgData.query(query, [first_name, last_name, email, emp_role, line_manager, salary, birthdate]);
            console.log(queryResult);
            res.json({message: 'Employee Created', recievedData: req.body});
            }catch(error){
                console.error('Error executng query:', error);
                res.status(500).json({error: 'Error with query'});
            }
            
        }

})

app.post('/api/role/edit/submit', async (req, res)=>{
    console.log('Editing role');
    const {role_name, role_description, id} = req.body;
    console.log('Received role name:', role_name);
    console.log('Recieved role description', role_description);

    try{
        const query = "UPDATE public.roles SET role_name = $1, role_description = $2 WHERE id = $3";
        const queryResult = await pgData.query(query, [role_name, role_description, id]);
        console.log(queryResult);
        res.json({message: 'Role Edited', recievedData: req.body});
    }catch(error){
        console.error('Error executng query:', error);
        result.status(500).json({error: 'Error with query'});
    }
})

app.post('/api/role/create/submit', async (req, res)=>{
    console.log('Creating new role');
    const {role_name, role_description} = req.body;
    console.log('Received role name:', role_name);
    console.log('Recieved role description', role_description);

    try{
        const query = "INSERT INTO public.roles (role_name, role_description) VALUES ($1, $2)";
        const queryResult = await pgData.query(query, [role_name, role_description]);
        console.log(queryResult);
        res.json({message: 'Role Created', recievedData: req.body});
    }catch(error){
        console.error('Error executng query:', error);
        res.status(500).json({error: 'Error with query'});
    }
})

app.post('/api/role/delete/submit', async(req, res)=>{
    console.log('Deleting role');
    const {id} = req.body;
    console.log('Received role id:', id);
    try{
        //First make all employees with this role unassigned
        const empQuery = "UPDATE public.employees SET emp_role = (SELECT id FROM public.roles WHERE unassigned = true LIMIT 1) WHERE emp_role = $1";
        const queryResultEmp = await pgData.query(empQuery, [id]);
        console.log(queryResultEmp);

        //Then delete the role
        const query = "DELETE FROM public.roles WHERE id = $1";
        const queryResult = await pgData.query(query, [id]);
        console.log(queryResult);
        res.json({message: 'Role Deleted', recievedData: req.body});
    }catch(error){
        console.error('Error executng query:', error);
        res.status(500).json({error: 'Error with query'});
    }
})

app.use('/login', async(req, res)=>{
    const {username, password} = req.body;
    const query = "SELECT username from public.accounts WHERE username = $1 AND userpassword = $2";
    
        const queryResult = await pgData.query(query, [username, password]);
        console.log(queryResult);
        if (queryResult.rows.length > 0){
            res.send({
                token: username,
            })
        }else{
            res.status(500).json({error: 'No user found'});
        }
    
    
})



//start server
app.listen(PORT, () =>{
    console.log('Server is up on port ' + PORT);
});