// all the methods of our application isagen
import { ObjectId } from "mongodb";
import { mongoDBClient } from '../../db/client';

//?return data user for create login in application
export const login = async (dataUser) => {
    const { username, password, estado} = dataUser;
    return await mongoDBClient.db('isagen').collection('users').findOne({
        'username' : username,
        'password' : password ,
        'estado' : estado
    });
}

//? data of  user for create one user
export const createUser = async (newUser) => {
    const { nombres, apellidos, cc, phone, username, password,  dateEntry, post, sexo, salary, estado} = newUser;
    return await mongoDBClient.db('isagen').collection('users').inserOne({
        'nombres' : nombres,
        'apellidos' : apellidos,
        'cc' : cc,
        'phone' : phone,
        'username' : username,
        'password' : password ,
        'dateEntry' : dateEntry ,
        'post' : post,
        'sexo': sexo,
        'salary' : salary,
        'estado' : estado
    });
}

//? update data user for update in db
export const updateUser = async (id,updateUser) => {
    const id = new ObjectId(id);
    const { nombres, apellidos, cc, phone, username, password,  dateEntry, post, sexo, salary, estado} = updateUser;
    return await mongoDBClient.db('isagen').collection('users').updateOne(
        { id : id },
        { $set : {
            'nombres' : nombres,
            'apellidos' : apellidos,
            'cc' : cc,
            'phone' : phone,
            'username' : username,
            'password' : password ,
            'dateEntry' : dateEntry ,
            'post' : post,
            'sexo': sexo,
            'salary' : salary,
            'estado' : estado

        }}
    );
}

//? activate a user in application
export const activeUser = async (id) => {
    const id = new ObjectId(id);
    return await mongoDBClient.db('isagen').collection('users').updateOne(
        { id : id },
        { $set : {
            'estado' : 'activo'
        }}
    );
}

//? inactivate a user in application
export const inactiveUser = async (id) => {
    const id = new ObjectId(id);
    return await mongoDBClient.db('isagen').collection('users').updateOne(
        { id : id },
        { $set : {
            'estado' : 'inactivo'
        }}
    );
}


//?return all users
export const getUsers = async () => {
    return await mongoDBClient.db('isagen').collection('users').find();
}