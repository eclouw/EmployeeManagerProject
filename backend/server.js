const express = require('express');
const {Pool} = require('pg');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 5000;

require('dotenv').config();

app.use(cors({
    origin: 'http://localhost:3000',
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

        result.json(res.rows);
    }catch (error) {
        console.error('Error executng query:', error);
        result.status(500).json({error: 'Error with query'});
    }
})

//Update employee first name, last name, and email
app.post('/api/employee/edit/submit', async (req, res)=>{
    console.log('Got data');
    const {first_name, last_name, email, emp_number, emp_role, line_manager} = req.body;
    console.log('Receieved first name:', first_name)
    console.log('Recieved last name', last_name)

    //send success message back 
    res.json({message: 'Data recieved!', recievedData: req.body})

    //update the first name, last name, and email
    //TODO add updating all of the details, this is currently just for testing purposes
    try{
        const query = "UPDATE public.employees SET first_name = $1, last_name = $2, email = $3, emp_role = $5, line_manager = $6 WHERE emp_number = $4";
        const queryResult = await pgData.query(query, [first_name, last_name, email, emp_number, emp_role, line_manager]);
        console.log(queryResult);
    }catch (error) {
        console.error('Error executng query:', error);
    }
})



//start server
app.listen(PORT, () =>{
    console.log('Server is up');
});