const Sesion = require("../src/models/Sesion");
const SesionPoster = require("../src/models/SesionPoster");
const SesionRegular = require("../src/models/SesionRegular");
const SesionWorkshop = require("../src/models/SesionWorkshop");
const MetodoSeleccionMejores = require("../src/strategies/MetodoSeleccionMejores");
const MetodoSeleccionCorteFijo = require("../src/strategies/MetodoSeleccionCorteFijo");
const MetodoSeleccion = require("../src/strategies/MetodoSeleccion");
const ArticuloRegular = require("../src/models/ArticuloRegular");
const ArticuloPoster = require("../src/models/ArticuloPoster");
const Articulo = require("../src/models/Articulo");
const Usuario = require("../src/models/Usuario");
const Revision = require("../src/models/Revision");
const Revisor = require("../src/models/Revisor");
const { TipoArticulo } = require("../src/models/enums");

describe("Sesiones", () => {
  test("No se puede instanciar la clase abstracta Sesion", () => {
    expect(
      () => new Sesion("Sesion General", "2024-12-01", 5, "General")
    ).toThrow("Cannot instantiate abstract class");
  });

  test("Seleccionar artículos en una sesión regular usando una estrategia", () => {

    const autor = new Usuario(
      "Ana Gómez",
      "UNLP",
      "ana@unlp.edu",
      "password456"
    );

    const revision1 = new Revision('Buena calidad', 1, 'General');
    const revision2 = new Revision('Excelente', 3, 'General');
    const revision3 = new Revision('Aceptable', 2, 'General');

    const articulo1 = new ArticuloRegular("Título 1", "http://archivo1.com", "Resumen del artículo 1", [autor], autor, [revision1]);
    const articulo2 = new ArticuloRegular("Título 2", "http://archivo2.com", "Resumen del artículo 2", [autor], autor, [revision2]);
    const articulo3 = new ArticuloRegular("Título 3", "http://archivo3.com", "Resumen del artículo 3", [autor], autor, [revision3]);

    const sesion = new SesionRegular("Regular Session", "2024-12-01", 5);
    sesion.addArticulo(articulo1);
    sesion.addArticulo(articulo2);
    sesion.addArticulo(articulo3);

    const metodoSeleccion = new MetodoSeleccionMejores(2);
    sesion.setMetodoSeleccion(metodoSeleccion);

    const seleccionados = sesion.seleccionarArticulos();

    expect(seleccionados.length).toBe(2);
    expect(seleccionados).toContain(articulo2);
    expect(seleccionados).toContain(articulo3);
    expect(seleccionados).not.toContain(articulo1);
  });

  test("Llamar a setMetodoSeleccion en la clase abstracta debería arrojar un error", () => {
    class MockSesion extends Sesion {
      constructor() {
        super("Mock Tema", "2024-12-01", 5, "MockTipo");
      }
    }

    const sesion = new MockSesion();

    expect(() => {
      sesion.setMetodoSeleccion();
    }).toThrow("Abstract method!");
    expect(() => {
      sesion.seleccionarArticulos();
    }).toThrow("Abstract method!");
    expect(() => {
      sesion.addArticulo();
    }).toThrow("Abstract method!");
  });

  test("Crear una instancia de Sesion, debe lanzar una exception por ser abastacta.", () => {
    expect(() => new Sesion("tema", "deadline", 5, "SesionPoster")).toThrow(
      "Cannot instantiate abstract class"
    );
  });

  test("Seleccionar artículos en una sesión regular sin una estrategia", () => {
    const autor = new Usuario(
      "Ana Gómez",
      "UNLP",
      "ana@unlp.edu",
      "password456"
    );
    const articulo1 = new ArticuloRegular(
      "Título 1",
      "http://archivo1.com",
      "Resumen del artículo 1",
      [autor],
      autor,
      3
    );
    const articulo2 = new ArticuloRegular(
      "Título 2",
      "http://archivo2.com",
      "Resumen del artículo 2",
      [autor],
      autor,
      2
    );
    const articulo3 = new ArticuloRegular(
      "Título 3",
      "http://archivo3.com",
      "Resumen del artículo 3",
      [autor],
      autor,
      1
    );

    const sesion = new SesionRegular("Regular Session", "2024-12-01", 5);
    sesion.addArticulo(articulo1);
    sesion.addArticulo(articulo2);
    sesion.addArticulo(articulo3);

    const seleccionados = sesion.seleccionarArticulos();

    expect(seleccionados.length).toBe(0);
  });

  test("No permitir agregar artículos de tipo Poster", () => {
    const autor = new Usuario(
      "Ana Gómez",
      "UNLP",
      "ana@unlp.edu",
      "password456"
    );
    const articuloPoster = new ArticuloPoster(
      "Título Poster",
      "http://archivo.com",
      "Resumen del artículo",
      [autor],
      autor,
      3
    );

    const sesion = new SesionRegular("Regular Session", "2024-12-01", 5);
    expect(() => sesion.addArticulo(articuloPoster)).toThrow(
      "Sólo se pueden agregar artículos tipo Regular a esta sesión."
    );
  });


  test('Agregar artículos de tipo Poster', () => {
    const autor = new Usuario('Ana Gómez', 'UNLP', 'ana@unlp.edu', 'password456');
    const articuloPoster = new ArticuloPoster('Título Poster', 'http://archivo.com', 'Resumen del artículo', [autor], autor, 3);

    const sesion = new SesionPoster('Poster Session', '2024-12-01', 5);
    sesion.addArticulo(articuloPoster);

    expect(sesion.articulos.length).toBe(1);
    expect(sesion.articulos).toContain(articuloPoster);
  });

  test('No permitir agregar artículos de tipo Regular', () => {
    const autor = new Usuario('Ana Gómez', 'UNLP', 'ana@unlp.edu', 'password456');
    const articuloRegular = new ArticuloRegular('Título Regular', 'http://archivo.com', 'Resumen del artículo', [autor], autor, 3);

    const sesion = new SesionPoster('Poster Session', '2024-12-01', 5);
    expect(() => sesion.addArticulo(articuloRegular)).toThrow("Sólo se pueden agregar artículos tipo Poster a esta sesión.");
  });

  test('Seleccionar artículos en una sesión de poster usando la estrategia de corte fijo', () => {
    const autor = new Usuario('Ana Gómez', 'UNLP', 'ana@unlp.edu', 'password456');
    const articulo1 = new ArticuloPoster('Título 1', 'http://archivo1.com', 'Resumen del artículo 1', [autor], autor, 3);
    const articulo2 = new ArticuloPoster('Título 2', 'http://archivo2.com', 'Resumen del artículo 2', [autor], autor, 2);
    const articulo3 = new ArticuloPoster('Título 3', 'http://archivo3.com', 'Resumen del artículo 3', [autor], autor, 1);

    const sesion = new SesionPoster('Poster Session', '2024-12-01', 5);
    sesion.addArticulo(articulo1);
    sesion.addArticulo(articulo2);
    sesion.addArticulo(articulo3);

    const metodoSeleccion = new MetodoSeleccionCorteFijo(0.5); // Selecciona el 50% superior
    sesion.setMetodoSeleccion(metodoSeleccion);

    const seleccionados = sesion.seleccionarArticulos();

    expect(seleccionados.length).toBe(2);
    expect(seleccionados).toContain(articulo1);
    expect(seleccionados).toContain(articulo2);
    expect(seleccionados).not.toContain(articulo3);
  });

  test('Seleccionar artículos sin estrategia retorna una lista vacía', () => {
    const autor = new Usuario('Ana Gómez', 'UNLP', 'ana@unlp.edu', 'password456');
    const articulo1 = new ArticuloPoster('Título 1', 'http://archivo1.com', 'Resumen del artículo 1', [autor], autor, 3);
    const articulo2 = new ArticuloPoster('Título 2', 'http://archivo2.com', 'Resumen del artículo 2', [autor], autor, 2);

    const sesion = new SesionPoster('Poster Session', '2024-12-01', 5);
    sesion.addArticulo(articulo1);
    sesion.addArticulo(articulo2);

    const seleccionados = sesion.seleccionarArticulos();

    expect(seleccionados.length).toBe(0);
  });

  test('Aceptar y seleccionar artículos regulares y de posters usando diferentes estrategias.', () => {
    const autor = new Usuario('Ana Gómez', 'UNLP', 'ana@unlp.edu', 'password456');

    const revision1 = new Revision('Buena calidad', 1, 'General');
    const revision2 = new Revision('Excelente', 3, 'General');
    const revision3 = new Revision('Aceptable', 2, 'General');
    const revision4 = new Revision('Aceptable', 3, 'General');

    const articuloRegular1 = new ArticuloRegular('Título Regular 1', 'http://archivo1.com', 'Resumen del artículo regular 1', [autor], autor, [revision1]);
    const articuloRegular2 = new ArticuloRegular('Título Regular 2', 'http://archivo2.com', 'Resumen del artículo regular 2', [autor], autor, [revision2]);
    const articuloPoster1 = new ArticuloPoster('Título Poster 1', 'http://archivo3.com', 'Resumen del artículo poster 1', [autor], autor, [revision3]);
    const articuloPoster2 = new ArticuloPoster('Título Poster 2', 'http://archivo4.com', 'Resumen del artículo poster 2', [autor], autor, [revision4]);

    const sesion = new SesionWorkshop('Workshop Session', '2024-12-01', 10);
    sesion.addArticulo(articuloRegular1);
    sesion.addArticulo(articuloRegular2);
    sesion.addArticulo(articuloPoster1);
    sesion.addArticulo(articuloPoster2);

    const metodoSeleccionRegulares = new MetodoSeleccionMejores(2); // Selecciona artículos regulares con puntaje >= 2
    const metodoSeleccionPosters = new MetodoSeleccionCorteFijo(0.5); // Selecciona el 50% superior de posters

    sesion.setMetodoSeleccion(metodoSeleccionRegulares, TipoArticulo.REGULAR);
    sesion.setMetodoSeleccion(metodoSeleccionPosters, TipoArticulo.POSTER);

    const seleccionados = sesion.seleccionarArticulos();

    expect(seleccionados.length).toBe(2);
    expect(seleccionados).not.toContain(articuloRegular1);
    expect(seleccionados).toContain(articuloRegular2);
    expect(seleccionados).toContain(articuloPoster1);
    expect(seleccionados).not.toContain(articuloPoster2);
  });


  test('Seleccionar artículos sin estrategia de selección retorna una lista vacía.', () => {
    const autor = new Usuario('Ana Gómez', 'UNLP', 'ana@unlp.edu', 'password456');
    const articuloRegular = new ArticuloRegular('Título Regular 1', 'http://archivo1.com', 'Resumen del artículo regular 1', [autor], autor, 3);
    const articuloPoster = new ArticuloPoster('Título Poster 1', 'http://archivo2.com', 'Resumen del artículo poster 1', [autor], autor, 2);

    const sesion = new SesionWorkshop('Workshop Session', '2024-12-01', 10);
    sesion.addArticulo(articuloRegular);
    sesion.addArticulo(articuloPoster);

    const seleccionados = sesion.seleccionarArticulos();

    expect(seleccionados.length).toBe(0);
  });

  test('No se pueden agregar artículos de tipo no permitido.', () => {
    const autor = new Usuario('Ana Gómez', 'UNLP', 'ana@unlp.edu', 'password456');

    // Creación de un artículo de un tipo no permitido
    class MockArticuloNoPermitido extends Articulo {
      constructor(titulo, urlArchivoAdjunto, abstract, autores, autorEncargado = null, puntaje = null) {
        super(titulo, urlArchivoAdjunto, 'NoPermitido', autores, autorEncargado, puntaje);
        this.abstract = abstract;
      }
    }

    const articuloNoPermitido = new MockArticuloNoPermitido('Título No Permitido', 'http://archivo5.com', 'Resumen del artículo no permitido', [autor], autor, 5);

    const sesion = new SesionWorkshop('Workshop Session', '2024-12-01', 10);

    expect(() => sesion.addArticulo(articuloNoPermitido)).toThrow("Sólo se pueden agregar artículos tipo Regular o Poster a esta sesión.");
  });

  test('Llamar a seleccionar en la clase abstracta debería arrojar un error', () => {
    class SubclassMetodoSeleccion extends MetodoSeleccion { }

    const metodoSeleccion = new SubclassMetodoSeleccion();

    expect(() => metodoSeleccion.seleccionar([])).toThrow("Method 'seleccionar()' must be implemented.");
  });

});
