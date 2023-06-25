const express = require ('express');
const cors = require('cors');
const app = express();

//settings

app.set('port', process.env.PORT || 4000);

//middlewares
app.use(cors());
app.use(express.json());

//routes


app.use('/api/users', require('./routes/users'));// se utiliza app.use para que cuando visiten esa direccion, haga uso de otro archivo

app.use('/api/notes', require('./routes/notes'));


module.exports = app;
