const { Schema, model } = require('mongoose');

const UserSchema = Schema({
    nombres:{
        type: String,
        require: true,
        min: 3,
        max: 30
    },
    apellidos:{
        type: String,
        require: true,
        min: 3,
        max: 30
    },
    cc:{
        type: String,
        require: true,
        min: 6,
        max: 30
    },
    phone:{
        type: String,
        require: true,
        min: 7,
        max: 20
    },
    username:{
        type: String,
        require: true,
        unique: true,
        min: 6,
        max: 20
    },
    password:{
        type: String,
        require: true,
        max: 300
    },
    sexo:{
        type: String,
        require: true,
        min: 4,
        max: 12
    } ,
    post:{
        type: String,
        require: true,
        min: 6,
        max: 15
    },
    dateEntry:{
        type: String,
        require: true
    },
    salary:{
        type: String,
        require: true,
        min: 5,
        max: 12
    },
    estado:{
        type: String,
        require: true,
        min: 6,
        max: 15
    }
});

module.exports = model('User',UserSchema);