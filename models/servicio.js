const {Model} = require('objection');

class Servicio extends Model{
    static get tableName(){
        return 'servicio';
    }

    static get nombreColumn(){
        return 'nombre';
    }
    static get descripcionColumn(){
        return 'descripcion';
    }
    static get horaColumn(){
        return 'hora';
    }
    static get estadoColumn(){
        return 'estado';
    }

};

module.exports = Servicio;