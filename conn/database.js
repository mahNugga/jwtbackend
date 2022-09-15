const { Model } =require('objection');
const Knex = require('knex');

//database connection
const knex= Knex({
    client:'mysql',
    connection:{
        host:'localhost',
        user:'administrador', //usando el usuario creado en queries plantilla
        password:'whatsupdanger', //hashear esto
        database:'estudiocarolinatesis', //base de datos en phpmyadmin EstudioCarolinaTesis
        timezone:'UTC',
        dateStrings:true
    },
});

Model.knex(knex);

module.exports = knex;