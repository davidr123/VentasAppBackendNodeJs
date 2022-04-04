const {response} = require('express');
const res = require('express/lib/response');
const bcrypt= require('bcryptjs');

const Vendedor = require('../models/vendedor');
const { generarJWT } = require('../helpers/jwt');


const getVendedor= async(req, res)=>{

    const vendedor = await Vendedor.find();
    res.json({
        ok:true,
        vendedor,
        //uid:req.uid
    });

};

const crearVendedor= async( req, res= response)=>{
      
    const { password, usuario}= req.body;
 
 
    try {
 
     const existeVendedor = await Vendedor.findOne({usuario});
   
 
 
     if(existeVendedor){
         return res.status(400).json({
             ok:false,
             msg:'El vendedor ya esta registrado'
         });
     }
 
     const vendedor= new Vendedor( req.body );

     //Encrpatr cotraseña
     const salt = bcrypt.genSaltSync();
     vendedor.password = bcrypt.hashSync( password, salt );

     //Guardar Cliente
     await vendedor.save();

     //JWT 
     const token =await generarJWT(vendedor.id);
    
    
        res.json({
            ok:true,
            vendedor,
            token
        });
    
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg: 'Error Inesperado'
        });
    }
 
 
 }
 


module.exports={
    getVendedor,
    crearVendedor
}