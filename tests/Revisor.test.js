const Revisor = require('../src/models/Revisor');
const Usuario = require('../src/models/Usuario');
const ArticuloRegular = require('../src/models/ArticuloRegular');
//const Revision = require('../src/models/Revision');

describe('Revisor', () => {
    test('Un revisor puede realizar una revisión en un artículo', () => {
        const autor = new Usuario('Ana Gómez', 'UNLP', 'ana@unlp.edu', 'password456');
        const articulo = new ArticuloRegular('Título 1', 'http://archivo1.com', 'Resumen del artículo 1', [autor], autor);

        const revisor = new Revisor('Luis Fernández', 'UNLP', 'luis@unlp.edu', 'password123');

        revisor.realizarRevision(articulo, 'Texto de la revisión', 2, 'General');

        expect(articulo.revisiones.length).toBe(1);
        expect(articulo.revisiones[0].texto).toBe('Texto de la revisión');
        expect(articulo.revisiones[0].puntaje).toBe(2);
        expect(articulo.revisiones[0].tipoDeInteres).toBe('General');
        expect(revisor.revisiones.length).toBe(1);
        expect(revisor.revisiones[0].texto).toBe('Texto de la revisión');
    });

    test('Las revisiones realizadas por el revisor se almacenan en su lista de revisiones', () => {
        const autor = new Usuario('Ana Gómez', 'UNLP', 'ana@unlp.edu', 'password456');
        const articulo = new ArticuloRegular('Título 1', 'http://archivo1.com', 'Resumen del artículo 1', [autor], autor);

        const revisor = new Revisor('Luis Fernández', 'UNLP', 'luis@unlp.edu', 'password123');

        revisor.realizarRevision(articulo, 'Texto de la revisión 1', 3, 'General');
        revisor.realizarRevision(articulo, 'Texto de la revisión 2', -2, 'Específico');

        expect(revisor.revisiones.length).toBe(2);
        expect(revisor.revisiones[0].texto).toBe('Texto de la revisión 1');
        expect(revisor.revisiones[1].texto).toBe('Texto de la revisión 2');
    });

    test('El artículo recibe la revisión realizada por el revisor', () => {
        const autor = new Usuario('Ana Gómez', 'UNLP', 'ana@unlp.edu', 'password456');
        const articulo = new ArticuloRegular('Título 1', 'http://archivo1.com', 'Resumen del artículo 1', [autor], autor);

        const revisor = new Revisor('Luis Fernández', 'UNLP', 'luis@unlp.edu', 'password123');

        revisor.realizarRevision(articulo, 'Texto de la revisión', 0, 'General');

        expect(articulo.revisiones.length).toBe(1);
        expect(articulo.revisiones[0].texto).toBe('Texto de la revisión');
        expect(articulo.revisiones[0].puntaje).toBe(0);
        expect(articulo.revisiones[0].tipoDeInteres).toBe('General');
    });

    test('No se pueden añadir revisiones a un artículo si se han alcanzado 3 revisiones', () => {
        const autor = new Usuario('Ana Gómez', 'UNLP', 'ana@unlp.edu', 'password456');
        const articulo = new ArticuloRegular('Título 1', 'http://archivo1.com', 'Resumen del artículo 1', [autor], autor);

        const revisor = new Revisor('Luis Fernández', 'UNLP', 'luis@unlp.edu', 'password123');

        revisor.realizarRevision(articulo, 'Texto de la revisión 1', 1, 'General');
        revisor.realizarRevision(articulo, 'Texto de la revisión 2', 2, 'General');
        revisor.realizarRevision(articulo, 'Texto de la revisión 3', 3, 'General');

        expect(() => revisor.realizarRevision(articulo, 'Texto de la revisión 4', -2, 'General'))
            .toThrow('No se pueden añadir más de 3 revisiones.');
    });
});
