# TyH2024-Tpfinal
Trabajo práctico final de Técnicas y Herramientas, año 2024.

# Patrones utilizados:

Los patrones utilizados son:
Observer: "Artículo" actúa como el sujeto observable, "Usuario" como el observador. (métodos addObserver() y notifyObservers() en Artículo)

Strategy: MetodoSelección es la interfaz que define la estrategia de selección de artículos. las implementaciones concretas de estrategias de selección son MetodoSeleccionCorteFijo y MetodoSeleccionMejores.
Sesión y sus sublcaes usan el método "setMetodoSeleccion(metodo: MetodoSeleccion, tipoArticulo: TipoArticulo) para configurar la estrategia de selección.

Factory: "Conferencia" actúa como una fábrica que crea instancias de "Sesion" utilizando el método crearSesion(tipo: TipoSesion)

Composite: La relación entre "Sesion" y "Articulo" donde una sesión puede contener múltimples artículos y se puede manejar de manera uniforme.


# Consideraciones agregadas que no figuran en la consigna:

- Se agregó una lógica que valida lo siguiente: 
a) Si autorEncargado no está especificado, se utiliza como encargado el primer autor de la lista.
b) Si el autorEncargado está especificado pero no está en la lista de autores, lanza una excepción.
c) Si el autorEcnargado está especificado y está en la lista de autores, se setea como autorEncargado.
- Se agregó una lógica que se prefiere a un revisor que no expresó interés alguno vs a uno cuyo tipo de interés es "NO.INTERESADO".
