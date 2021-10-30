const express = require('express');
const mongoose = require('mongoose');
const apiRouter = require('./routes/api');
const defaultRouter = require('./routes/default');
const app = express();
const PORT = 5005;


//DB Connection
mongoose.connect('  mongodb://localhost:27017/Calendar');

//Express Configs
app.use(express.json());
app.use('/api', apiRouter);
app.use('/', defaultRouter);


app.listen(PORT, () => { console.log(`Server is running on port: ${PORT}`) });