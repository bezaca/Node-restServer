const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');


let rolesValidos = {  // utilizado para definir datos validos y mensaje de respuesta. 
    values: ['ADMIN_ROLE', 'USER_ROLE'],
    message: '{VALUE} no es un rol valido' // value para el rol no definido
};


let Schema = mongoose.Schema;


let usuarioSchema = new Schema({

    nombre: {
        type: String,
        requird: [true, 'El nombre es necesario']
    },
    email: {
        type: String,
        required: [true, 'EL correo es necesario'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'La constraseña es obligatoria']
    },
    img: {
        type: String,
        required: false
    },
    role: {
        type: String,
        default: 'USER_ROLE',
        enum: rolesValidos //utilizado para definir datos validos 
    },
    estado: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    }
});

usuarioSchema.methods.toJSON = function () { // importante , necesitamos el this
    // toJSON siempre se llama para resp

    let user = this;
    let userObject = user.toObject();
    delete userObject.password;

    return userObject;

};


usuarioSchema.plugin(uniqueValidator, { message: '{PATH} debe de ser único' });

module.exports = mongoose.model('Usuario', usuarioSchema);