const SesionRegular = require('./SesionRegular');
const SesionWorkshop = require('./SesionWorkshop');
const SesionPoster = require('./SesionPoster');
const { TipoSesion } = require('./enums');

class Conferencia {
    constructor(nombre, fechaInicio, fechaFin) {
        this.nombre = nombre;
        this.fechaInicio = fechaInicio;
        this.fechaFin = fechaFin;
        this.sesiones = [];
    }

    crearSesion(tipo) {
        let sesion;
        switch (tipo) {
            case TipoSesion.REGULAR:
                sesion = new SesionRegular();
                break;
            case TipoSesion.WORKSHOP:
                sesion = new SesionWorkshop();
                break;
            case TipoSesion.POSTER:
                sesion = new SesionPoster();
                break;
            default:
                throw new Error('Tipo de sesión no válido');
        }
        this.sesiones.push(sesion);
        return sesion;
    }
}

module.exports = Conferencia;
