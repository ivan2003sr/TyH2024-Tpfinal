const Sesion = require("../src/models/Sesiones/Sesion");
const SesionPoster = require("../src/models/Sesiones/SesionPoster");
const SesionRegular = require("../src/models/Sesiones/SesionRegular");
const SesionWorkshop = require("../src/models/Sesiones/SesionWorkshop");
const MetodoSeleccionMejores = require("../src/strategies/MetodoSeleccionMejores");
const MetodoSeleccionCorteFijo = require("../src/strategies/MetodoSeleccionCorteFijo");
const MetodoSeleccion = require("../src/strategies/MetodoSeleccion");
const ArticuloRegular = require("../src/models/Articulo/ArticuloRegular");
const ArticuloPoster = require("../src/models/Articulo/ArticuloPoster");
const Articulo = require("../src/models/Articulo/Articulo");
const Autor = require("../src/models/Usuarios/Autor");
const Revisor = require("../src/models/Usuarios/Revisor");
const Revision = require("../src/models/Revision");
const {
  TipoArticulo,
  EstadoSesion,
  TipoDeInteres,
} = require("../src/models/enums");

describe("Sesiones", () => {
  test("No se puede instanciar la clase abstracta Sesion", () => {
    expect(
      () => new Sesion("Sesion General", "2024-12-01", 5, "General")
    ).toThrow("Cannot instantiate abstract class");
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

  test("Cambiar estado de sesión", () => {
    const sesion = new SesionRegular("Tema", "2024-12-01", 5);
    sesion.cambiarEstado(EstadoSesion.BIDDING);
    expect(sesion.estado).toBe(EstadoSesion.BIDDING);
  });

  test("Procesar bidding en estado incorrecto", () => {
    const sesion = new SesionRegular("Tema", "2024-12-01", 5);
    const autor = new Autor(
      "Ana Gómez",
      "UNLP",
      "ana@unlp.edu",
      "password456"
    );
    const articulo = new ArticuloRegular(
      "Título 1",
      "http://archivo1.com",
      "Resumen del artículo 1",
      [autor],
      autor
    );

    expect(() => sesion.procesarBidding(autor, articulo, "Interés")).toThrow(
      "El proceso de bidding solo se puede realizar durante el estado de bidding."
    );
  });

  test("Asignar revisores en estado incorrecto", () => {
    const sesion = new SesionRegular("Tema", "2024-12-01", 5);
    const autor = new Autor(
      "Ana Gómez",
      "UNLP",
      "ana@unlp.edu",
      "password456"
    );
    const articulo = new ArticuloRegular(
      "Título 1",
      "http://archivo1.com",
      "Resumen del artículo 1",
      [autor],
      autor
    );
    sesion.articulos.push(articulo);

    expect(() => sesion.asignarRevisores()).toThrow(
      "El proceso de asignación solo se puede realizar durante el estado de asignación."
    );
  });

  test("Agregar revisión en estado incorrecto", () => {
    const sesion = new SesionRegular("Tema", "2024-12-01", 5);
    const autor = new Autor(
      "Ana Gómez",
      "UNLP",
      "ana@unlp.edu",
      "password456"
    );
    const revisor = new Revisor(
      "Luis Fernández",
      "UNLP",
      "luis@unlp.edu",
      "password123"
    );
    const articulo = new ArticuloRegular(
      "Título 1",
      "http://archivo1.com",
      "Resumen del artículo 1",
      [autor],
      autor
    );
    const revision = new Revision("Buena calidad", 1, "General");
    const interesado = TipoDeInteres.INTERESADO;

    sesion.cambiarEstado(EstadoSesion.BIDDING);
    sesion.procesarBidding(revisor, articulo, interesado);
    expect(() => sesion.agregarRevision(articulo, revisor, revision)).toThrow(
      "El proceso de revisión solo se puede realizar durante el estado de revisión."
    );
  });

  test("Procesar bidding y asignar revisores correctamente", () => {
    const sesion = new SesionRegular("Tema", "2024-12-01", 5);
    sesion.cambiarEstado(EstadoSesion.BIDDING);

    const autor = new Autor(
      "Ana Gómez",
      "UNLP",
      "ana@unlp.edu",
      "password456"
    );
    const revisor = new Revisor(
      "Luis Fernández",
      "UNLP",
      "luis@unlp.edu",
      "password123"
    );
    const articulo = new ArticuloRegular(
      "Título 1",
      "http://archivo1.com",
      "Resumen del artículo 1",
      [autor],
      autor
    );
    sesion.articulos.push(articulo);
    sesion.revisores = [revisor];

    sesion.procesarBidding(revisor, articulo, TipoDeInteres.INTERESADO);
    expect(articulo.bids.has(revisor)).toBe(true);

    sesion.cambiarEstado(EstadoSesion.ASIGNACION);
    sesion.asignarRevisores(articulo, sesion.revisores);
    expect(articulo.revisores).toContain(revisor);

    sesion.cambiarEstado(EstadoSesion.REVISION);
    const revision = new Revision("Buena calidad", 1, "General");
    sesion.agregarRevision(articulo, revisor, revision);
    expect(articulo.revisiones).toContain(revision);
  });

  test("Agregar revisión con un revisor no asignado", () => {
    const sesion = new SesionRegular("Tema", "2024-12-01", 5);
    const autor = new Autor(
      "Ana Gómez",
      "UNLP",
      "ana@unlp.edu",
      "password456"
    );
    const revisorAsignado = new Revisor(
      "Luis Fernández",
      "UNLP",
      "luis@unlp.edu",
      "password123"
    );
    const revisorNoAsignado = new Revisor(
      "Carlos Pérez",
      "UNLP",
      "carlos@unlp.edu",
      "password789"
    );
    const articulo = new ArticuloRegular(
      "Título 1",
      "http://archivo1.com",
      "Resumen del artículo 1",
      [autor],
      autor
    );
    const revision = new Revision("Buena calidad", 1, "General");
    sesion.addArticulo(articulo);
    sesion.cambiarEstado(EstadoSesion.ASIGNACION);
    sesion.revisores = [revisorAsignado];
    sesion.asignarRevisores(articulo, sesion.revisores);
    sesion.cambiarEstado(EstadoSesion.REVISION);
    expect(() =>
      sesion.agregarRevision(articulo, revisorNoAsignado, revision)
    ).toThrow("El revisor no está asignado a este artículo.");
  });

  test("Asignar revisores fuera del estado de asignación", () => {
    const sesion = new SesionRegular("Tema", "2024-12-01", 5);
    const autor = new Autor(
      "Ana Gómez",
      "UNLP",
      "ana@unlp.edu",
      "password456"
    );
    const revisor1 = new Revisor(
      "Luis Fernández",
      "UNLP",
      "luis@unlp.edu",
      "password123"
    );
    const articulo = new ArticuloRegular(
      "Título 1",
      "http://archivo1.com",
      "Resumen del artículo 1",
      [autor],
      autor
    );

    sesion.articulos.push(articulo);
    sesion.cambiarEstado(EstadoSesion.RECEPCION);

    expect(() => sesion.asignarRevisores(articulo, [revisor1])).toThrow(
      "El proceso de asignación solo se puede realizar durante el estado de asignación."
    );
  });

  test("Asignar revisores a un artículo no en la lista de artículos de la sesión", () => {
    const sesion = new SesionRegular("Tema", "2024-12-01", 5);
    const autor = new Autor(
      "Ana Gómez",
      "UNLP",
      "ana@unlp.edu",
      "password456"
    );
    const revisor1 = new Revisor(
      "Luis Fernández",
      "UNLP",
      "luis@unlp.edu",
      "password123"
    );
    const articulo = new ArticuloRegular(
      "Título 1",
      "http://archivo1.com",
      "Resumen del artículo 1",
      [autor],
      autor
    );
    const articuloNoEnSesion = new ArticuloRegular(
      "Título 2",
      "http://archivo2.com",
      "Resumen del artículo 2",
      [autor],
      autor
    );

    sesion.cambiarEstado(EstadoSesion.ASIGNACION);
    sesion.articulos.push(articulo);

    expect(() =>
      sesion.asignarRevisores(articuloNoEnSesion, [revisor1])
    ).toThrow("El artículo no está en la lista de artículos de la sesión.");
  });

  test("Asignar una lista vacía de revisores", () => {
    const sesion = new SesionRegular("Tema", "2024-12-01", 5);
    const autor = new Autor(
      "Ana Gómez",
      "UNLP",
      "ana@unlp.edu",
      "password456"
    );
    const revisor1 = new Revisor(
      "Luis Fernández",
      "UNLP",
      "luis@unlp.edu",
      "password123"
    );
    const articulo = new ArticuloRegular(
      "Título 1",
      "http://archivo1.com",
      "Resumen del artículo 1",
      [autor],
      autor
    );

    sesion.cambiarEstado(EstadoSesion.ASIGNACION);
    sesion.articulos.push(articulo);
    sesion.revisores = [revisor1];

    expect(() => sesion.asignarRevisores(articulo, [])).toThrow(
      "Debe proporcionar una lista de revisores."
    );
  });

  test("Asignar más de 3 revisores a un artículo", () => {
    const sesion = new SesionRegular("Tema", "2024-12-01", 5);
    const autor = new Autor(
      "Ana Gómez",
      "UNLP",
      "ana@unlp.edu",
      "password456"
    );
    const revisor1 = new Revisor(
      "Luis Fernández",
      "UNLP",
      "luis@unlp.edu",
      "password123"
    );
    const revisor2 = new Revisor(
      "Carlos Pérez",
      "UNLP",
      "carlos@unlp.edu",
      "password789"
    );
    const revisor3 = new Revisor(
      "Marta López",
      "UNLP",
      "marta@unlp.edu",
      "password456"
    );
    const revisor4 = new Revisor(
      "Juan Pérez",
      "UNLP",
      "juan@unlp.edu",
      "password012"
    );
    const articulo = new ArticuloRegular(
      "Título 1",
      "http://archivo1.com",
      "Resumen del artículo 1",
      [autor],
      autor
    );

    sesion.cambiarEstado(EstadoSesion.ASIGNACION);
    sesion.articulos.push(articulo);
    sesion.revisores = [revisor1, revisor2, revisor3, revisor4];

    expect(() =>
      sesion.asignarRevisores(articulo, [
        revisor1,
        revisor2,
        revisor3,
        revisor4,
      ])
    ).toThrow("No se pueden asignar más de 3 revisores a un artículo.");
  });

  test("Asignar revisores no válidos", () => {
    const sesion = new SesionRegular("Tema", "2024-12-01", 5);
    const autor = new Autor(
      "Ana Gómez",
      "UNLP",
      "ana@unlp.edu",
      "password456"
    );
    const revisor1 = new Revisor(
      "Luis Fernández",
      "UNLP",
      "luis@unlp.edu",
      "password123"
    );
    const revisorNoValido = new Revisor(
      "Carlos Pérez",
      "UNLP",
      "carlos@unlp.edu",
      "password789"
    );
    const articulo = new ArticuloRegular(
      "Título 1",
      "http://archivo1.com",
      "Resumen del artículo 1",
      [autor],
      autor
    );

    sesion.cambiarEstado(EstadoSesion.ASIGNACION);
    sesion.articulos.push(articulo);
    sesion.revisores = [revisor1];

    expect(() => sesion.asignarRevisores(articulo, [revisorNoValido])).toThrow(
      "El revisor Carlos Pérez no está en la lista de revisores válidos."
    );
  });
});

describe("Sesiones regulares", () => {
  const sesion = new SesionRegular("Regular Session", "2024-12-01", 5);

  test("Seleccionar artículos en una sesión regular usando una estrategia", () => {
    const autor = new Autor(
      "Ana Gómez",
      "UNLP",
      "ana@unlp.edu",
      "password456"
    );

    const revision1 = new Revision("Buena calidad", 1, "General");
    const revision2 = new Revision("Excelente", 3, "General");
    const revision3 = new Revision("Aceptable", 2, "General");

    const articulo1 = new ArticuloRegular(
      "Título 1",
      "http://archivo1.com",
      "Resumen del artículo 1",
      [autor],
      autor,
      [revision1]
    );
    const articulo2 = new ArticuloRegular(
      "Título 2",
      "http://archivo2.com",
      "Resumen del artículo 2",
      [autor],
      autor,
      [revision2]
    );
    const articulo3 = new ArticuloRegular(
      "Título 3",
      "http://archivo3.com",
      "Resumen del artículo 3",
      [autor],
      autor,
      [revision3]
    );

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

  test("Seleccionar artículos en una sesión regular sin una estrategia", () => {
    const sesion = new SesionRegular("Regular Session", "2024-12-01", 5);
    const autor = new Autor(
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

    sesion.addArticulo(articulo1);
    sesion.addArticulo(articulo2);
    sesion.addArticulo(articulo3);

    const seleccionados = sesion.seleccionarArticulos();

    expect(seleccionados.length).toBe(0);
  });

  test("No permitir agregar artículos de tipo Poster en una sesión regular", () => {
    const sesion = new SesionRegular("Regular Session", "2024-12-01", 5);
    const autor = new Autor(
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

    expect(() => sesion.addArticulo(articuloPoster)).toThrow(
      "Sólo se pueden agregar artículos tipo Regular a esta sesión."
    );
  });
});

describe("Sesiones tipo Poster", () => {
  test("Agregar artículos de tipo Poster", () => {
    const sesion = new SesionPoster("Poster Session", "2024-12-01", 5);
    const autor = new Autor(
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

    sesion.addArticulo(articuloPoster);

    expect(sesion.articulos.length).toBe(1);
    expect(sesion.articulos).toContain(articuloPoster);
  });

  test("No permitir agregar artículos de tipo Regular", () => {
    const sesion = new SesionPoster("Poster Session", "2024-12-01", 5);
    const autor = new Autor(
      "Ana Gómez",
      "UNLP",
      "ana@unlp.edu",
      "password456"
    );
    const articuloRegular = new ArticuloRegular(
      "Título Regular",
      "http://archivo.com",
      "Resumen del artículo",
      [autor],
      autor,
      3
    );

    expect(() => sesion.addArticulo(articuloRegular)).toThrow(
      "Sólo se pueden agregar artículos tipo Poster a esta sesión."
    );
  });

  test("Seleccionar artículos en una sesión de poster usando la estrategia de corte fijo", () => {
    const sesion = new SesionPoster("Poster Session", "2024-12-01", 5);
    const autor = new Autor(
      "Ana Gómez",
      "UNLP",
      "ana@unlp.edu",
      "password456"
    );
    const articulo1 = new ArticuloPoster(
      "Título 1",
      "http://archivo1.com",
      "Resumen del artículo 1",
      [autor],
      autor,
      3
    );
    const articulo2 = new ArticuloPoster(
      "Título 2",
      "http://archivo2.com",
      "Resumen del artículo 2",
      [autor],
      autor,
      2
    );
    const articulo3 = new ArticuloPoster(
      "Título 3",
      "http://archivo3.com",
      "Resumen del artículo 3",
      [autor],
      autor,
      1
    );

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

  test("Seleccionar artículos sin estrategia retorna una lista vacía", () => {
    const sesion = new SesionPoster("Poster Session", "2024-12-01", 5);
    const autor = new Autor(
      "Ana Gómez",
      "UNLP",
      "ana@unlp.edu",
      "password456"
    );
    const articulo1 = new ArticuloPoster(
      "Título 1",
      "http://archivo1.com",
      "Resumen del artículo 1",
      [autor],
      autor,
      3
    );
    const articulo2 = new ArticuloPoster(
      "Título 2",
      "http://archivo2.com",
      "Resumen del artículo 2",
      [autor],
      autor,
      2
    );

    sesion.addArticulo(articulo1);
    sesion.addArticulo(articulo2);

    const seleccionados = sesion.seleccionarArticulos();

    expect(seleccionados.length).toBe(0);
  });
});

describe("Sesiones tipo Workshop", () => {
  test("Aceptar y seleccionar artículos regulares y de posters usando diferentes estrategias.", () => {
    const sesion = new SesionWorkshop("Workshop Session", "2024-12-01", 10);
    const autor = new Autor(
      "Ana Gómez",
      "UNLP",
      "ana@unlp.edu",
      "password456"
    );

    const revision1 = new Revision("Buena calidad", 1, "General");
    const revision2 = new Revision("Excelente", 3, "General");
    const revision3 = new Revision("Aceptable", 2, "General");
    const revision4 = new Revision("Aceptable", 3, "General");

    const articuloRegular1 = new ArticuloRegular(
      "Título Regular 1",
      "http://archivo1.com",
      "Resumen del artículo regular 1",
      [autor],
      autor,
      [revision1]
    );
    const articuloRegular2 = new ArticuloRegular(
      "Título Regular 2",
      "http://archivo2.com",
      "Resumen del artículo regular 2",
      [autor],
      autor,
      [revision2]
    );
    const articuloPoster1 = new ArticuloPoster(
      "Título Poster 1",
      "http://archivo3.com",
      "Resumen del artículo poster 1",
      [autor],
      autor,
      [revision3]
    );
    const articuloPoster2 = new ArticuloPoster(
      "Título Poster 2",
      "http://archivo4.com",
      "Resumen del artículo poster 2",
      [autor],
      autor,
      [revision4]
    );

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

  test("Seleccionar artículos sin estrategia de selección retorna una lista vacía.", () => {
    const sesion = new SesionWorkshop("Workshop Session", "2024-12-01", 10);
    const autor = new Autor(
      "Ana Gómez",
      "UNLP",
      "ana@unlp.edu",
      "password456"
    );
    const articuloRegular = new ArticuloRegular(
      "Título Regular 1",
      "http://archivo1.com",
      "Resumen del artículo regular 1",
      [autor],
      autor,
      3
    );
    const articuloPoster = new ArticuloPoster(
      "Título Poster 1",
      "http://archivo2.com",
      "Resumen del artículo poster 1",
      [autor],
      autor,
      2
    );

    sesion.addArticulo(articuloRegular);
    sesion.addArticulo(articuloPoster);

    const seleccionados = sesion.seleccionarArticulos();

    expect(seleccionados.length).toBe(0);
  });

  test("No se pueden agregar artículos de tipo no permitido.", () => {
    const sesion = new SesionWorkshop("Workshop Session", "2024-12-01", 10);
    const autor = new Autor(
      "Ana Gómez",
      "UNLP",
      "ana@unlp.edu",
      "password456"
    );

    // Creación de un artículo de un tipo no permitido
    class MockArticuloNoPermitido extends Articulo {
      constructor(
        titulo,
        urlArchivoAdjunto,
        abstract,
        autores,
        autorEncargado = null,
        puntaje = null
      ) {
        super(
          titulo,
          urlArchivoAdjunto,
          "NoPermitido",
          autores,
          autorEncargado,
          puntaje
        );
        this.abstract = abstract;
      }
    }

    const articuloNoPermitido = new MockArticuloNoPermitido(
      "Título No Permitido",
      "http://archivo5.com",
      "Resumen del artículo no permitido",
      [autor],
      autor,
      5
    );

    const metodoSeleccion = new MetodoSeleccionCorteFijo(0.5);
    expect(() => sesion.addArticulo(articuloNoPermitido)).toThrow(
      "Sólo se pueden agregar artículos tipo Regular o Poster a esta sesión."
    );
    expect(() =>
      sesion.setMetodoSeleccion(metodoSeleccion, articuloNoPermitido)
    ).toThrow("Tipo de artículo no soportado.");
  });

  test("Llamar a seleccionar en la clase abstracta debería arrojar un error", () => {
    class SubclassMetodoSeleccion extends MetodoSeleccion {}

    const metodoSeleccion = new SubclassMetodoSeleccion();

    expect(() => metodoSeleccion.seleccionar([])).toThrow(
      "Method 'seleccionar()' must be implemented."
    );
  });
});
