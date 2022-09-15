const {Model} = require('objection');

class Horario extends Model{

    static get tableName(){
        return 'horario';
    }

    static get nombreColumn(){
        return 'nombre';
    }
    static get descripcionColumn(){
        return 'descripcion';
    }
    static get fechaColumn(){
        return 'fecha';
    }
    static get rango_inicioColumn(){
        return 'rango_inicio';
    }
    static get rango_finColumn(){
        return 'rango_fin';
    }
    static get hora_inicioColumn(){
        return 'hora_inicio';
    }
    static get hora_finColumn(){
        return 'hora_fin';
    }
    static get estadoColumn(){
        return 'estado';
    }
    static get empleado_idColumn(){
        return 'empleado_id';
    }
};

module.exports = Horario;