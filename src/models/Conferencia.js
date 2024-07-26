const SesionRegular = require("./SesionRegular");
const SesionWorkshop = require("./SesionWorkshop");
const SesionPoster = require("./SesionPoster");
const { TipoSesion } = require("./enums");

class Conferencia {
  constructor(nombre, fechaInicio, fechaFin) {
    this.nombre = nombre;
    this.fechaInicio = fechaInicio;
    this.fechaFin = fechaFin;
    this.sesiones = [];
    this.chairs = [];
    this.comitePrograma = [];
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
        throw new Error("Tipo de sesión no válido");
    }
    this.sesiones.push(sesion);
    return sesion;
  }

  agregarChair(chair) {
    this.chairs.push(chair);
  }

  agregarRevisor(revisor) {
    this.comitePrograma.push(revisor);
  }

  listarChairs() {
    return this.chairs.map((chair) => chair.nombreCompleto);
  }

  listarComitePrograma() {
    return this.comitePrograma.map((revisor) => revisor.nombreCompleto);
  }
  
}

module.exports = Conferencia;
