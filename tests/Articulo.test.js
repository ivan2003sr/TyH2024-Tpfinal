const ArticuloRegular = require('../src/models/ArticuloRegular');
const ArticuloPoster = require('../src/models/ArticuloPoster');
const Usuario = require('../src/models/Usuario');

test('Crear un nuevo artículo regular con autores y autor encargado válido', () => {
    const autor1 = new Usuario('Ana Gómez', 'UNLP', 'ana@unlp.edu', 'password456');
    const autor2 = new Usuario('Luis Fernández', 'UNLP', 'luis@unlp.edu', 'password123');
    const articulo = new ArticuloRegular('Título 1', 'http://archivo1.com', 'Resumen del artículo 1', [autor1, autor2], autor2);

    expect(articulo.titulo).toBe('Título 1');
    expect(articulo.urlArchivoAdjunto).toBe('http://archivo1.com');
    expect(articulo.abstract).toBe('Resumen del artículo 1');
    expect(articulo.autores.length).toBe(2);
    expect(articulo.autores[0].nombreCompleto).toBe('Ana Gómez');
    expect(articulo.autores[1].nombreCompleto).toBe('Luis Fernández');
    expect(articulo.autorEncargado.nombreCompleto).toBe('Luis Fernández');
});

test('Crear un nuevo artículo poster', () => {
    const autor1 = new Usuario('Ana Gómez', 'UNLP', 'ana@unlp.edu', 'password456');
    
    const articulo = new ArticuloPoster('Título 2', 'http://archivo2.com', 'http://fuentes.com', [autor1]);

    expect(articulo.titulo).toBe('Título 2');
    expect(articulo.urlArchivoAdjunto).toBe('http://archivo2.com');
    expect(articulo.urlFuentes).toBe('http://fuentes.com');
    expect(articulo.autores.length).toBe(1);
    expect(articulo.autores[0].nombreCompleto).toBe('Ana Gómez');
    expect(articulo.autorEncargado.nombreCompleto).toBe('Ana Gómez');
});

test('Crear un nuevo artículo regular sin autor encargado, usa el primer autor de la lista', () => {
    const autor1 = new Usuario('Ana Gómez', 'UNLP', 'ana@unlp.edu', 'password456');
    const autor2 = new Usuario('Luis Fernández', 'UNLP', 'luis@unlp.edu', 'password123');
    const articulo = new ArticuloRegular('Título 1', 'http://archivo1.com', 'Resumen del artículo 1', [autor1, autor2]);

    expect(articulo.autorEncargado.nombreCompleto).toBe('Ana Gómez');
});

test('Crear un nuevo artículo poster con autor encargado no válido, lanza exception.', () => {
    const autor1 = new Usuario('Carlos Pérez', 'UNLP', 'carlos@unlp.edu', 'password789');
    const autor2 = new Usuario('Marta López', 'UNLP', 'marta@unlp.edu', 'password456');
    const autor3 = new Usuario('Pedro Rodríguez', 'UNLP', 'pedro@unlp.edu', 'password123');
    expect(() => new ArticuloPoster('Título 2', 'http://archivo2.com', 'http://fuentes.com', [autor1, autor2], autor3))
        .toThrow('El autor encargado debe estar en la lista de autores.');
});

test('Crear un nuevo artículo regular, con un autor nulo, lanza exception. ', () => {
    const autor1 = null;
    expect(() => new ArticuloPoster('Título 2', 'http://archivo2.com', 'http://fuentes.com', [autor1]))
    .toThrow('Debe haber al menos un autor válido.');
});

test('Crear un nuevo artículo regular, luego agrega 2 observadores y 2 autores nuevos. Notifica luego a los observadores.', () => {
    const autor1 = new Usuario('Ana Gómez', 'UNLP', 'ana@unlp.edu', 'password456');
    const autor2 = new Usuario('Juan Pérez', 'UNLP', 'juan@unlp.edu', 'password123');


    const articulo = new ArticuloRegular('Título 1', 'http://archivo1.com', 'Resumen del artículo 1', [autor1, autor2], autor1);


    const observador1 = new Usuario('Carlos López', 'UNLP', 'carlos@unlp.edu', 'password789');
    const observador2 = new Usuario('Laura Fernández', 'UNLP', 'laura@unlp.edu', 'password321');

    const nuevoAutor1 = new Usuario('María Rodríguez', 'UNLP', 'maria@unlp.edu', 'password654');
    const nuevoAutor2 = new Usuario('Pedro Gómez', 'UNLP', 'pedro@unlp.edu', 'password987');


    articulo.addObserver(observador1);
    articulo.addObserver(observador2);

    //articulo.notifyObservers();

    expect(articulo.autores.length).toBe(2);
    articulo.addAutor(nuevoAutor1);
    articulo.addAutor(nuevoAutor2);


    expect(articulo.observers.length).toBe(2);
    expect(articulo.observers).toContain(observador1);
    expect(articulo.observers).toContain(observador2);


    expect(articulo.autores.length).toBe(4);
    expect(articulo.autores).toContain(nuevoAutor1);
    expect(articulo.autores).toContain(nuevoAutor2);
});