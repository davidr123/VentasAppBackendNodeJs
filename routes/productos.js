
const {Router}= require('express');
const {check} = require('express-validator');
const {validarCampos}= require('../middelwares/validar-campos')

 const { validarJWT } = require('../middelwares/validar-jwt');

 const {getProductos, CrearProductos, ActualizarProductos, BorrarProductos}= require('../controllers/prodcutos.controller')

const router = Router();


router.get('/' ,getProductos);

router.post('/',
[
    validarJWT,
check('descripcion', 'La descripcion del producto debe ser ingresado').not().isEmpty(),
check('codigo', 'EL codigo del producto debe ser ingresado').not().isEmpty(),
check('cantidad', 'La cantidad del producto debe ser ingresado').not().isEmpty(),
check('precio', 'El precio del producto debe ser ingresado').not().isEmpty(),
validarCampos
],



  CrearProductos);


  router.put('/:id' ,ActualizarProductos);


  router.delete('/:id' ,BorrarProductos);


  module.exports= router;