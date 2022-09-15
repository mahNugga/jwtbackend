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

};
module.exports = control_reserva;