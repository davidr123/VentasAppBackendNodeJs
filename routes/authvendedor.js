const {Router} =require('express');
const {login} = require('../controllers/authvendedor.controller');
const {check} = require('express-validator');
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

module.exports= router;