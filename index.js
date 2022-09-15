'use strict'

const Knex = require('./conn/database');
var app = require('./app');
var port = 3909;

app.listen(port,()=> {
    console.log("servidor de los milagros activo en la url: localhost:3909");
});