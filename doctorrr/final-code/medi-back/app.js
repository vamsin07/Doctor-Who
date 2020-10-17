const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const morgan = require('morgan');
const cors = require('cors');
require('dotenv').config();

const userRoutes = require('./routes/user');
const visitorRoutes = require('./routes/visitor');
const patientRoutes = require('./routes/patient');

const app = express();

mongoose
    .connect(process.env.DATABASE, {
        useNewUrlParser: true,
        useCreateIndex: true
    })
    .then(() => console.log('DATABASE connected'));

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cors());

app.use('/api', userRoutes);
app.use('/api', visitorRoutes);
app.use('/api', patientRoutes);

const port = process.env.PORT || 8000

app.listen(port, () => {
	console.log(`Server is running on port ${port}`);
});