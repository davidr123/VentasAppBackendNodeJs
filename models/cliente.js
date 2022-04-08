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

    vendedor:{
        
        type:Schema.Types.ObjectId,
        ref:'Vendedor'
    },

    // producto:[{
    //     id: {
    //         type:Schema.Types.ObjectId,
    //         ref: 'productos',
    //         required: 'Campo id producto es requerido.'
    //     },
      
    // }]

  


});

ClienteSchema.method('toJSON', function(){
   const {__v, ...object} =this.toObject();
   
   return object;
})
module.exports =model('Cliente', ClienteSchema);
