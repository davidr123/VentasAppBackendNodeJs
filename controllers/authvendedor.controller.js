const bcrypt = require('bcryptjs');
const {response} = require('express');
const { generarJWT } = require('../helpers/jwt');
const Vendedor = require('../models/vendedor');

const login=async(req, res= response)=>{

    const {usuario, password} = req.body;

    try {

        //verificar Usuario
        const vendedorDB = await Vendedor.findOne({usuario});

        if(!vendedorDB){
            return res.status(404).json({
                ok:false,
                msg:'Usuario no válido'
            })
        }

        //Verificar COntraseña

        const validPassword = bcrypt.compareSync(password, vendedorDB.password);
        if(!validPassword){
            return res.status(400).json({
                ok:false,
                msg:'Contraseña no Valida'
            });
        }

                 //Generar JWT

                 const token =await generarJWT(vendedorDB.id);





        res.json({
            ok: true,
            token
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:'Hable con el administrador'
        });
    }

}


module.exports ={
    login
}