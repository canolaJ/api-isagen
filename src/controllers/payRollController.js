const { response } = require('express');
const PayRoll = require('../models/PayRollModel');
const { generateJwt } = require('../helpers/jwt');

const payRollAll = async(req,res = response) =>{

    try {
        const payRoll = await PayRoll.find({}).populate('payRollAuthor',{
            nombres: 1,
            apellidos:1,
            cc:1,
            post:1,
            salary:1,
            phone:1
        });

        res.json({
            isOk : true,
            payRoll : payRoll
        })
    } catch (error) {
        console.log(error);
    }
    
}


const createPayRoll = async(req,res) =>{

    try {
        const payRoll = new PayRoll( req.body );
        await payRoll.save();
        res.status(200).json({
            isOk : true
        })

    } catch (error) {
        console.log(error);
        res.json({
            isOk : false
        })
    }
}

const searchPermissionUser = async(req,res = response) =>{
    const { _id } = req.body;

    let payRoll = await PayRoll.find({payRollAuthor: _id} );
    try {
        res.status(200).json({
            isOk : true,
            payRoll : payRoll
        })

    } catch (error) {
        console.log(error);
        res.status(200).json({
            isOk : false
        })
    }
}








const payRollHolidaysAll = async(req,res = response) =>{


    try {
        const payRoll = await PayRoll.find({typePayRoll : "Vacaciones"}).populate('payRollAuthor',{
            nombres: 1,
            apellidos:1
        });
        res.json({
            isOk : true,
            payRoll
        })

    } catch (error) {
        console.log(error);
        res.json({
            isOk : false,
        })
    }

    
}

const payRollPermissionsAll = async(req,res = response) =>{

    try {
        const payRoll = await PayRoll.find({typePayRoll : "Permiso"}).populate('payRollAuthor',{
            nombres: 1,
            apellidos:1
        });
        res.json({
            isOk : true,
            payRoll
        })

    } catch (error) {
        console.log(error);
        res.json({
            isOk : false,
        })
    }
}






const revalidateToken = async(req, res= response)=>{
    const uid = req.uid
    const nombres = req.nombres
    const token = await generateJwt( uid, nombres);

    res.json({
        isOk : true,
        token
    })
}

const payRollUpdate = async(req, res = response) =>{
    const { _id } = req.body;
    try {
        const payRoll = await PayRoll.findById( _id );

        if(payRoll){

            const newData = {
                ...req.body,
                _id,
            }
            const payRollUpdated = await PayRoll.findByIdAndUpdate( _id, newData );
            res.json({
               isOk : true,
               msg : "Solicitud actualizada con éxito!"
            })

        }
        else{
            res.status(404).json({
                isOk : false,
                msg : "is-noUser"
            })
        }
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            isOk : false,
            msg : "error update"
        })
    }
    
}

const searchPayRoll = async(req,res = response) =>{
    const { dateGenerated, payRollAuthor } = req.body;

    let payRoll = await PayRoll.findOne({payRollAuthor: payRollAuthor,  dateGenerated: { $regex: '.*' + dateGenerated + '.*' }  } );
    try {
        res.status(200).json({
            isOk : true,
            payRoll : payRoll
        })

    } catch (error) {
        console.log(error);
        res.status(200).json({
            isOk : false
        })
    }
}



module.exports = {
    payRollAll,
    payRollHolidaysAll,
    createPayRoll,
    payRollUpdate,
    payRollPermissionsAll,
    searchPayRoll,
    searchPermissionUser,
    revalidateToken,
}
