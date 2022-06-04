const express = require('express');

const app = express();

const PORT = process.env.PORT || 5000;

//Defining Routes
app.use('/api/v1/users', require('./routes/users'));
app.use('/api/v1/auth', require('./routes/auth'));
app.use('/api/v1/contacts', require('./routes/contacts'));

app.listen(PORT, () => console.log(`Server started on ${PORT}`));