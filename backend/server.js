require('dotenv').config();
const express = require('express');
const cors = require('cors');
const compression = require('compression');
const path = require('path');

const { pgPool } = require('./src/config/db.js');

const app = express();
const port = process.env.PORT;

// --- midlewares
app.use(compression());
app.use(cors());
app.use(express.json());

const TODO_LIST = require('./src/routes/todos.js');

app.use('/', TODO_LIST);

pgPool.on('connect', () => console.log('PostgreSQL connected'));
pgPool.on('error', (err) => {
    console.error('Erro PostgreSQL: ', err);
    process.exit(1);
});

app.listen(port, async () => {
    console.log(`Server running in the port ${port}`);
});