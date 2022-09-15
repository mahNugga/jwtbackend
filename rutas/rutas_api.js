'use strict'

var express = require('express');
var auth = require("../middleware/auth");

var controlador_ingreso = require('../controladores/control_ingreso');
var controlador_servicio = require('../controladores/controlador_servicio');
var la_reserva = require('../controladores/controlador_reservacion');

//arranque
var ruta = express.Router();

//Peticiones get,post,etc
ruta.post('/ingreso',controlador_ingreso.login);
ruta.post('/nuevo-cliente',controlador_ingreso.nuevoCliente);
ruta.post('/welcome',auth,controlador_ingreso.BievenidaUsuarioMovil);

ruta.get('/consulta-servicio',controlador_servicio.listarServicios);
ruta.post('/reservar',la_reserva.nuevaReservacion);

module.exports = ruta;