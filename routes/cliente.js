
const {Router}= require('express');
const {check} = require('express-validator');
const {validarCampos}= require('../middelwares/validar-campos')
const {getCliente, crearClinte, actualizarCliente, borrarCliente}= require('../controllers/clientes.controller');
const { validarJWT } = require('../middelwares/validar-jwt');
const router = Router();

router.get('/', validarJWT ,getCliente);

router.post('/', 

   [
   check('nombre', 'El nombre es obligatorio').not().isEmpty(),
   check('cedula', 'La cedula es obligatorio').not().isEmpty(),
   check('email','El email es obligatorio').isEmail(),
   check('genero', 'El genero es obligatorio').not().isEmpty(),
   check('direccion', 'La direccion es obligatorio').not().isEmpty(),
   validarCampos,
    
  ] ,
    crearClinte);


    router.put('/:id',
    [
      validarJWT,
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('cedula', 'La cedula es obligatorio').not().isEmpty(),
        check('email','El email es obligatorio').isEmail(),
        check('genero', 'El genero es obligatorio').not().isEmpty(),
        check('direccion', 'La direccion es obligatorio').not().isEmpty(),
     
        validarCampos
    ],
    actualizarCliente);


    router.delete('/:id', 
    validarJWT,

     borrarCliente);

module.exports= router;