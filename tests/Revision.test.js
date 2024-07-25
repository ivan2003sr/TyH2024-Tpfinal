const Revision = require('../src/models/Revision');
const { TipoDeInteres } = require('../src/models/enums');

describe('Revision', () => {
    test('Debería crear una Revision con el texto, puntaje y tipo de interés especificados', () => {
        const texto = 'Este es un comentario de revisión.';
        const puntaje = 3;
        const tipoDeInteres = TipoDeInteres.ALTO;
        const revision = new Revision(texto, puntaje, tipoDeInteres);

        expect(revision.texto).toBe(texto);
        expect(revision.puntaje).toBe(puntaje);
        expect(revision.tipoDeInteres).toBe(tipoDeInteres);
    });

    test('Debería crear una Revision con puntaje y tipo de interés medio', () => {
        const texto = 'Comentario de revisión medio.';
        const puntaje = 3;
        const tipoDeInteres = TipoDeInteres.MEDIO;
        const revision = new Revision(texto, puntaje, tipoDeInteres);

        expect(revision.texto).toBe(texto);
        expect(revision.puntaje).toBe(puntaje);
        expect(revision.tipoDeInteres).toBe(tipoDeInteres);
    });

    test('Debería crear una Revision con puntaje y tipo de interés bajo', () => {
        const texto = 'Comentario de revisión bajo.';
        const puntaje = 1;
        const tipoDeInteres = TipoDeInteres.BAJO;
        const revision = new Revision(texto, puntaje, tipoDeInteres);

        expect(revision.texto).toBe(texto);
        expect(revision.puntaje).toBe(puntaje);
        expect(revision.tipoDeInteres).toBe(tipoDeInteres);
    });

    test('Una revisión con un puntaje fuera del rango, debe dar error.', () => {
        const texto = 'Comentario de revisión bajo.';
        const puntaje = 4;
        const tipoDeInteres = TipoDeInteres.BAJO;
        expect(() => new Revision(texto, puntaje, tipoDeInteres)).toThrow('El puntaje debe estar en el rango de -3 a 3.');
    });
});