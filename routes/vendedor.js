
const {Router}= require('express');
const {check} = require('express-validator');
const {validarCampos}= require('../middelwares/validar-campos')
const {getVendedor,crearVendedor}= require('../controllers/vendedor.controllers');
// const { validarJWT } = require('../middelwares/validar-jwt');

const router = Router();


router.get('/' ,getVendedor);

router.post('/',

   [
   check('nombre', 'El nombre es obligatorio').not().isEmpty(),
   check('usuario', 'La cedula es obligatorio').not().isEmpty(),

   validarCampos,
    
  ] ,
  crearVendedor);


  module.exports= router;