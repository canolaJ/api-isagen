const { response } = require('express')

//!data Prueba
const users = [
    {id:1, nombres : "jonathan" , apellidos : "cañola", cc : "456789233", phone : 3209874563 , username : "Totan" , 
     password : "***************" , dateEntry : "01-23-1990" , post : "Super Administrador", sexo: "masculino", salary : "3500000", estado : "activo"},
    {id:2, nombres : "jorge" , apellidos : "cañola", cc : "986978423", phone : 3119874562 , username : "George" , 
     password : "***************" , dateEntry : "11-10-2002" , post : "Usuario-Nomina", sexo: "masculino", salary : "2500000" , estado : "activo"},
    {id:3, nombres : "fabian" , apellidos : "monitor", cc : "986978423", phone : 3119874562 , username : "George" , 
     password : "***************" , dateEntry : "04-23-2019" , post : "Usuario-Empleado", sexo: "masculino", salary : "1500000", estado : "inactivo"},
];
const userAll = (req,res = response) =>{
    res.header("Access-Control-Allow-Origin", "*");
    res.json({
        users
    })
}

const userCreate = (req,res) =>{
    res.status(200).json({
        hello : "ok"
    })
}


module.exports = {
    userAll,
    userCreate
}
