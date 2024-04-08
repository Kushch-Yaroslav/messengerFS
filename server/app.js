const express = require('express');
const cors = require('cors');
const {errorHandler} = require('./errorHandler');
const apiRouter = require('./routes/index');
const app = express();

app.use(cors());
app.use(express.json());
app.use('/api', apiRouter);


app.use(errorHandler);

module.exports = app;