const { response } = require('express');
const Request = require('../models/RequestModel');
const bcrypt = require('bcryptjs');
const { generateJwt } = require('../helpers/jwt');

const requestAll = async(req,res = response) =>{
    const request = await Request.find({}).populate('users');
    res.json({
        isOk : true,
        // request
    })
}

const requestHolidaysAll = async(req,res = response) =>{


    try {
        const request = await Request.find({typeRequest : "Vacaciones"}).populate('requestAuthor',{
            nombres: 1,
            apellidos:1
        });
        res.json({
            isOk : true,
            request
        })

    } catch (error) {
        console.log(error);
        res.json({
            isOk : false,
        })
    }

    
}

const requestPermissionsAll = async(req,res = response) =>{

    try {
        const request = await Request.find({typeRequest : "Permiso"}).populate('requestAuthor',{
            nombres: 1,
            apellidos:1
        });
        res.json({
            isOk : true,
            request
        })

    } catch (error) {
        console.log(error);
        res.json({
            isOk : false,
        })
    }
}


const createRequest = async(req,res) =>{

    try {
        const request = new Request( req.body );
        await request.save();
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



const revalidateToken = async(req, res= response)=>{
    const uid = req.uid
    const nombres = req.nombres
    const token = await generateJwt( uid, nombres);

    res.json({
        isOk : true,
        token
    })
}

const requestUpdate = async(req, res = response) =>{
    const { _id } = req.body;
    try {
        const request = await Request.findById( _id );

        if(request){

            const newData = {
                ...req.body,
                _id,
            }
            const requestUpdated = await Request.findByIdAndUpdate( _id, newData );
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

const searchPermissionUser = async(req,res = response) =>{
    const { _id } = req.body;

    let request = await Request.find({requestAuthor: _id} );
    try {
        res.status(200).json({
            isOk : true,
            request : request
        })

    } catch (error) {
        console.log(error);
        res.status(200).json({
            isOk : false
        })
    }
    
}


module.exports = {
    requestAll,
    requestHolidaysAll,
    createRequest,
    requestUpdate,
    requestPermissionsAll,
    searchPermissionUser,
    revalidateToken,
}
