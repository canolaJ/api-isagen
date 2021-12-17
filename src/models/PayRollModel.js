const { Schema, model } = require('mongoose');

const PayRollSchema = Schema({
    dateGenerated:{
        type: String,
        require: true,
        min: 10,
        max: 11
    },
    holiadysPaid:{
        type: String,
        require: true,
        min: 10,
        max: 11
    },
    permissionPaid:{
        type: String,
        require: true,
        min: 7,
        max: 11
    },
    permissionNotPaid:{
        type: String,
        require: true,
        min: 7,
        max: 11
    },
    payRollAuthor:{
        type: Schema.Types.ObjectId, ref: 'User',

    },
    userResponseRoll:{
        type: String,
        require: true,
        min: 3,
        max: 11

    },
    salary:{
        type: String,
        min: 1,
        max: 10
    },
    totalPayRoll:{
        type: String,
        min: 2,
        max: 3
    },

});

module.exports = model('PayRoll',PayRollSchema);