const mongoose = require('mongoose'); //Hace el llamado al módulo mongoose
const uniqueValidator = require('mongoose-beautiful-unique-validation'); //Hace el llamado al módulo mongoose-beautiful-unique-validation

//Crea roles para los usuarios
let rolesValidos = {
    values: ['ADMIN_ROLE', "USER_ROLE"],
    message: '{VALUE} no es un rol válido'
};

let Schema = mongoose.Schema; //asigna un esquema a una colección MongoDB

//Crea un esquema con diferentes campos
let usuarioSchema = new Schema({
    nombre: {
        type: String, //tipo de la variable
        required: [true, 'El nombre es requerido'] //Campo requerido
    },
    email: {
        type: String, //tipo de la variable
        required: [true, 'El correo es necesario'], //Campo requerido
        unique: true //campo único
    },
    password: {
        type: String, //tipo de la variable
        required: [true, 'El password es requerido'] //Campo requerido
    },
    img: {
        type: String, //tipo de la variable
        required: false //Campo no requerido
    },
    role: {
        type: String, //tipo de la variable
        default: 'USER_ROLE', //por defecto USER_ROLE
        enum: rolesValidos //guarda los roles disponibles
    },
    estado: {
        type: Boolean, //tipo de la variable
        default: true //por defecto true
    },
    goole: {
        type: Boolean, //tipo de la variable
        default: false //por defecto false
    }
});

usuarioSchema.methods.toJSON = function() {

    let user = this;
    let userObject = user.toObject();
    delete userObject.password;

    return userObject;

}


usuarioSchema.plugin(uniqueValidator);

//Exporta el módulo de moongose
module.exports = mongoose.model('Usuario', usuarioSchema);