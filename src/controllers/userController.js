const { response } = require('express');
const User = require('../models/UserModel');
const bcrypt = require('bcryptjs');
const { generateJwt } = require('../helpers/jwt');

const userAll = async(req,res = response) =>{
    const users = await User.find({},{password:0});
    res.json({
        users
    })
}

const userCreate = async(req,res) =>{
    const { username, password } = req.body;
    try {
        let user = await User.findOne({ username });
        if(!user){
            const user = new User( req.body );
            const salt = bcrypt.genSaltSync();
            user.password = bcrypt.hashSync( password, salt);
            await user.save();
            res.status(200).json({
                isOk : true
            })
        }else{
            res.json({
                isOk : false
            })
        }
    } catch (error) {
        console.log(error);
    }
}

const userLogin = async(req,res) =>{
    const { username, password } = req.body;
    try {
        let user = await User.findOne({ username });
        if(user){
            const validatePassword = bcrypt.compareSync( password, user.password);
            if(validatePassword){
                const token = await generateJwt( user.id, user.nombres);

                res.status(200).json({
                    isOk : true,
                    user :{
                        id:user._id,
                        nombres : user.nombres,
                        apellidos : user.apellidos,
                        cc : user.cc,
                        phone : user.phone,
                        username : user.username,
                        sexo : user.sexo,
                        post : user.post,
                        salary : user.salary,
                        dateEntry : user.dateEntry,
                        token
                    },
                })
            }else{
                res.json({
                    isOk : false
                })
            }
        }else{
            res.json({
                isOk : false
            })
        }
    } catch (error) {
        console.log(error);
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

const userUpdate = async(req, res = response) =>{
    const { _id, password } = req.body;
    try {
        const user = await User.findById( _id );
        

        if(user){

            if(password){
                const validatePassword = bcrypt.compareSync( password, user.password);
                if(!validatePassword){
                    const salt = bcrypt.genSaltSync();
                    const newPassword = bcrypt.hashSync( password, salt);
                    req.body.password = newPassword;
                }
            }
            if(!password){
                req.body.password = user.password;
            }

            const newData = {
                ...req.body,
                _id,
            }
            const userUpdated = await User.findByIdAndUpdate( _id, newData );
            res.json({
               isOk : true,
               msg : "Usuario activado con éxito!"
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

const searchUser = async(req,res = response) =>{
    const { _id } = req.body;

    let user = await User.findById( _id );
    try {
        res.status(200).json({
            isOk : true,
            user :{
                id:user._id,
                nombres : user.nombres,
                apellidos : user.apellidos,
                cc : user.cc,
                phone : user.phone,
                username : user.username,
                sexo : user.sexo,
                post : user.post,
                salary : user.salary,
                dateEntry : user.dateEntry
            },
        })

    } catch (error) {
        console.log(error);
        res.status(200).json({
            isOk : false
        })
    }
    
}


module.exports = {
    userAll,
    userCreate,
    userLogin,
    revalidateToken,
    userUpdate,
    searchUser
}
