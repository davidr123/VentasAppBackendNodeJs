const {response} = require('express');
const res = require('express/lib/response');

const Cliente = require('../models/cliente');



const getCliente= async(req, res)=>{

    const cliente = await Cliente.find({}, 'nombre cedula email');
    res.json({
        ok:true,
        cliente,
        uid:req.uid
    });

};

const crearClinte= async( req, res= response)=>{
      
   const {nombre, cedula, email, genero, direccion}= req.body;


   try {

    const exiteEmail = await Cliente.findOne({email});
  


    if(exiteEmail){
        return res.status(400).json({
            ok:false,
            msg:'El correo ya esta registrado'
        });
    }

    const cliente= new Cliente( req.body );

    await cliente.save();
   
   
       res.json({
           ok:true,
           cliente
       });
   
       
   } catch (error) {
       console.log(error);
       res.status(500).json({
           ok:false,
           msg: 'Error Inesperado'
       });
   }


}



const actualizarCliente= async(req, res= response)=>{
    //TODO validatr token y comprobar si es el usuario correcto 
    const uid= req.params.id;
    
    try {

        const clienteDB= await Cliente.findById(uid);
        if(!clienteDB){
            return res.status(404).json({
                ok:false,
                msg:'No existe un cliente con ese id'
            });
        }
        
        const {email, ...campos} = req.body;
        if(clienteDB.email!== email){
      
          const existeEmail = await Cliente.findOne({email});
          if(existeEmail){
              return res.status(400).json({
                  ok: false,
                  msg: 'Ya existe un cliente con ese email'
              });
          }
        }

        //Actualizar

        campos.email = email;
        const clienteActualizado = await Cliente.findByIdAndUpdate(uid, campos,{new:true});

        res.json({
            ok: true,
            clienteActualizado
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error Inesperado'
        });
        
    }

    }


    const borrarCliente=async(req, res= response)=>{

        const uid= req.params.id;

        try {

            const clienteDB= await Cliente.findById(uid);
            if(!clienteDB){
                return res.status(404).json({
                    ok:false,
                    msg:'No existe un cliente con ese id'
                });
            }
            
            await Cliente.findByIdAndDelete(uid);

            
            res.json({
                ok:true,
                msg:'Cliente Eliminado'

            });

            
        } catch (error) {
            res.status(500).json({
                ok:false,
                msg: 'Error Inesperado'
            })
            
        }

    }
    



module.exports={
    getCliente,
    crearClinte,
    actualizarCliente,
    borrarCliente
}