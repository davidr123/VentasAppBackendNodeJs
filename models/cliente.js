const {Schema, model} = require('mongoose');

const ClienteSchema = Schema({

    nombre:{
        type:String,
        required:true,


    },

    cedula:{
        type:String,
        required:true,
        unique:true,
    },

    email:{
        type:String,
        required:true,
        unique:true,
        

    },


    genero:{
        type:String,
        required:true,
    },

    direccion:{
        type:String,
        required:true,
    },

    producto:{
        required:true,
        type:Schema.Types.ObjectId,
        ref:'Producto'
    }

  


});

ClienteSchema.method('toJSON', function(){
   const {__v, _id, ...object} =this.toObject();
    object.uid= _id;
   return object;
})
module.exports =model('Cliente', ClienteSchema);
