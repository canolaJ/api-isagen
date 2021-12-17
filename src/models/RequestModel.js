const { Schema, model } = require('mongoose');

const RequestSchema = Schema({
    dateExit:{
        type: String,
        require: true,
        min: 10,
        max: 11
    },
    dateEntry:{
        type: String,
        require: true,
        min: 10,
        max: 11
    },
    typeRequest:{
        type: String,
        require: true,
        min: 7,
        max: 11
    },
    payRequest:{
        type: String,
        require: true,
        min: 7,
        max: 11
    },
    requestAuthor:{
        type: Schema.Types.ObjectId, ref: 'User',

    },
    userResponse:{
        type: String,
        require: true,
        min: 3,
        max: 11

    },
    response:{
        type: String,
        min: 11,
        max: 11
    },
    stateRequest:{
        type: String,
        min: 2,
        max: 3
    },

});

module.exports = model('Request',RequestSchema);