const express = require('express');
const {Pool} = require('pg');
const cors = require('cors');

const app = express();
const PORT = 5000;

require('dotenv').config();

app.use(cors({
    origin: 'http://localhost:3000',
}));

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
        const query = 'SELECT * from public.employees';
        const res = await pgData.query(query);

        result.json(res.rows);
    }catch (error) {
        console.error('Error executng query:', error);
        result.status(500).json({error: 'Error with query'});
    }
})



//start server
app.listen(PORT, () =>{
    console.log('Server is up');
});