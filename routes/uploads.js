

const {Router}= require('express');


const expressfileUpload = require('express-fileupload');

const { validarJWT } = require('../middelwares/validar-jwt');
const { fileUpload, MostrarImagen } = require('../controllers/uploads.controller');

const router = Router();

router.use(expressfileUpload());

router.put('/:tipo/:id', validarJWT, fileUpload)


router.get('/:tipo/:foto', MostrarImagen)


module.exports= router;