const {Schema, model} = require('mongoose');

const VendedorSchema = Schema({

    nombre:{
        type:String,
        

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
       
        unique:true,
    },

    email:{
        type:String,
     
        unique:true,
        

    },


    genero:{
        type:String,
        
    },

    direccion:{
        type:String,
        
    },

    img:{
        type:String,
    }


});

VendedorSchema.method('toJSON', function(){
   const {__v, _id, password, ...object} =this.toObject();
    object.uid= _id;
   return object;
})
module.exports =model('Vendedor', VendedorSchema);
