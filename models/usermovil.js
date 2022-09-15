const {Model} = require('objection');

class Cliente extends Model{
    static get tableName(){
        return 'cliente';
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
    static get telefonoColumn(){
        return 'telefono';
    }
    static get direccionColumn(){
        return 'direccion';
    }
    static get activeColumn(){
        return 'active';
    }
    static get especialColumn(){
        return 'especial'
    }
    static get estadoColumn(){
        return 'estado';
    }
    static get passwordColumn(){
        return 'password';
    }
}

module.exports = Cliente;