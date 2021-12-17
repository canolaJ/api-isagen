const express = require('express');
require('dotenv').config();
const { dbConnection } = require('./src/database/config');

dbConnection()

//?create server of express
const app = express();
//parceo request
app.use( express.json());
//users routers
app.use('/user', require('./src/routers/userRoute'))
app.use('/request', require('./src/routers/requestRoute'))
app.use('/payRoll', require('./src/routers/payRollRoute'))


//listen http $2a$10$eNOFjAEPgAOBXBjSfIxw4.Or8Id9bRV3UVKuVWIem0BHaAjUZ1/ra    id 61b76f088a58890144d84156

app.listen( process.env.PORT, () => {
    console.log('isServer : ok');
})