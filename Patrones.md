#Patrones utilizados:

Los patrones utilizados son:
Singleton (Para garantizar que solo exista una instancia del sistema de conferencias en ejecución.)
Observer: para notificar a los observadores sobre cambios en el estado del un artículo (cuando se envía, modifica, revisa, etc).
Strategy: Para implementar los diferentes criterios de selección de artículos en el proceso de selección.
Factory: Para crear instancias de "usuario" y "artículo".

Se decidió, para una mayor claridad en el código, que las clases que implementen un determinado patrón, tendrán como nombre ese patrón.