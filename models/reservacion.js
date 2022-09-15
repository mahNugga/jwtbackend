const {Model} = require('objection');

class Reservacion extends Model{

    static get tableName(){
        return 'reservacion';
    }

    static get cabeceraColumn(){
        return 'cabecera';
    }
    static get notasColumn(){
        return 'notas';
    }
    static get mensajeColumn(){
        return 'mensaje';
    }
    static get fechaColumn(){
        return 'fecha';
    }
    static get descuentoColumn(){
        return 'descuento';
    }
    static get subtotalColumn(){
        return 'subtotal';
    }
    static get ivaColumn(){
        return 'iva';
    }
    static get totalColumn(){
        return 'total';
    }
    static get fecha_creadoColumn(){
        return 'fecha_creado';
    }
    static get servicio_idColumn(){
        return 'servicio_id';
    }
    static get empleado_idColumn(){
        return 'empleado_id';
    }
    static get cliente_idColumn(){
        return 'cliente_id';
    }
   
};
module.exports = Reservacion;