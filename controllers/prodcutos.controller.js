const {response}= require('express');
const Producto = require('../models/producto');



const getProductos =async (req, res= response)=>{

    const desde = Number(req.query.desde) || 0;


try {

  
   

 const[productos, total]=  await Promise.all([
        Producto
        .find().populate('cliente', 'cedula nombre')
        .skip(desde),

        Producto.count()

    ]);

    res.json({
        ok:true,
        productos,
        total
    })
    
} catch (error) {
    console.log(error);
    res.status(500).json({
        ok:false,
        msg:'Hable con el administrador'
    })
    
}
}


const CrearProductos =async(req, res= response)=>{

    const uid= req.uid;
    const producto= new Producto({
        cliente: uid,
        ...req.body});

  const productoDB=  await producto.save();

    try {
        res.json({
            ok:true,
            productoDB
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:'Hable con el administrador'
        })
        
    }
    }
    

    const ActualizarProductos =(req, res= response)=>{

        try {
            res.json({
                ok:true,
                msg:'Producto Actualizado'
            })
            
        } catch (error) {
            console.log(error);
            res.status(500).json({
                ok:false,
                msg:'Hable con el administrador'
            })
            
        }
        }

    const BorrarProductos =async(req, res= response)=>{

        const uid= req.params.id;

            try {
                const productoDB= await Producto.findById(uid);
                if(!productoDB){
                    return res.status(404).json({
                        ok:false,
                        msg:'No existe un producto con ese id'
                    });
                }
                
                await Producto.findByIdAndDelete(uid);
    
                
                res.json({
                    ok:true,
                    msg:'Producto Eliminado',
                    uid:req.uid
    
                });
    
                
            } catch (error) {
                console.log(error);
                res.status(500).json({
                    ok:false,
                    msg:'Hable con el administrador'
                })
                
            }
            }
            
        


module.exports ={
    getProductos,
    CrearProductos,
    ActualizarProductos,
    BorrarProductos
}