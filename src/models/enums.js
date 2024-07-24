const TipoSesion = Object.freeze({
    REGULAR: 'Regular',
    WORKSHOP: 'Workshop',
    POSTER: 'Poster'
});

const TipoArticulo = Object.freeze({
    REGULAR: 'Regular',
    POSTER: 'Poster'
});

const EstadoArticulo = Object.freeze({
    RECEPCION: 'Recepcion',
    BIDDING: 'Bidding',
    ASIGNACION: 'Asignacion',
    REVISION: 'Revision',
    SELECCION: 'Seleccion',
    ACEPTADO: 'Aceptado',
    RECHAZADO: 'Rechazado'
});

const TipoDeInteres = Object.freeze({
    INTERESADO: 'Interesado',
    QUIZAS: 'Quizas',
    NO_INTERESADO: 'NoInteresado'
});

module.exports = { TipoSesion, TipoArticulo, EstadoArticulo, TipoDeInteres };
