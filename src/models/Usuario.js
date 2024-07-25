class Usuario {
    constructor(nombreCompleto, afiliacion, email, contrasena) {
        this.nombreCompleto = nombreCompleto;
        this.afiliacion = afiliacion;
        this.email = email;
        this.contrasena = contrasena;
        this.roles = [];
    }

    addRol(rol) {
        this.roles.push(rol);
    }

    update(articulo) {

        // Simulamos acá mandar una notificación al usuario.
        console.log(`${this.nombreCompleto} ha recibido una notificación sobre el artículo: ${articulo.titulo}`);
    }
}

module.exports = Usuario;
