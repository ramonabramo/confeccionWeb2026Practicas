// variables
let nombre = "";
let apellidos = "";
let ciudad = "";

// constantes

const tituloFicha = 'Ficha de Usuario';

const salidaNombre = document.querySelector('#salidaNombre');
const salidaApellidos = document.querySelector('#salidaApellidos');
const salidaCiudad = document.querySelector('#salidaCiudad');
const titulo = document.querySelector('#titulo');

// entradas
nombre = prompt('Introduce tu nombre:');
apellidos = prompt('Introduce tus apellidos');
ciudad = prompt('introduce tu ciudad');

// procesamiento

// salidas

// a consola
console.log('Nombre: ' + nombre);
console.log("Apellidos: " + apellidos);
console.log(`Ciudad: ${ciudad}`);

// alert

// en tres mensajes
alert('Nombre: ' + nombre);
alert("Apellidos: " + apellidos);
alert(`Ciudad: ${ciudad}`);

// en un mensaje
alert(` Nombre: ${nombre} \n Apellidos: ${apellidos} \n Ciudad: ${ciudad}`);

// colocarlo en el DOM

salidaNombre.innerHTML = nombre;
salidaApellidos.innerHTML = apellidos;
salidaCiudad.innerHTML = ciudad;
titulo.innerHTML = tituloFicha;