'use strict'
/* const { default: knex } = require('knex'); */
const { Knex } = require('Knex');
var Horario = require('../models/horario');

var control_horario={

    devolverFechas: async function(req,res){
        var params = req.query;
        console.log(params);
        try{
            /* var fechin = await Horario.query().select(
                'horario.rango_inicio',
                'horario.rango_fin',
                'horario.hora_inicio',
                'horario.hora_fin',
                'horario.empleado_id'
            ).where('horario.rango_inicio',params.fechaing) */
            //.where('horario.rango_fin','<=',params.fechaing); 

             var fechin = await Horario.query().select(
                'horario.rango_inicio',
                'horario.rango_fin',
                'horario.hora_inicio',
                'horario.hora_fin',
                'horario.empleado_id',
                'empleado.nombre as empnombre',
                'empleado.apellido'
            ).innerJoin('empleado','horario.empleado_id','empleado.id')
            .whereRaw('? between horario.rango_inicio AND horario.rango_fin',[params.fechaing]);
            /* .then(data=>{
                console.log("buena bro!")
            });  */
            var fechon = await Horario.query().select(
                'horario.rango_inicio',
                'horario.rango_fin',
                'horario.fecha'
            ); 
            if(!fechin){
                return res.status(404).send({
                    message:"algo salio muy mal guacho"
                });
            }
            return res.status(200).send({
                fechin:fechin,
                /* fechon:fechon, */
                message:"ahora se viene lo chido"
            });
        }catch(error){
            console.log("el mistake:"+error);
        }
    },
}
module.exports = control_horario;