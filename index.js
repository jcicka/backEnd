const express = require('express');
const rutas = require('./routes/auth')
const cors = require('cors')
const app = express();
const path = require('path');

app.use(cors({
    origin: 'http://127.0.0.1:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization', 'x-access-token']
}));

app.use(express.json())

app.use(express.static(path.join(__dirname, './public')));

app.use('/auth', rutas)
//app.use(`/auth`, authRoutes);

const PORT = process.env.PORT || 3000;
//app.set('port', process.env.PORT || 3000);

app.listen(PORT, () =>{
    console.log(`server en puerto ${PORT}`);
  
})
