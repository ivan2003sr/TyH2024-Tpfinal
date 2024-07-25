const Usuario = require('./Usuario');

class Autor extends Usuario {
    constructor(nombreCompleto, afiliacion, email, contrasena) {
        super(nombreCompleto, afiliacion, email, contrasena);
        this.roles.push('Autor');
    }
}

module.exports = Autor;