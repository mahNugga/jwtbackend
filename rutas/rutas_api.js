'use strict'

var express = require('express');
var auth = require("../middleware/auth");

//LOGICA DE PROGRAMACION (CONTROLADORES) PARA ACCIONES DENTRO DE LA PLATAFORMA

var controlador_empleado = require('../controladores/control_empleado');
var controlador_insumo = require('../controladores/control_insumo');
var controlador_cliente = require('../controladores/control_cliente');
var controlador_ingreso = require('../controladores/control_ingreso');
var controlador_servicio = require('../controladores/controlador_servicio');
var la_reserva = require('../controladores/controlador_reservacion');
var control_horario = require('../controladores/control_horario');
//arranque
var ruta = express.Router();

//Peticiones get,post,etc
//PETICIONES DEDICADAS A REGISTROS EMPLEADO
ruta.get('/home',controlador_empleado.home);
//ruta.post('/test',controlador_empleado.test);
ruta.post('/nuevo-empleado',controlador_empleado.nuevoEmpleado);
ruta.get('/consulta-empleado',controlador_empleado.seleccionaEmpleado);
ruta.put('/edita-empleado',controlador_empleado.actualizaEmpleado);
ruta.put('/elimina-empleado',controlador_empleado.softBorradoEmpleado);
ruta.get('/lista-empleado',controlador_empleado.listarEmpleados);
ruta.get('/lista-empleado-gen',controlador_empleado.listaSinAdmin);
ruta.get('/empleado-info',controlador_empleado.credencialesCabEmpleado);
ruta.get('/mantenimiento-empleado',controlador_empleado.sudolistarEmpleados);
ruta.delete('/mantenimiento-eliminaempleado',controlador_empleado.alohaEmpleado);
//PETICIONES DEDICADAS AL INGRESO DE LA PLATAFORMA
ruta.post('/ingreso',controlador_ingreso.login);
ruta.get('/ingreso-ruta',controlador_ingreso.loginweb);
ruta.post('/nuevo-cliente',controlador_ingreso.nuevoCliente);
ruta.post('/welcome',auth,controlador_ingreso.BievenidaUsuarioMovil);
//PETICIONES DEDICADAS AL REGISTRO SERVICIO
ruta.get('/consulta-servicio',controlador_servicio.listarServicios);
ruta.post('/nuevo-servicio',controlador_servicio.nuevoServicio);
ruta.put('/edita-servicio',controlador_servicio.editaServicio);
//PETICIONES DEDICADAS AL REGISTRO INSUMOS
ruta.post('/nuevo-insumo',controlador_insumo.nuevoInsumo);
ruta.get('/consulta-insumo',controlador_insumo.listarInsumos);
//PETICIONES DEDICADAS AL REGISTRO HORARIOS
ruta.get('/verifica-fechas',control_horario.devolverFechas);
ruta.post('/nuevo-horario',control_horario.nuevoHorario);
ruta.get('/consulta-horarioempleado',control_horario.consultaHorario);
ruta.put('/elimina-horario',control_horario.softBorraHorario);
ruta.get('/consulta-horarioadmin',control_horario.consultaHorarioAdmin);
ruta.put('/edita-horarioexterno',control_horario.actualizaHorario);
//PRETICIONES DEDICADAS AL REGISTRO RESERVACION
ruta.post('/reservar',la_reserva.nuevaReservacion);
ruta.get('/consulta-reservacioncliente2',la_reserva.muestraClientere2);
ruta.put('/eliminar-reservacli',la_reserva.eliminaReservaCli);
ruta.get('/consulta-reservacioncliente',la_reserva.muestraClientere);
ruta.get('/consulta-reservacioncliente2',la_reserva.muestraClientere2);
ruta.get('/muestra-siguientetrabajo',la_reserva.muestraOneEmpleadore);
ruta.get('/muestra-reservaempleado',la_reserva.muestraEmpleadore);
ruta.get('/muestra-reservaadmin',la_reserva.muestraAdminadore);
ruta.get('/busca-fechareserva',la_reserva.buscaFechacontraFecha);
ruta.get('/muestra-estadosreserva',la_reserva.listarEstadosReservas);
ruta.put('/mantenimiento-reservaadmin',la_reserva.mantenimientoReservaAdmin);
//PETICIONES DEDICADAS AL REGISTRO DE USUARIO CLIENTE (SOLO WEB)
ruta.get('/cliente-basicinfo',controlador_cliente.infoBasicaCabeceras);
ruta.post('/nuevo-cliente',controlador_cliente.nuevoCliente);
ruta.get('/consulta-cliente',controlador_cliente.listarClientes);
ruta.get('/datos-perfilcliente',controlador_cliente.datosCompletosCliente);
ruta.put('/actualiza-registrocliente',controlador_cliente.actualizarRegistroCliente);
ruta.put('/mantinimiento-cliente',controlador_cliente.mantenimientoCliente);
module.exports = ruta;