const express= require('express');
require('dotenv').config();
const path = require('path');
const cors = require('cors')
const {dbConnection} = require('./database/config');

const app= express();

//Configurar cors
app.use(cors())


//Lectura y paraseo del body

app.use(express.json());
//Base de datos
dbConnection();
//MONGO CREDENCIALES
//clave:ventas_back
//user:ventas_dev
//mongodb+srv://ventas_dev:ventas_back@cluster0.eyerx.mongodb.net/VentasApp


//Rutas
app.use('/api/cliente', require('./routes/cliente'));
app.use('/api/uploads', require('./routes/uploads'));


//Rutas Vendedor
app.use('/api/vendedor', require('./routes/vendedor'));
app.use('/api/login', require('./routes/authvendedor'));


//Productos

app.use('/api/productos', require('./routes/productos'));
 app.use('/api/busqueda', require('./routes/busquedaproducto'));

 //HISTORIAL CLIENTE
 app.use('/api/historialcliente', require('./routes/historialcliente'));

 //PEDIDO
 app.use('/api/pedido', require('./routes/pedido'));


 //Ultimo cambio
app.get('*', (req, res)=>{
    res.sendFile(path.resolve(__dirname, 'public/index.html'));
});



app.listen(process.env.PORT, ()=>{
    console.log('Servidor corrriendo en' + process.env.PORT);
});