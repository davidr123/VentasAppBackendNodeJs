const {response} = require('express');
const res = require('express/lib/response');
const { generarJWT } = require('../helpers/jwt');

const Cliente = require('../models/cliente');


 const ObtenerClientebyId= async(req, res= response)=>{

        const id = req.params.id;
    
        try {
    
            const cliente= await Cliente.findById(id)
     
    
        res.json({
            ok:true,
            cliente
           
        });
    
            
        } catch (error) {
              console.log(error);
            res.json({
                ok:false,
                msg:'Hable con el administrador'
            });
        
            
        }
      
    
    }


    const getCliientebyCedula= async(req, res)=>{

        const cedula = req.params.cedula;
    
        try {
    
            const [cliente, total]= await Promise.all([
                Cliente.find({cedula}),
                Cliente.countDocuments()
            ]);
    
            res.json({
                ok:true,
                cliente,
               
                
               
    
            });
            
        } catch (error) {
    
            res.json({
                ok:false,
                msg:'Hable con el administrador'
            });
            
        }
      
    
    };




   module.exports={
   
        ObtenerClientebyId,
        getCliientebyCedula
       
    }