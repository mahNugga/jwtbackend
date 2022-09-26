const { Model } = require('objection');

class Insumo extends Model{
    static get tableName(){
        return 'insumo';
    }
    static get nombreColumn(){
        return 'nombre';
    }
    static get descripcionColumn(){
        return 'descripcion';
    }
    static get costoColumn(){
        return 'costo';
    }
    static get estadoColumn(){
        return 'estado';
    }
    static get stockColumn(){
        return 'stock';
    }
    static get stockIdealoColumn(){
        return 'stock_ideal';
    }
};
module.exports = Insumo;