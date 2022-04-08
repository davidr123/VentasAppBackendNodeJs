const {response} = require('express');
const res = require('express/lib/response');
const { generarJWT } = require('../helpers/jwt');

const Cliente = require('../models/cliente');



const getCliente= async(req, res= response)=>{


    const cliente= await Cliente.find().populate('vendedor');

    res.json({
        ok:true,
        cliente
    });


}





///////////////////




const crearClinte= async( req, res= response)=>{
   
    const uid= req.uid  
   const cliente = new Cliente({
     
       vendedor:uid,
       ...req.body});
    //Este es el Uid del vendedeor y es para que necesito el uid del vendedor y lo extraigo del token y el uid del vendedor esta en la reques
  
try {
        
   const clienteDB= await cliente.save();

   const token =await generarJWT(cliente.id);
   

    res.json({
        ok:true,
        cliente:clienteDB,
        token

    });
    
} catch (error) {
    console.log(error);
    res.status(500).json({
        ok:false,
        msg:'Hable con el adminsitrador'
    })
    
}


// const { nombre, cedula, email, genero, direccion}= req.body;
 
 
//     try {
 
//      const existeCliente = await Cliente.findOne({email});
   
 
 
//      if(existeCliente){
//          return res.status(400).json({
//              ok:false,
//              msg:'El cliente ya esta registrado'
//          });
//      }
//      const uid= req.uid 
//      const cliente= new Cliente({
//        vendedor:uid,
//         ...req.body 

//      } );

//      //Encrpatr cotraseña
//     //  const salt = bcrypt.genSaltSync();
//     //  vendedor.password = bcrypt.hashSync( password, salt );

//      //Guardar Cliente
//      await cliente.save();

//      //JWT 
   
    
    
//         res.json({
//             ok:true,
//             cliente
           
//         });
    
        
//     } catch (error) {
//         console.log(error);
//         res.status(500).json({
//             ok:false,
//             msg: 'Error Inesperado'
//         });
//     }


  
}



const actualizarCliente= async(req, res= response)=>{
    //TODO validatr token y comprobar si es el usuario correcto 
    // const id= req.params.id;
    // const uid= req.uid
    
    // try {

    //     const clienteDB= await Cliente.findById(id);
    //     if(!clienteDB){
    //         return res.status(404).json({
    //             ok:false,
    //             msg:'No existe un cliente con ese id'
    //         });
    //     }
        
    //     const {email, ...campos} = req.body;
    //     if(clienteDB.email!== email){
      
    //       const existeEmail = await Cliente.findOne({email});
    //       if(existeEmail){
    //           return res.status(400).json({
    //               ok: false,
    //               msg: 'Ya existe un cliente con ese email'
    //           });
    //       }
    //     }

    //     //Actualizar

    //     campos.email = email;
    //     const clienteActualizado = await Cliente.findByIdAndUpdate(id, campos,{new:true});

    //     res.json({
    //         ok: true,
    //         clienteActualizado,
    //         uid:req.uid
    //     });
        
    // } catch (error) {
    //     console.log(error);
    //     res.status(500).json({
    //         ok: false,
    //         msg: 'Error Inesperado'
    //     });
        
    // }

    const id = req.params.id;
    const uid= req.uid
        try{
    
            const clienteDB = await Cliente.findById(id);
            if(!clienteDB){
               return res.status(400).json({
                    ok:true,
                    msg:'Cliente no encontrado por id '
                });
            }
           
            const cambiosCliente={
                ...req.body,
                vendedor:uid
            }
    
            const clienteActualizado= await Cliente.findByIdAndUpdate(id, cambiosCliente,{new: true});
    
    
    
            res.json({
                ok: true,
                msg: 'actualizarCliente',
                cliente:clienteActualizado
            });
    
        }catch(err){
            res.status(500).json({
                ok:false,
                msg:'Hable con el administrador'
            })
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
                msg:'Cliente Eliminado',
                uid:req.uid

            });

            
        } catch (error) {
            res.status(500).json({
                ok:false,
                msg: 'Error Inesperado'
            })
            
        }

    }
    
    const obtenerClienteById=async(req, res=response)=>{

        const id= req.params.id;

    try {

        const cliente= await Cliente.findById(id);


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
    







module.exports={
    getCliente,
    crearClinte,
    actualizarCliente,
    borrarCliente,
   
    obtenerClienteById
   
}