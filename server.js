const express = require('express');
const connectDB = require('./config/db');
const path = require('path');
const app = express();

//Connect to database
    connectDB();

//Init Middleware
app.use(express.json({extended:false}));

//Defining Routes
app.use('/api/v1/users', require('./routes/users'));
app.use('/api/v1/auth', require('./routes/auth'));
app.use('/api/v1/contacts', require('./routes/contacts'));

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
    // Set static folder
    app.use(express.static('client/build'));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
}

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => console.log(`Server started on ${PORT}`));