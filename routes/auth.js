//rutas /Auth, host +/api/auth

const { Router } = require('express');
const { check } = require('express-validator');
const { fieldValidator } = require('../middlewares/fieldValidator');
const { createUser, loginUser, renewToken, } = require('../controllers/auth');
const { jwtValidator } = require('../middlewares/jwtValidator');
const router = Router();



router.post(
    '/new',
    [
        check('name', 'El nombre es obligatorio').not().isEmpty(),
        check('email', 'El email es obligatorio').isEmail(),
        check('password', 'El password debe de tener al menos 6 caracteres').isLength({ min: 6 }),
        fieldValidator
    ],
    createUser
    );

router.post(
    '/',

    [
        check('email', 'El email es obligatorio').isEmail(),
        check('password', 'El password debe de tener al menos 6 caracteres').isLength({ min: 6 }),
        fieldValidator
    ]
    , loginUser
    );

router.get('/renew',jwtValidator, renewToken);




module.exports = router;