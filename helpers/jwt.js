const jwt = require('jsonwebtoken');


const generarJWT=(uid)=>{

    return new Promise((resolve, reject)=>{

        const payload= {
            //aqui se puede ingresar mas informacion  pero que no sea sensible como tarjetas de credito, cedula
            uid,
    
        }
    
        jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn:'12h'
        }, (err, token)=>{
            if(err) {
                console.log(err);
                reject('Error no se pudo generar el JWT');
            }else{
                resolve(token);
            }
        });
    });


}


module.exports ={
    generarJWT
}