const fs = require('fs');
const Vendedor = require('../models/vendedor');

const Producto = require('../models/producto');

const borrarImagen = (path)=>{

    if(fs.existsSync(path)){
        fs.unlinkSync(path);
    }

}

const actualizarImagen =async(tipo, id, nombreArchivo)=>{

    let pathViejo='';
    switch(tipo){

       
        case 'vendedores':

  const   vendedor= await Vendedor.findById(id);

             if(!vendedor){
                 console.log('no es vendedor')
                return false;
            }

             pathViejo=`./uploads/vendedores/${vendedor.img}`;
             console.log(pathViejo);
         borrarImagen(pathViejo);
          
            vendedor.img=nombreArchivo;
           await vendedor.save();
            return true;
             break;

             case 'productos':
            
               const producto= await Producto.findById(id);
                if(!producto){
                    console.log('no es un producto')
                    return false;
                }
    
                 pathViejo= `./uploads/productos/${producto.img}`;

                borrarImagen(pathViejo);
              
                producto.img=nombreArchivo;
                await producto.save();
                return true;
                 break;

             
                     
           
    }
}



module.exports={
    actualizarImagen
}