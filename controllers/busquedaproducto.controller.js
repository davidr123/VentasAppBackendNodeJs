
const Producto= require('../models/producto')
const {response} = require('express');
const res = require('express/lib/response');

const getBusquedabyProducto=async(req, res= response)=>{

    try{
 
        const busquedaproducto = req.params.busquedaproducto;
        const regexp= new RegExp(busquedaproducto, 'i');
      
    
    
    const [productos]= await Promise.all([
     
        Producto.find({descripcion:regexp}).exec()
 ]);
      
   
        res.json({
            ok:true,
            msg:'getTodo',
            productos
        });
    
    }catch(error){
        res.status(500).json({
            ok:false,
            msg:'Hable con el admin'
        });
    }
    
    
    }


    module.exports ={
        getBusquedabyProducto
    }
    