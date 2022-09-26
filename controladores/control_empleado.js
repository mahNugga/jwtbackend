'use strict'
const { Knex } = require('knex');
var Empleado = require('../models/empleado');
var bcrypt = require('bcryptjs');
var jwt = require("jsonwebtoken");
//const { param } = require('../rutas/ruta_empleado');
var control_empleado = {
    home: function(req, res){
        return res.status(200).send({
            message: "Soy la pagina principal"
        });
    },
    /* test: function(req,res){
        return res.status(200).send({
            message: "Soy el controlador test"
        });
    }, */

    nuevoEmpleado: async function(req,res){
        //var empleado = new Empleado();

        var params = req.body;
        //console.log(params.rol);
        var rol = params.rol;
        var roldb;
        if(rol=="empleado1"){ roldb=1}
        if(rol=="administrador"){roldb=7}
        //console.log(rol);
        try {
            
            var empleado = await Empleado.query().insert({
                nombre: params.nombre,
                apellido: params.apellido,
                correo:params.correo,
                password: params.password,
                telefono: params.telefono,
                direccion: params.direccion,
                rol: roldb,
                fecha_creacion: params.fecha_creacion,
                estado: 1           
            });
            if(!empleado){
                return res.status(500).send({
                    message:"Error al insertar datos de empleado en la base de datos"});
            }
            const token = jwt.sign(
                {emp_id:empleado.toJSON},'xKWhaU7DgRk'
            ,
            {
                expiresIn:'30000000',
            });
            return res.status(200).send({
                empleado:empleado,
                message: "metodo nuevoEmpleado success!"
            });
        } catch (error) {
            console.log(error);
        }        
    },

    seleccionaEmpleado: async function(req,res){
        var busqueda = req.params;

        try {
            var buscaEmpleado = await Empleado.query().select(
                'empleado.nombre',
                'empleado.apellido',
                'empleado.correo'
            ).where('empleado.apellido',params.apellido);
            if(!buscaEmpleado) return res.status(404).send({message:"Empleado no existe"});
            return res.status(200).send({
                buscaEmpleado:buscaEmpleado,
                message: "metodo seleccionaEmpleado success!"
            });
        } catch (error) {
            
        }

    },

    listarEmpleados: async function(req,res){
        try {
            var listaEmpleado = await Empleado.query().select(
                'empleado.id',
                'empleado.nombre',
                'empleado.apellido',
                'empleado.correo',
                'empleado.telefono',
                'empleado.rol'
            ).where('empleado.estado','1');
            if(!listaEmpleado) return res.status(404).send({message:"Empleado no existe"});
            return res.status(200).send({
                listaEmpleado:listaEmpleado,
                message: "metodo listar Empleados  is a success!"
            });
        } catch (error) {
            console.log(error);
        }

    },

    listaSinAdmin: async function(req,res){
        try{
            var listaSinrangos7 = await Empleado.query().select(
                'empleado.id',
                'empleado.nombre',
                'empleado.apellido',
                'empleado.correo',
                'empleado.telefono',
                'empleado.rol'
            ).where('empleado.estado','1').where('empleado.rol','1');
            if(!listaSinrangos7) return res.status(404).send({
                message:"Lista no fue creada"
            });
            return res.status(200).send({
                listaSinrangos7:listaSinrangos7,
                message:"listado empleados creado"
            });
        }catch(error){
            console.log(error);
        }
    },

    actualizaEmpleado: async function(req,res){
        var params = req.body;
        var rol  = params.rol;
        var roldb;
        if(rol=='empleado'){roldb=1}
        if(rol=='administrador'){roldb=7}
        //console.log(params.id);
        //console.log(params);
        //console.log(roldb);
        try{
            var editado = await Empleado.query().findById(params.id).patch({
                nombre: params.nombre,
                apellido: params.apellido,
                correo:params.correo,
                password: params.password,
                telefono: params.telefono,
                direccion: params.direccion,
                rol: roldb
            });
            if(!editado){
                return res.status(500).send({
                    message:"Error al actualizar empleado"
                });
            }
            return res.status(200).send({
                editado:editado,
                message:"Empleado Editado success!"
            });
        }catch(error){
            console.log(error);
        }
    },

    borrarEmpleado: function(req,res){
        
    },

    softBorradoEmpleado: async function(req,res){
        var params = req.body;
        try{
            var softBorrar = await Empleado.query().findById(params.id)
            .patch({
                estado:0
            });
            if(!softBorrar){
                return res.status(500).send({
                    message:" Error al softEliminar empleado!"
                });
            }
            return res.status(200).send({
                softBorrar:softBorrar,
                message:"SoftBorradoEmpleado success!"
            });
        }catch(error){

        }
    },

    
    credencialesCabEmpleado: async function(req,res){
        var params = req.query;
        try{
            var empeladoCab = await Empleado.query().findById(params.id)
            .select(
                'empleado.id',
                'empleado.nombre',
                'empleado.apellido'
            );
            if(!empeladoCab) return res.status(404).send({
                message:"Registro Empleado no existe"
            });
            return res.status(200).send({
                empeladoCab:empeladoCab,
                message:"Metodo credenciales empleado cab success!"
            });
        }catch(error){
            console.log("El contenido del error: "+error);
        }
    },

    sudolistarEmpleados: async function(req,res){
        try {
            var listaEmpleado = await Empleado.query().select(
                'empleado.id',
                'empleado.nombre',
                'empleado.apellido',
                'empleado.correo',
                'empleado.telefono',
                'empleado.rol',
                'empleado.estado'
            );
            if(!listaEmpleado) return res.status(404).send({message:"Empleado no existe"});
            return res.status(200).send({
                listaEmpleado:listaEmpleado,
                message: "metodo listar Empleados  is a success!"
            });
        } catch (error) {
            console.log(error);
        }

    },

    alohaEmpleado: async function(req,res){
        var params = req.query;
        try{
            var ysemarcho = await Empleado.query().deleteById(params.id);
            if(!ysemarcho) return res.status(404).send({
                message:'no se encontro al empleado a borrar'
            });
            return res.status(200).send({
                ysemarcho:ysemarcho,
                message:'Metodo Aloha success!'
            });
        }catch(err){
            console.log(err);
        }
    }

};

module.exports = control_empleado;