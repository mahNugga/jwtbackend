'use strict'
var Servicio = require('../models/servicio');

var control_servicio = {

    listarServicios: async function(req,res){
        console.log("vaya vaya");
        try {
            var listaServicio = await Servicio.query().select(
                'servicio.id',
                'servicio.nombre',
                'servicio.descripcion',
                'servicio.hora',
                'servicio.precio',
                'servicio.estado'
            );
            if(!listaServicio) return res.status(404).send({message:"Servicio no existe"});
            return res.status(200).send({
                listaServicio:listaServicio,
                message: "metodo listar Servicios is a success!"
            });
        } catch (error) {
            
        }

    },
}
module.exports = control_servicio;