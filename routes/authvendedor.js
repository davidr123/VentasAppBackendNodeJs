const {Router} =require('express');
const {login, renewToken} = require('../controllers/authvendedor.controller');
const {check} = require('express-validator');
const { validarJWT } = require('../middelwares/validar-jwt');
const { validarCampos } = require('../middelwares/validar-campos');
const router = Router();

router.post('/',
[
    check('usuario', 'El usuario es obligatorio').not().isEmpty(),
    check('password', 'El password es obligatorio').not().isEmpty(),
    validarCampos
    
],
login
)

router.get('/renew', validarJWT, renewToken)

module.exports= router;