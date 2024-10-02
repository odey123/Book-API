const express = require ('express');
const app = express();
const mongoose = require('mongoose');
require('dotenv').config()
const bodyParser = require('body-parser');
const authjwt = require('./middleware/jwt')


// app.get('/', (req, res)=>{
//     res.send('Server is up and running')
// })

const usersRoutes = require('./routes/users');
const bookRoutes = require('./routes/Book');

app.use(bodyParser.json());
app.use(authjwt());


app.use('/users', usersRoutes)
app.use('/books', bookRoutes)


const port = 5000
app.listen(port, ()=>{
    console.log(`The server is running on port ${port} `)
})

const connectionString = process.env.CONNECTION_STRING

mongoose.connect(connectionString)
 .then(() => console.log('Database connected successfully'))
 .catch((err) => console.log('Database connection error'))
