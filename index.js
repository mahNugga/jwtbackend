'use strict'

const Knex = require('./conn/database');
var app = require('./app');
var port = 3700;

app.listen(port,()=> {
    console.log("servidor tesis-Centro-Belleza-Carolina-A activo en la url: localhost:3700");
});