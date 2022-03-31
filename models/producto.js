const {Schema, model} = require('mongoose');

const ProductoSchema = Schema({

    descripcion:{
        type:String,
        required:true,


    },

    codigo:{
        type:String,
        required:true,
        unique:true,
    },

    cantidad:{
        type:Number,
        required:true,
    },

    img:{
        type:String,
    },

    precio:{
        type:Number,
        required:true,
    },

    vendedor:{
        type:Schema.Types.ObjectId,
        ref:'Vendedor'

    },

    cliente:{
        required:true,
        type:Schema.Types.ObjectId,
        ref:'Cliente'

    }


   


}, {collection:'productos'});

ProductoSchema.method('toJSON', function(){
   const {__v, ...object} =this.toObject();
    
   return object;
})
module.exports =model('Producto', ProductoSchema);
