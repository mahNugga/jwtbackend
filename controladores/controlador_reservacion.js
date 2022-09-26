'use strict'
const {Knex} = require('Knex');
var Reservacion = require('../models/reservacion');
var EstadoReserva = require('../models/estadoReserva');

var control_reserva = {
    nuevaReservacion: async function(req,res){
        var params = req.body;
        //console.log(params);
        try{
            var reserva = await Reservacion.query().insert({
                cabecera:params.cabecera,
                notas:params.notas,
                mensaje:params.mensaje,
                fecha:params.fechaseleccion,
                hora:params.hora,
                descuento:params.descuento,
                subtotal:params.subtotal,
                iva:params.iva,
                total:params.total,
                fecha_creado:params.fecha_creado,
                servicio_id:params.servicio_id,
                empleado_id:params.empleado_id,
                cliente_id:params.cliente_id,
                estado_id:1
            });
            if(!reserva){
                return res.status(500).send({
                    message:"Error al reservar Reservacion!"
                });
            }
            return res.status(200).send({
                reserva:reserva,
                message:"reserva existosa"
            });

        }catch(error){
            console.log(error);
        }
    },

    muestraClientere2: async function(req,res){
        var params = req.query;
        //console.log(params);
        try{
            var resecliente = await Reservacion.query().select(
                'reservacion.id',
                'reservacion.fecha',
                'reservacion.hora',
                'reservacion.cliente_id',
                'servicio.nombre as servnom',
                //'servicio.hora as ora'
            )
            .join('servicio'
            ,'servicio.id','reservacion.servicio_id')
            //.innerJoin('servicio as serv'
            //,'reservacion.servicio_id','serv.id')
            //.innerJoin('reservacion',
            //'reservacion.cliente_id',params.id)
            //.where('reservacion.cliente_id',params.id)
            //.innerJoin('servicio'
            //,'reservacion.servicio_id','servicio.id')
            .whereRaw('reservacion.cliente_id = ? AND reservacion.estado_id=1',[params.id]);
            
            if(!resecliente) return res.status(404).send(
                {message:"No se encontro registro"}
            );
            return res.status(200).send({
                resecliente:resecliente,
                message:"listado de reservaciones creado"
            });
        }catch(error){
            console.log(error);
        }
    },

    eliminaReservaCli: async function(req,res){
        var params = req.body;
        try {
            var cambireser = await Reservacion.query().findById(params.id).patch({
                estado_id:params.estado_id
            });
            if(!cambireser){
                return res.status(404).send({
                    message:'reserva no encontrada'
                });
            }
            return res.status(200).send({
                cambireser:cambireser,
                message:'Metodo eliminar success!'
            });
        } catch (error) {
            console.log(error);
        }
    },

    muestraClientere: async function(req,res){
        var params = req.query;
        try{
            var resecliente = await Reservacion.query().select(
                'reservacion.fecha',
                'reservacion.hora',
                'reservacion.cliente_id',
                'serv.nombre',
                'serv.hora as ora'
            ).innerJoin('servicio as serv'
            ,'reservacion.servicio_id','serv.id')
            .where('reservacion.cliente_id',params.id);
            if(!resecliente) return res.status(404).send(
                {message:"Nose encontro registro"}
            );
            return res.status(200).send({
                resecliente:resecliente,
                message:"thumb listado de reservas creado"
            });
        }catch(error){
            console.log(error);
        }
    },
    muestraEmpleadore: async function(req,res){
        var params = req.query;
        //console.log(params);
        try{
            var reseTrabajo = await Reservacion.query().select(
                'reservacion.fecha',
                'reservacion.hora',
                'reservacion.cliente_id',
                'reservacion.estado_id',
                's.nombre as servicio',
                's.id',
                'c.nombre',
                'c.apellido'
            ).innerJoin('servicio as s'
            ,'reservacion.servicio_id','s.id')
            .innerJoin('cliente as c'
            ,'reservacion.cliente_id','c.id')
            .where('reservacion.empleado_id',params.id)
            .where('reservacion.fecha',params.feching);
            //console.log(reseTrabajo);
            if(!reseTrabajo) return res.status(404).send(
                {message:"No se encontro registro"}
            );
            return res.status(200).send({
                reseTrabajo:reseTrabajo,
                message:"listado de reservas creado"
            });
        }catch(error){
            console.log(error);
        }
    },

    muestraOneEmpleadore: async function(req,res){
        var params = req.query;
        try{
            var reseNex = await Reservacion.query().select(
                'reservacion.fecha',
                'reservacion.hora',
                'reservacion.servicio_id',
                'reservacion.cliente_id',
                's.nombre as servicio',
                's.id',
                'c.nombre',
                'c.apellido'
            ).innerJoin('servicio as s'
            ,'reservacion.servicio_id','s.id')
            .innerJoin('cliente as c'
            ,'reservacion.cliente_id','c.id')
            .where('reservacion.empleado_id',params.id).limit(1);
            if(!reseNex) return res.status(404).send({
                message:"sin reservacion que mostar"
            });
            return res.status(200).send({
                reseNex:reseNex,
                message:"metodo muestra siguiente trabajo success!"
            });
        }catch(error){
            console.log(error);
        }
    },

    muestraAdminadore: async function(req,res){
        var params = req.query;
        try{
            var reseDe = await Reservacion.query().select(
                'reservacion.id as reserva_id',
                'reservacion.fecha',
                'reservacion.hora',
                'reservacion.cliente_id',
                'reservacion.estado_id as estado',
                's.nombre as servicio',
                's.id as servid',
                'c.nombre',
                'c.apellido',
                'empleado.apellido as empleado',
                'estado.nombre as estador'
            ).innerJoin('servicio as s'
            ,'reservacion.servicio_id','s.id')
            .innerJoin('cliente as c'
            ,'reservacion.cliente_id','c.id')
            .innerJoin('empleado','reservacion.empleado_id','empleado.id')
            .innerJoin('estado'
            ,'reservacion.estado_id','estado.id');
            if(!reseDe) return res.status(404).send(
                {message:"No se encontro registro!"}
            );
            return res.status(200).send({
                reseDe:reseDe,
                message:"listado para admin creado"
            });
        }catch(error){
            console.log(error);
        }
    },

    buscaFechacontraFecha: async function(req,res){
        var params = req.query;
        var bud = req.body;
        //console.log(params);
        //console.log(bud);
        try {
            var ganador = await Reservacion.query().select(
                'reservacion.fecha',
                'reservacion.hora',
                'reservacion.empleado_id',
                'servicio.hora as duracion'
            ).innerJoin('servicio','reservacion.servicio_id','servicio.id')
            .where('reservacion.fecha',params.fechabus)
            .where('reservacion.empleado_id',params.empid);
            if(!ganador) return res.status(404).send({
                message:"en la fecha escogida el empleado no tiene reservaciones o error"
            });
            return res.status(200).send({
                ganador:ganador,
                message:"listado de horarios disponibles creado"
            });
        } catch (error) {
            console.log(error);
        }
    },

    listarEstadosReservas: async function(req,res){
        
        try {
            var listilla = await EstadoReserva.query().select(
                'estado.id',
                'estado.nombre',
                'estado.descripcion',
                'estado.estado'
            );
            if(!listilla) return res.status(404).send({
                message:"No se econtro estados"
            });
            return res.status(200).send({
                listilla:listilla,
                message:"metodo ListaestadosReservas success!"
            });
        } catch (error) {
            console.log(error);
        }
    },

    mantenimientoReservaAdmin: async function(req,res){
        var params = req.body;
        var quin = req.query;
        var trolo = req.body.params.updates[0].value; //reserva_id
        var trolo2 = req.body.params.updates[1].value;
        /* console.log(params);
        console.log(quin);
        console.log(trolo);
        console.log(trolo2); */
        try {
            var cambireser = await Reservacion.query().findById(trolo).patch({
                estado_id:trolo2
            });
            if(!cambireser) return res.status(404).send({
                message:"Error al cambiar estado de reserva"
            });
            return res.status(200).send({
                cambireser:cambireser,
                message:'metodo cambiar estado reserva success!'
                
            });
        } catch (error) {
            console.log(error);
        }
    },

};
module.exports = control_reserva;