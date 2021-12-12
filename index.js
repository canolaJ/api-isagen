const express = require('express');
require('dotenv').config();


//?create server of express
const app = express();
//users routers
app.use('/user', require('./src/routers/userRoute'))


//listen http

app.listen( process.env.PORT, () => {
    console.log('connect');
})