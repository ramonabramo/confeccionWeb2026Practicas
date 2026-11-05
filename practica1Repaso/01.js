// variables
let nombre = "";
let apellidos = "";
let ciudad = "";

// constantes

const tituloFicha = 'Ficha de Usuario';

const divSalida = document.querySelector('#salida');

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

// utilizando 3 innerHTML
// divSalida.innerHTML = `<p>Nombre: ${nombre}</p>`;
// divSalida.innerHTML += `<p>Apellidos: ${apellidos}</p>`;
// divSalida.innerHTML += `<p>Ciudad: ${ciudad}</p>`;

// utilizando 1 innerHTML
divSalida.innerHTML = `
        <h2>${tituloFicha}</h2>
        <p>Nombre: ${nombre}</p> 
        <p>Apellidos: ${apellidos}</p>
        <p>Ciudad: ${ciudad}</p>
    `;
