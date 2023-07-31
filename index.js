const express =require('express');
require('dotenv').config();
const cors = require('cors')
const { dbConnection } = require('./DB/config');



const app = express();



//base de datos
dbConnection();

app.use(cors());
//directorio publico
app.use( express.static('public') );


//lectura y parseo del body
app.use(express.json());

//rutas
app.use('/api/auth',require('./routes/auth'));

app.use('/api/events',require('./routes/events'));

//escuchar peticiones
app.listen(process.env.PORT,()=>{
    console.log(`servidor corriendo en puerto ${ process.env.PORT }`);

});

console.log(1);