'use strict'
var Cliente = require('../models/usermovil');
var bcrypt = require('bcryptjs');
var jwt = require("jsonwebtoken");

var control_ingreso = {

    login:async function(req,res){
        var params = req.body;
        var datos = req.query;
        console.log(params);
        console.log('--------------------------');
        console.log(req.query.correo);
        var toller;
        var teller;
        try{
            
            var usuario_c = await Cliente.query().select(
                'cliente.id',
                'cliente.nombre',
                'cliente.apellido',
                'cliente.correo',
                'cliente.password'
            ).where('cliente.correo',params.correo)
            console.log(usuario_c);
            console.log(usuario_c[0].nombre);
            var criptic = await bcrypt.compare(usuario_c[0].password,params.password)
            var usuariom = await Cliente.query().select(
                'cliente.id',
                'cliente.nombre',
                'cliente.apellido',
                'cliente.correo',
                'cliente.password'
            ).where('cliente.correo',params.correo)
            .where('cliente.password',criptic);
            console.log("datos usuariomovil: ");
            console.log(usuariom);
            if(usuario_c==''){
                return res.status(404).send({
                        teller:6,
                        message:'Usuario no existe, registrese!'
                    });
                }
            
            if(usuario_c!=''&& usuariom!=''){
                console.log('creando token');
                const token = jwt.sign(
                    {cl_id:usuariom.toJSON},'xKWhaU7DgRk'
                ,
                {
                    expiresIn:'30000000',
                });
                console.log(token);
                usuariom.token = token; 
                return res.status(200).send(
                    {
                        usuariom:usuariom,
                        teller:5,
                        message:"Usuario encontrado!",
                        token:token,
                    }
                );
            }
            
        }catch(error){
            console.log("el error:"+error);
        }
    },

    //LOGIN PARA WEB APP
    loginweb:async function(req,res){
        var params = req.body;
        var datos = req.query;
        console.log(params);
        console.log('--------------------------');
        console.log(req.query.correo); 
        console.log('--------------------------');
        console.log(datos);
        var toller;
        var teller;
        try{
            var usuario_c = await Cliente.query().select(
                'cliente.id',
                'cliente.nombre',
                'cliente.apellido',
                'cliente.correo',
                'cliente.password'
            ).where('cliente.correo',datos.correo)
            console.log(usuario_c);
            var criptic = await bcrypt.compare(usuario_c[0].password,datos.password)
            var usuariom = await Cliente.query().select(
                'cliente.id',
                'cliente.nombre',
                'cliente.apellido',
                'cliente.correo',
                'cliente.password'
            ).where('cliente.correo',datos.correo)
            .where('cliente.password',criptic);
            //.where('cliente.password',datos.password);
            /* console.log("lo que sale de la query: ");
            console.log(usuario_c); */
            if(usuario_c==''){

                var empleado_r = await Empleado.query().select(
                    'empleado.id',
                    'empleado.nombre',
                    'empleado.apellido',
                    'empleado.rol',
                    'empleado.correo',
                    'empleado.password'
                ).where('empleado.correo',datos.correo)
                .where('empleado.password',datos.password)
                .where('empleado.estado',1);
                if(empleado_r!=''){
                    return res.status(200).send(
                        {
                            empleado_r:empleado_r,
                            toller:'chingado rol',
                            teller:empleado_r[0].rol,
                            message:"Es empleado!"
                        }
                    );
                }else{
                    return res.status(404).send(
                        {
                            teller:6,
                            message:'registrese!'
                        }
                    );
                }
            }
            if(usuario_c!=''){
                return res.status(200).send(
                    {
                        usuario_c:usuario_c,
                        teller:5,
                        message:"Es un usuario!"
                    }
                );
            }
            
        }catch(error){
            console.log("el contenido del error:"+error);
        }
    },

    nuevoCliente: async function(req,res){
        var params = req.body;
        var query = req.query;
        var bodi = req;
        //console.log(params);
        //console.log(bodi);
        try {
            const usuarioexiste = await Cliente.query().select(
                'cliente.correo'
            ).where(
                'cliente.correo',params.correo
            );
            console.log(usuarioexiste);
            if(usuarioexiste.length>0){
                return res.status(409).send({
                    message:'Usuario ya existe (correo encontrado)'
                });
            }
            var cryptlord = await bcrypt.hash(params.password,10);
            var cliente = await Cliente.query().insert({
                nombre: params.nombre,
                apellido: params.apellido,
                correo:params.correo,
                telefono: params.telefono,
                direccion: params.direccion,
                active: 0,
                especial:'',
                estado:1,
                password: cryptlord
                           
            });
            if(!cliente){
                return res.status(500).send({
                    message:"Error al insertar datos de cliente en la base de datos"});
            }
            const token = jwt.sign(
                {c_id:cliente.toJSON},'xKWhaU7DgRk'
            ,
            {
                expiresIn:'1200000',
            });
            cliente.token = token;
            return res.status(200).send({
                cliente:cliente,
                message: "metodo nuevoCliente success!"
            });
        } catch (error) {
            console.log(error);
        }        

    },
    BievenidaUsuarioMovil: async function(req,res){
        var params = req.body;

        try{
            res.status(200).send("Validacion por token existosa");
        }catch(error){
            console.log(error);
        }
    }

};
module.exports = control_ingreso;