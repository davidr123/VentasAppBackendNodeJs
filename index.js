const express= require('express');
require('dotenv').config();
const cors = require('cors')
const {dbConnection} = require('./database/config');

const app= express();

//Configurar cors
app.use(cors())
//Base de datos
dbConnection();
//MONGO CREDENCIALES
//clave:ventas_back
//user:ventas_dev
//mongodb+srv://ventas_dev:ventas_back@cluster0.eyerx.mongodb.net/VentasApp


//Rutas
app.get( '/', (req, res)=>{
    res.json({
        ok:true,
        msg: 'Hola mundo'
    })

});

app.listen(process.env.PORT, ()=>{
    console.log('Servidor corrriendo en' + process.env.PORT);
});