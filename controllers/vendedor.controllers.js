const {response} = require('express');
const res = require('express/lib/response');
const bcrypt= require('bcryptjs');

const Vendedor = require('../models/vendedor');
const Cliente = require('../models/cliente');
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


 const getVendedorbyId=async(req, res=response)=>{

    const id= req.params.id;

    try {

        const vendedor= await Vendedor.findById(id)


    res.json({
        ok:true,
        vendedor
    });

        
    } catch (error) {
          console.log(error);
        res.json({
            ok:false,
            msg:'Hable con el administrador'
        });
    
        
    }

    


}







 


module.exports={
    getVendedor,
    crearVendedor,
    getVendedorbyId
}