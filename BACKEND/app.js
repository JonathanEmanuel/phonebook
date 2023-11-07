const express = require('express');
const dataBase = require('./dataBase');
const userController = require('./controllers/userController.js');
const phonebookController = require('./controllers/phonebookController.js');

const app = express();
const port = 3000;

app.use( express.json());

// Conecta con l aDB
dataBase.on('error', ()=> {
    console.error('Error de conexión con MongoDB')
})

dataBase.once('open', ()=>{
    console.log('Conexión correcta con MongoDB')
})

app.get('/', (req,res) => {
    res.send('Phonebook API');
})

// Rutas
app.post('/api/user', userController.crear);
app.post('/api/auth', userController.autenticar);

app.post('/api/phonebook', phonebookController.crear);

// Inicio el servidor
app.listen( port, () => {
    console.log('Servidor en el puerto ', port);
})