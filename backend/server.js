const express = require('express');
const {Pool} = require('pg');

const app = express();
const PORT = 3000;

const pgData = new Pool({
    user: process.env.DB_USERNAME,
    host: process.env.ENDPOINT,
    database: process.env.DB_NAME,
    password: process.env.PASSWORD,
    port: 5432,

});

app.get('/data', async (request, result) => {
    try {
        const query = 'SELECT * from public.roles';
        const res = await pgData.query(query);

        result.json(res.rows);
    }catch (error) {
        console.error('Error executng query:', error);
        result.status(500).json({error: 'Error with query'});
    }
});

app.listen(PORT, () =>{
    console.log('Server is up');
});