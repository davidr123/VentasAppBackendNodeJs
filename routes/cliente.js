
const {Router}= require('express');
const {check} = require('express-validator');
const {validarCampos}= require('../middelwares/validar-campos')
const {getCliente, crearClinte, actualizarCliente, borrarCliente, obtenerClienteById}= require('../controllers/clientes.controller');
const { validarJWT } = require('../middelwares/validar-jwt');
const router = Router();

router.get('/', validarJWT ,getCliente);




router.post('/', 

   [
    validarJWT,
   check('nombre', 'El nombre es obligatorio').not().isEmpty(),
   check('cedula', 'La cedula es obligatorio').not().isEmpty(),
   check('email','El email es obligatorio').isEmail(),
   check('genero', 'El genero es obligatorio').not().isEmpty(),
   check('direccion', 'La direccion es obligatorio').not().isEmpty(),
    // check('producto', 'el campo id de producto es invalido').isMongoId(),
   validarCampos,
    
  ] ,
    crearClinte);


    // router.get('/:cedula', validarJWT , getCliientebyCedula);


    router.put('/:id',
    [
        
        // check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        // check('cedula', 'La cedula es obligatorio').not().isEmpty(),
        // check('email','El email es obligatorio').isEmail(),
        // check('genero', 'El genero es obligatorio').not().isEmpty(),
        // check('direccion', 'La direccion es obligatorio').not().isEmpty(),
     
        // validarCampos
    ],
    actualizarCliente);


    router.delete('/:id', 
    validarJWT,

     borrarCliente);


    //  router.get('/:id', validarJWT ,ObtenerClientebyId);

    router.get('/:id', validarJWT, obtenerClienteById)

module.exports= router;