const {Schema, model} = require('mongoose');

const PedidoSchema = Schema({

    cliente:{
        type:Schema.Types.ObjectId,
        ref:'Cliente'



    },

    producto:{
        type:Schema.Types.ObjectId,
        ref:'Producto'
    },

   


   


});

PedidoSchema.method('toJSON', function(){
   const {__v, ...object} =this.toObject();
    
   return object;
})
module.exports =model('Pedido', PedidoSchema);
