'use strict'
const { Knex } = require('knex');
var Insumo = require('../models/insumo');

var control_insumo = {

    nuevoInsumo: async function(req,res){
        var params = req.body;
        //console.log(params);
        try {
            var insumo = await Insumo.query().insert({
                nombre: params.nombre,
                descripcion: params.descripcion,
                costo:params.costo,
                estado: 1,
                stock: params.stock,
                stock_ideal: params.stock_ideal
                           
            });
            if(!insumo){
                return res.status(500).send({
                    message:"Error al insertar datos de insumo en la base de datos"});
            }
            return res.status(200).send({
                insumo:insumo,
                message: "metodo nuevoInsumo success!"
            });
        } catch (error) {
            
        }        
    },

    listarInsumos: async function(req,res){
        try {
            var listaInsumo = await Insumo.query().select(
                'insumo.id',
                'insumo.nombre',
                'insumo.descripcion',
                'insumo.costo',
                'insumo.stock',
                'insumo.estado',
                'insumo.stock_ideal'
            );
            if(!listaInsumo) return res.status(404).send({message:"Insumo no existe"});
            return res.status(200).send({
                listaInsumo:listaInsumo,
                message: "metodo listar Insumos is a success!"
            });
        } catch (error) {
            
        }

    }

};

module.exports = control_insumo;