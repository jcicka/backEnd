const express = require('express');
const rutas = require('./routes/authRoutes')

const app = express();

app.use(express.json())

app.use('/auth', rutas)

app.set('port', process.env.PORT || 3000);

app.listen(app.get('port'), () =>{
    console.log('server en puerto', app.get('port'));
  
  })
