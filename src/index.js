// index.js

const Usuario = require('./models/Usuario');
const Conferencia = require('./models/Conferencia');
const ArticuloRegular = require('./models/ArticuloRegular');
const Poster = require('./models/ArticuloPoster');
const Revision = require('./models/Revision');
const Rol = require('./models/Rol');
const Bid = require('./models/Bid');
const { TipoDeInteres, TipoSesion, EstadoArticulo, TipoArticulo } = require('./models/enums');
const MetodoSeleccionCorteFijo = require('./patterns/MetodoSeleccionCorteFijo');
const MetodoSeleccionMejores = require('./patterns/MetodoSeleccionMejores');

// Ejemplo de uso

const usuario1 = new Usuario("Juan Perez", "UNLP", "juan@unlp.edu.ar", "1234");
const usuario2 = new Usuario("Maria Garcia", "UNLP", "maria@unlp.edu.ar", "1234");

const conferencia = new Conferencia("Conferencia de Informática", new Date(2023, 11, 1), new Date(2023, 11, 3));
const sesion = conferencia.crearSesion(TipoSesion.WORKSHOP);
sesion.setMetodoSeleccion(new MetodoSeleccionCorteFijo(0.3), TipoArticulo.REGULAR);
sesion.setMetodoSeleccion(new MetodoSeleccionMejores(2), TipoArticulo.POSTER);

const articulo1 = new ArticuloRegular("Título 1", "url1", "Abstract 1");
const articulo2 = new Poster("Título 2", "url2", "urlFuente2");

articulo1.addAutor(usuario1);
articulo2.addAutor(usuario2);

sesion.addArticulo(articulo1);
sesion.addArticulo(articulo2);

const seleccionados = sesion.seleccionarArticulos();
console.log(seleccionados);
