import {
    mostrarNumeroElementos, anadirElementoAlFinal, anadirElementoAlPrincipio, añadir, borrar, borrarElementoAlFinal, borrarElementoAlPrincipio, buscar, mostrarElementoPorPosicion,
    mostrarElementosOrdenados, mostrarElementosReverso, mostrarManera, mostrarPosicionDeElemento, mostrarTodosElementos
} from "./arrays.js";

class Disco {
    constructor(nombre, grupo, año, tipo, localizacion = 0, prestado = false, caratula = "imagen.png") {
        this.nombre = nombre;
        this.grupo = grupo;
        this.año = año;
        this.tipo = this.validarTipo(tipo);
        this.localizacion = localizacion;
        this.prestado = prestado;
        this.caratula = caratula;
    }

    validarTipo(tipo) {
        const tiposValidos = ["rock", "pop", "punk", "indie"];
        if (tiposValidos.includes(tipo.toLowerCase())) {
            return tipo;
        } else {
            return ("Tipo de música no válido. Los tipos permitidos son: " + tiposValidos.join(', '));
        }
    }

    cambiarLocalizacion(nuevaLocalizacion) {
        if (Number.isInteger(nuevaLocalizacion) && nuevaLocalizacion >= 0) {
            this.localizacion = nuevaLocalizacion;
        } else {
            return ("La localización debe ser un número entero mayor o igual a 0.");
        }
    }

    cambiarPrestado(estado) {
        if (estado === true || estado === false) {
            this.prestado = estado;
        } else {
            return ("El valor de " + prestado + " debe ser booleano (true o false).");
        }
    }

    mostrarInformacion() {
        return `
            Nombre del disco: ${this.nombre}
            Grupo/Cantante: ${this.grupo}
            Año de publicación: ${this.año}
            Tipo de música: ${this.tipo}
            Localización (número de estantería): ${this.localizacion}
            Prestado: ${this.prestado ? 'Sí' : 'No'}
            Carátula: ${this.caratula}
            </br>`;
    }
}

let discos = [];
(() => {
    const xhr = new XMLHttpRequest();
    xhr.addEventListener("readystatechange", () => {
        if (xhr.readyState === 4 && xhr.status === 200) {
            const xml = xhr.responseXML;
            const discos = xml.querySelectorAll("disco")
            discos.forEach(disco => {
                const nombre = disco.querySelector("nombre").textContent;
                const grupo = disco.querySelector("grupo").textContent;
                const año = disco.querySelector("año").textContent;
                const tipo = disco.querySelector("tipo").textContent;
                const localizacion = disco.querySelector("localizacion").textContent;
                const prestado = disco.querySelector("prestado").textContent;
                const caratula = disco.querySelector("caratula").textContent;
                crearNuevoDisco(nombre, grupo, año, tipo, localizacion, prestado, caratula);
            })
        }
    })

    xhr.open('GET','discos.xml',true);
    xhr.send();


})()

function crearNuevoDisco(titulo, grupo, ano, tipo, numeroDisco, prestado, portada) {
    discos.push(new Disco(titulo, grupo, ano, tipo, numeroDisco, prestado, portada));
}



