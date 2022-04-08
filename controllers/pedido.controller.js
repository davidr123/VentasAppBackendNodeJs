
const res = require('express/lib/response');
const { generarJWT } = require('../helpers/jwt');

const Pedido = require('../models/pedido');

const generarPedido =async (req, res, next) => {
    //asumiré que el id del producto a añadir viene en el cuerpo (body) de la solicitud
    //además el id del usuario viene en un campo llamado profile en el request
    const uid= req.uid 
    const producto= req.body.producto 
    const cliente= req.body.cliente 
    const pedido = new Pedido({
        producto,
        cliente,
        vendedor:uid,
        ...req.body});
     //Este es el Uid del vendedeor y es para que necesito el uid del vendedor y lo extraigo del token y el uid del vendedor esta en la reques
   
 try {
         
    const pedidoDB= await pedido.save();
    
 
     res.json({
         ok:true,
         pedido:pedidoDB
 
     });
     
 } catch (error) {
     console.log(error);
     res.status(500).json({
         ok:false,
         msg:'Hable con el adminsitrador'
     })
     
 }
 

}


const getPedido=async(req, res)=>{

    const pedidos= await Pedido.find().populate('cliente').populate('producto')

    res.json({
        ok:true,
        pedidos
    });


}

module.exports = {
     generarPedido,
     getPedido
     }