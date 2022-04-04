
const {Router}= require('express');
const {check} = require('express-validator');
const {validarCampos}= require('../middelwares/validar-campos')
const {getVendedor,crearVendedor}= require('../controllers/vendedor.controllers');
// const { validarJWT } = require('../middelwares/validar-jwt');

const router = Router();


router.get('/' ,getVendedor);

router.post('/',

   [
   check('usuario', 'El usuario es obligatorio').not().isEmpty(),
   check('password', 'El password es obligatorio').not().isEmpty(),

   validarCampos,
    
  ] ,
  crearVendedor);


  module.exports= router;