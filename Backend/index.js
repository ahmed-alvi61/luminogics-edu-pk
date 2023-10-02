const express = require('express');
var cors = require('cors');
require("dotenv").config();
const connectionPromise = require('./config/db_config');
const userRoutes = require('./routes/userRoutes');
const weekRoutes = require('./routes/weekRoutes');
const port = process.env.PORT;

const app = express();
app.use(express.json());
app.use(cors());

//Database Connection
connectionPromise.then(() => {
    console.log('Connected to MongoDB');
}).catch(error => {
        console.error('Error connecting to MongoDB:', error.message);
});

app.use('/api', userRoutes);
app.use('/api', weekRoutes);

app.listen(port, () => console.log('Port is listening '));