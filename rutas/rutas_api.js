'use strict'

var express = require('express');
var auth = require("../middleware/auth");

var controlador_ingreso = require('../controladores/control_ingreso');
var controlador_servicio = require('../controladores/controlador_servicio');
var la_reserva = require('../controladores/controlador_reservacion');
var control_horario = require('../controladores/control_horario');
//arranque
var ruta = express.Router();

//Peticiones get,post,etc
ruta.post('/ingreso',controlador_ingreso.login);
ruta.post('/nuevo-cliente',controlador_ingreso.nuevoCliente);
ruta.post('/welcome',auth,controlador_ingreso.BievenidaUsuarioMovil);

ruta.get('/consulta-servicio',controlador_servicio.listarServicios);
ruta.post('/reservar',la_reserva.nuevaReservacion);
ruta.get('/consulta-reservacioncliente2',la_reserva.muestraClientere2);


ruta.get('/verifica-fechas',control_horario.devolverFechas);

module.exports = ruta;