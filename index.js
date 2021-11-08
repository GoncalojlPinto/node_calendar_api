const express = require('express');
const app = express();
const mongoose = require('mongoose');
const apiRouter = require('./routes/api');
const defaultRouter = require('./routes/default');
const authRouter = require('./routes/auth');
const PORT = 5005;
require("dotenv").config();



//DB Connection
mongoose.connect('mongodb://localhost:27017/Calendar', () => console.log('Connected to MongoDB'));

//Express Configs
app.use(express.json());
app.use('/api/user', authRouter);
app.use('/api', apiRouter);
app.use('/', defaultRouter);



app.listen(PORT, () => { console.log(`Server is running on port: ${PORT}`) });