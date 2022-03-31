const {Schema, model} = require('mongoose');

const VendedorSchema = Schema({

    nombre:{
        type:String,
        required:true,


    },

    password:{
        type:String,
        required:true,
        unique:true,
    },

    usuario:{
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
    }


});

VendedorSchema.method('toJSON', function(){
   const {__v, _id, password, ...object} =this.toObject();
    object.uid= _id;
   return object;
})
module.exports =model('Vendedor', VendedorSchema);
