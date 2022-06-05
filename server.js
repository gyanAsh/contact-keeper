const express = require('express');
const connectDB = require('./config/db');
const app = express();

const PORT = process.env.PORT || 8080;
//Connect to database
    connectDB();

//Init Middleware
app.use(express.json({extended:false}));

//Defining Routes
app.use('/api/v1/users', require('./routes/users'));
app.use('/api/v1/auth', require('./routes/auth'));
app.use('/api/v1/contacts', require('./routes/contacts'));

app.listen(PORT, () => console.log(`Server started on ${PORT}`));