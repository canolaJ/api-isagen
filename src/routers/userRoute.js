const { Router } = require('express');
const { check } = require('express-validator');
const router = Router();
const cors = require("cors");
router.use(cors());
const { userAll, userCreate, userLogin, revalidateToken, userUpdate, searchUser } = require('../controllers/userController');
const { validateFields } = require('../middlewares/errorsExpressValidator');
const { validateJwt } = require('../middlewares/validateJwt');
const { route } = require('express/lib/application');

//user list route
router.get('/',userAll );

//user create route
router.post(
    '/create',
    [
        check('nombres', 'El nombre es obligatorio').not().isEmpty(),
        check('apellidos', 'El apellido es obligatorio').not().isEmpty(),
        check('cc', 'la cédula es obligatorio').not().isEmpty(),
        check('phone', 'El teléfono es obligatorio').not().isEmpty(),
        check('username', 'El usuario es obligatorio').not().isEmpty(),
        check('password', 'La contraseña es obligatoria').not().isEmpty(),
        check('dateEntry', 'La fecha de entrada es obligatoria').not().isEmpty(),
        check('post', 'El cargo es obligatorio').not().isEmpty(),
        check('sexo', 'el sexo es obligatorio').not().isEmpty(),
        check('salary', 'el salario es obligatorio').not().isEmpty(),
        check('estado', 'el estado es obligatorio').not().isEmpty(),
        validateFields
    ],
    userCreate );

//user login route
router.post(
    '/login',
    [
        check('username', 'El usuario es obligatorio').not().isEmpty(),
        check('password', 'La contraseña es obligatoria').not().isEmpty(),
        validateFields
    ],
    userLogin)

router.get('/validateToken', validateJwt ,revalidateToken )

router.put(
    '/userUpdate', userUpdate)

router.post(
    '/searchUser',
    [
        check('_id', 'El id es obligatorio').not().isEmpty(),
        validateFields
    ],
    searchUser)
    

module.exports = router;