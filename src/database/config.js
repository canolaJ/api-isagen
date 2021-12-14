const mongoose = require('mongoose');

const dbConnection = async()=>{
    try {
        mongoose.connect( process.env.DB_CONNECTION);
        console.log("isConnectBd : ok");

    } catch (error) {
        console.log(error);
        throw new Error("Error a la hora de inicializar la conexión");
    }
}

module.exports = {
    dbConnection
}

