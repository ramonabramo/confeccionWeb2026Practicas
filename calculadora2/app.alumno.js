/**
 * =============================================================================
 * CALCULADORA CORTA: POTENCIA (x^y), RAÍZ (√), RESTO (mod) Y PORCENTAJE (%)
 * PLANTILLA PARA EL ALUMNADO
 * =============================================================================
 * Autor: Ramón Abramo
 *
 * Basada en la solución de clase (Versión 0): agrupamos los botones en
 * números, operadores y acciones, y las cuentas van en funciones puras.
 *
 * Operaciones de DOS números (se escribe número, operador, número e =):
 * - x^y : potencia.                        2 x^y 3 = 8
 * - mod : resto de la división entera.     17 mod 5 = 2
 *
 * Operaciones de UN número (se aplican al momento a lo que hay en pantalla):
 * - √   : raíz cuadrada.                   9 √ → 3
 * - %   : porcentaje (divide entre 100).   50 % → 0.5
 * Su resultado vale como segundo número:   2 x^y 9 √ = 8   ·   4 x^y 50 % = 2
 *
 * Instrucciones:
 * - Renombrad este archivo a app.js (el index.html carga app.js).
 * - Completad los bloques TODO en orden, del 1 al 8.
 * - Después de cada TODO: guardad, recargad (F5) y haced la prueba 🧪.
 *   No paséis al siguiente hasta que la prueba salga bien.
 * - Tened la consola abierta (F12): ahí salen los errores y ahí podéis
 *   probar las funciones de cálculo sin tocar ningún botón.
 * =============================================================================
 */


// =============================================================================
// PREPARATIVOS: FUNCIONES DE CÁLCULO, MEMORIA Y DOM
// =============================================================================

// TODO 1: Funciones de cálculo
// Cread funciones que solo hagan cuentas: reciben números y devuelven el resultado.
// Una para las operaciones de dos números (potencia y resto) y otras para la raíz
// y el porcentaje. Redondead los resultados y devolved 'Error' cuando no se pueda.
// 🧪 Probadlas en la consola: la potencia de 2 y 3 da 8, y el resto de 17 entre 5 da 2.


// TODO 2: La memoria de la calculadora
// Declarad las variables que la calculadora necesita recordar: el número de antes,
// la operación pendiente y si el próximo dígito empieza un número nuevo.


// TODO 3: Los elementos de la página
// Seleccionad la pantalla y los botones, agrupados en números, operadores y acciones.
// 🧪 En la consola: 10 números, 2 operadores y 4 acciones.


// =============================================================================
// LOS BOTONES
// =============================================================================

// TODO 4: Los números
// Al pulsar un número, tiene que aparecer en pantalla detrás de los anteriores.
// 🧪 1 2 3 → 123     0 0 7 → 7


// TODO 5: Los operadores (xʸ y mod)
// Al pulsar un operador, guardad el número de la pantalla y la operación,
// y preparad la pantalla para el segundo número.
// 🧪 2 xʸ 3 → se ve 3


// TODO 6: El igual y el borrar
// El igual hace la operación pendiente y muestra el resultado.
// El borrar deja la calculadora como recién encendida.
// 🧪 2 xʸ 3 = → 8     17 mod 5 = → 2     999 C → 0


// TODO 7: La raíz y el porcentaje
// Se aplican al momento al número de la pantalla. Su resultado también
// tiene que servir como segundo número de una operación pendiente.
// 🧪 9 √ → 3     50 % → 0.5     2 xʸ 9 √ = → 8


// TODO 8: Encadenar operaciones y controlar errores
// Si ya hay una operación pendiente y se pulsa otro operador, calculad antes el resultado.
// Con 'Error' en pantalla no se puede seguir operando.
// 🧪 2 xʸ 3 xʸ → ya se ve 8     5 mod 0 = → Error
