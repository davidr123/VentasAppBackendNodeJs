

const {Router}= require('express');
const {check} = require('express-validator');
const {validarCampos}= require('../middelwares/validar-campos')
const {getBusquedabyProducto}= require('../controllers/busquedaproducto.controller');
const { validarJWT } = require('../middelwares/validar-jwt');

const router = Router();



router.get('/:busquedaproducto', 

validarJWT,

getBusquedabyProducto)



module.exports= router;