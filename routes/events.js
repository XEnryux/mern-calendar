//rutas /api/events, host +/api/events

const { Router } = require('express');
const { check } = require('express-validator');

const { isDate } = require('../helpers/isDate');
const { fieldValidator } = require('../middlewares/fieldValidator');
const { jwtValidator } = require('../middlewares/jwtValidator');
const { getEvents, createEvent, refreshEvent, deleteEvent } = require('../controllers/events');


const router = Router();


router.use(jwtValidator);


router.get('/', getEvents);

router.post('/',
[
    check('title', "el titulo es requerido").not().isEmpty(),
    check('start', "la fecha de inicio es obligatoria").custom(isDate),
    check('end', "la fecha de finalizacion es obligatoria").custom(isDate),
    fieldValidator
] , createEvent);

router.put('/:id',
[
    check('title', "el titulo es requerido").not().isEmpty(),
    check('start', "la fecha de inicio es obligatoria").custom(isDate),
    check('end', "la fecha de finalizacion es obligatoria").custom(isDate),
    fieldValidator
] , refreshEvent);

router.delete('/:id' , deleteEvent);

module.exports = router;