function mostrarTablaDiscos() {
    if (discos.length === 0) {
        return '<p>No hay discos en la colección.</p>';
    }

    let orden = prompt('¿Cómo deseas mostrar los discos?\n1. Mostrar original \n2. Mostrar del revés \n3. Mostrar por orden alfabético');
    let discosOrdenados;

    if (orden == 2) {
        discosOrdenados = mostrarElementosReverso(discos);
    } else if (orden == 3) {
        discosOrdenados = mostrarElementosOrdenados(discos);
    } else {
        discosOrdenados = mostrarTodosElementos(discos);
    }

    let html = `<table border="1">
                    <tr>
                        <th>Nombre</th>
                        <th>Grupo</th>
                        <th>Año</th>
                        <th>Tipo</th>
                        <th>Localización</th>
                        <th>Prestado</th>
                        <th>Carátula</th>
                    </tr>`;

    discosOrdenados.forEach(disco => {
        html += `<tr>
                    <td>${disco.nombre}</td>
                    <td>${disco.grupo}</td>
                    <td>${disco.año}</td>
                    <td>${disco.tipo}</td>
                    <td>${disco.localizacion}</td>
                    <td>${disco.prestado ? 'Sí' : 'No'}</td>
                    <td>${disco.caratula}</td>
                </tr>`;
    });
    html += `</table>`;
    return html;
}
function mostrarDiscosPorAño() {
    const añoInicio = parseInt(prompt('Introduce el año de inicio del intervalo:'));
    const añoFin = parseInt(prompt('Introduce el año de fin del intervalo:'));

    const discosFiltrados = discos.filter(disco => disco.año >= añoInicio && disco.año <= añoFin);

    if (discosFiltrados.length === 0) {
        return 'No se encontraron discos en ese intervalo de años.';
    }

    let tabla = '<table border="1">';
    tabla += '<tr><th>Nombre</th><th>Grupo</th><th>Año</th><th>Tipo</th><th>Estantería</th><th>Prestado</th><th>Carátula</th></tr>';

    discosFiltrados.forEach(disco => {
        tabla += `<tr>
                    <td>${disco.nombre}</td>
                    <td>${disco.grupo}</td>
                    <td>${disco.año}</td>
                    <td>${disco.tipo}</td>
                    <td>${disco.localizacion}</td>
                    <td>${disco.prestado ? 'Sí' : 'No'}</td>
                    <td>${disco.caratula}</td>
                  </tr>`;
    });
    tabla += '</table>';
    return tabla;
}

function gestionar() {
    let opcion;
    opcion = prompt(`Selecciona una opción:
        1. Mostrar número de discos
        2. Mostrar tabla de discos
        3. Mostrar discos por intervalo de años
        4. Añadir un disco
        5. Borrar un disco
        6. Consultar un disco
        `);

    switch (opcion) {
        case '1':
            alert(mostrarNumeroElementos(discos));
            break;
        case '2':
            document.getElementById('resultado').innerHTML = mostrarTablaDiscos(discos);
            break;
        case '3':
            document.getElementById('resultado').innerHTML = mostrarDiscosPorAño();
            break;
        case '4':
            let respuesta = prompt("Lo quieres añadir al \n1. Principio \n2. Final");
            let nombre = prompt("Nombre:");
            let grupo = prompt("Grupo:");
            let año = prompt("Año:");
            let tipo = prompt("Tipo:");
            let localizacion = prompt("Localizacion:");
            let prestado = prompt("Prestado(true/false):");
            let caratula = prompt("Caratula(.jpg):");
            let elemento = new Disco(nombre, grupo, año, tipo, localizacion, prestado, caratula);
            if (respuesta == 1) {
                return anadirElementoAlPrincipio(discos, elemento);
            } else if (respuesta == 2) {
                return anadirElementoAlFinal(discos, elemento);
            }
            break;
        case '5':
            let respuesta2 = prompt("Quieres borrar al \n1. Principio \n2. Final");
            if (respuesta2 == 1) {
                return borrarElementoAlPrincipio(discos);
            } else if (respuesta2 == 2) {
                return borrarElementoAlFinal(discos);
            }
            break;
        case '6':
            let respuesta3 = prompt("quieres buscarlos por \n1. Posicion \n2. Nombre");
            if (respuesta3 == 1) {
                let posicion = prompt("Que posicion?");
                let nombres = discos.map(disco => disco.nombre);
                return alert("El elemento de la posicion " + posicion + " es: " + mostrarElementoPorPosicion(nombres, posicion));
            } else if (respuesta3 == 2) {
                let elemento = prompt("Cual es su nombre?");
                let nombres = discos.map(disco => disco.nombre);
                return alert("El elemento " + elemento + " esta en la posicion: " + mostrarPosicionDeElemento(nombres, elemento));
            }
            break;
        default:
            alert('Opción no válida.');
    }
}
document.getElementById("Gestionar").addEventListener("click", () => { gestionar() });
