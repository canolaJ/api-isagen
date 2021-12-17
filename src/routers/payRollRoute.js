const { Router } = require('express');
const { check } = require('express-validator');
const router = Router();
const cors = require("cors");
router.use(cors());
const { payRollAll, createPayRoll,payRollHolidaysAll, payRollUpdate,payRollPermissionsAll, searchPermissionUser,searchPayRoll } = require('../controllers/payRollController');
const { validateFields } = require('../middlewares/errorsExpressValidator');
const { route } = require('express/lib/application');

//payRollAll list route
router.get('/',payRollAll );

//payRollAll create route
router.post(
    '/createPayRoll',
    [    /* 
        dateGenerated
        holiadysPaid
        permissionPaid
        permissionNotPaid
        payRollAuthor
        userResponseRoll
        totalPayRoll
        */
        check('dateGenerated', 'La fecha de nómina es obligatoria').not().isEmpty(),
        check('holiadysPaid', 'Vacaciones pagas es obligatoria').not().isEmpty(),
        check('permissionPaid', 'El valor Permiso pago necesario').not().isEmpty(),
        check('permissionNotPaid', 'El valor Permiso no pago  es necesario').not().isEmpty(),
        check('payRollAuthor', 'Nombre del empleado de la nómina es obligatorio').not().isEmpty(),
        check('userResponseRoll', 'Nombre del empleado creador de la nómina es obligatorio').not().isEmpty(),
        check('totalPayRoll', 'Total de la nómina es obligatorio').not().isEmpty(),
        validateFields
    ],
    createPayRoll );


router.get('/payRollHolidaysAll', payRollHolidaysAll )


router.get('/payRollPermissionsAll', payRollPermissionsAll )

router.put(
    '/payRollUpdate', payRollUpdate)

router.post(
    '/searchPermissionUser',
    [
        check('_id', 'El id es obligatorio').not().isEmpty(),
        validateFields
    ],
    searchPermissionUser)

    router.post(
        '/searchPayRoll',
        [
            check('dateGenerated', 'El La fecha es obligatoria').not().isEmpty(),
            check('payRollAuthor', 'El código del usuario es obligatorio').not().isEmpty(),
            validateFields
        ],
        searchPayRoll)
module.exports = router;