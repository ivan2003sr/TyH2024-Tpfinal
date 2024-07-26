const Autor = require('./models/Autor');
const Conferencia = require('./models/Conferencia');
const ArticuloRegular = require('./models/ArticuloRegular');
const ArticuloPoster = require('./models/ArticuloPoster');
const { TipoDeInteres, TipoSesion, EstadoArticulo, TipoArticulo } = require('./models/enums');
const MetodoSeleccionCorteFijo = require('./strategies/MetodoSeleccionCorteFijo');
const MetodoSeleccionMejores = require('./strategies/MetodoSeleccionMejores');

// Ejemplo de uso

const autor1 = new Autor("Juan Perez", "UNLP", "juan@unlp.edu.ar", "1234");
const autor2 = new Autor("Maria Garcia", "UNLP", "maria@unlp.edu.ar", "1234");

const conferencia = new Conferencia("Conferencia de Informática", new Date(2023, 11, 1), new Date(2023, 11, 3));
const sesion = conferencia.crearSesion(TipoSesion.WORKSHOP);
sesion.setMetodoSeleccion(new MetodoSeleccionCorteFijo(0.3), TipoArticulo.REGULAR);
sesion.setMetodoSeleccion(new MetodoSeleccionMejores(2), TipoArticulo.POSTER);

const articulo1 = new ArticuloRegular("Título 1", "url1", "Abstract 1", [autor1]);
const articulo2 = new ArticuloPoster("Título 2", "url2", "urlFuente2", [autor2]);

articulo1.addAutor(autor1);
articulo2.addAutor(autor2);

sesion.addArticulo(articulo1);
sesion.addArticulo(articulo2);

const seleccionados = sesion.seleccionarArticulos();
console.log(seleccionados);
