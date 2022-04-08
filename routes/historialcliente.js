
const {Router}= require('express');
const {check} = require('express-validator');
const {validarCampos}= require('../middelwares/validar-campos')
const { getCliientebyCedula}= require('../controllers/historialcliente.controller');
const { validarJWT } = require('../middelwares/validar-jwt');
const router = Router();


// router.get('/:id',  ObtenerClientebyId)

router.get('/:cedula', getCliientebyCedula)


module.exports= router;