
const {Router}= require('express');
const {check} = require('express-validator');
const {validarCampos}= require('../middelwares/validar-campos')

 const { validarJWT } = require('../middelwares/validar-jwt');

 const {generarPedido, getPedido}= require('../controllers/pedido.controller')

const router = Router();

router.get('/', getPedido)


router.post('/',
[
    validarJWT,

],



generarPedido);


 



  // router.get('/:nombre' ,ProductosbyNombre);


  module.exports= router;