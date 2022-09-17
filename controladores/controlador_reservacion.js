'use strict'
const {Knex} = require('Knex');
var Reservacion = require('../models/reservacion');
var EstadoReserva = require('../models/estadoReserva');

var control_reserva = {
    nuevaReservacion: async function(req,res){
        var params = req.body;
        console.log(params);
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
                message:"Si, Si, señores!.....Barcelona"
            });

        }catch(error){
            console.log(error);
        }
    },

    muestraClientere2: async function(req,res){
        var params = req.query;
        try{
            var resecliente = await Reservacion.query().select(
                'reservacion.id',
                'reservacion.fecha',
                'reservacion.hora',
                'reservacion.cliente_id',
                'serv.nombre',
                'serv.hora as ora'
            ).innerJoin('servicio as serv'
            ,'reservacion.servicio_id','serv.id')
            .where('reservacion.cliente_id',params.id)
            .where('reservacion.fecha',params.fecha);
            if(!resecliente) return res.status(404).send(
                {message:"No eciste ese regitro siuuu!"}
            );
            return res.status(200).send({
                resecliente:resecliente,
                message:"thumb up"
            });
        }catch(error){
            console.log(error);
        }
    },

    eliminaReservaCli: async function(req,res){
        var params = req.body;
        try {
            var cambireser = await Reservacion.query().findById(params.id).patch({
                estado_id:params.estado
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
    }

};
module.exports = control_reserva;