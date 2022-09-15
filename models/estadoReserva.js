const {Model} = require('objection');

class EstadoReserva extends Model{
static get tableName(){
    return 'estado';
}
static get nombreColumn(){
 return 'nombre';   
}
static get descripcionColumn(){
    return 'descripcion';
}
static get estadoColumn(){
    return 'estado';
}
}

module.exports = EstadoReserva;