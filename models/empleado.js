const { Model } = require('objection');
const empleado_especialidad = require('./especialidad_empleado');

class Empleado extends Model{
    static get tableName(){
        return 'empleado';
    }
    static get nombreColumn(){
        return 'nombre';
    }
    static get apellidoColumn(){
        return 'apellido';
    }
    static get correoColumn(){
        return 'correo';
    }
    static get passwordColumn(){
        return 'password';
    }
    static get telefonoColumn(){
        return 'telefono';
    }
    static get direccionColumn(){
        return 'direccion';
    }
    static get rolColumn(){
        return 'rol';
    }
    static get fechaColumn(){
        return 'fecha_creacion';
    }
    static get estadoColumn(){
        return 'estado';
    }

    static relationMappings = {
        empleado_especialidad:{
            relation: Model.HasManyRelation,
            modelClass: empleado_especialidad,
            join:{
                from: 'empleado.id',
                to: 'empleado_especialidad.empleado_id'
            }
        }
    };
};

module.exports = Empleado;