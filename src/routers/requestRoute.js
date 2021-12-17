const { Router } = require('express');
const { check } = require('express-validator');
const router = Router();
const cors = require("cors");
router.use(cors());
const { requestAll, createRequest,requestHolidaysAll, requestUpdate,requestPermissionsAll, searchPermissionUser } = require('../controllers/requestController');
const { validateFields } = require('../middlewares/errorsExpressValidator');
const { validateJwt } = require('../middlewares/validateJwt');
const { route } = require('express/lib/application');

//user list route
router.get('/',requestAll );

//user create route
router.post(
    '/createRequest',
    [
        check('dateExit', 'La fecha de salida es obligatoria').not().isEmpty(),
        check('dateEntry', 'La fecha de entrada es obligatoria').not().isEmpty(),
        check('requestAuthor', 'El autor de la solicitud es necesario').not().isEmpty(),
        check('typeRequest', 'Tipo de la solicitud es necesario').not().isEmpty(),
        check('response', 'Respuesta actual es necesaria').not().isEmpty(),
        validateFields
    ],
    createRequest );


router.get('/requestHolidaysAll', requestHolidaysAll )


router.get('/requestPermissionsAll', requestPermissionsAll )

router.put(
    '/requestUpdate', requestUpdate)

router.post(
    '/searchPermissionUser',
    [
        check('_id', 'El id es obligatorio').not().isEmpty(),
        validateFields
    ],
    searchPermissionUser)
    

module.exports = router;