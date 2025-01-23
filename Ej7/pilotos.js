const contenedorPilotos = document.getElementById('pilotos-container');
const selectorOrden = document.getElementById('sort');
const inputNacionalidad = document.getElementById('nacionalidad');
const botonAnterior = document.getElementById('prev-page');
const botonSiguiente = document.getElementById('next-page');
const visualizadorPagina = document.getElementById('page-number');
const botonVerTodos = document.getElementById("view-all");


let pilotos = [];
let paginaActual = 1;
const pilotosPorPagina = 3;
let vistaTodosPilotos = false;
let pilotoDestacado = null;

async function obtenerPilotos() {
    try {
        const respuesta = await fetch('pilotos.json');
        if (!respuesta.ok) {
            throw new Error(`HTTP error! status: ${respuesta.status}`);
        }
        const datos = await respuesta.json();
        pilotos = datos.pilotos;
        renderizarPilotos();
        actualizarBotonesPaginacion();
    } catch (error) {
        console.error('Error al cargar los pilotos:', error);
        contenedorPilotos.innerHTML = '<p>Error al cargar los pilotos.</p>';
    }
}

function renderizarPilotos() {
    contenedorPilotos.innerHTML = '';
    const pilotosAMostrar = vistaTodosPilotos ? pilotos : obtenerPilotosPaginaActual();

    let tabla = document.createElement('table');
    tabla.classList.add('pilotos-table');
    let encabezadoTabla = document.createElement('thead');
    encabezadoTabla.innerHTML = `
            <tr>
                <th>Nombre</th>
                <th>Equipo</th>
                <th>Número</th>
                <th>Nacionalidad</th>
                <th>Acción</th>
            </tr>
        `;
    tabla.appendChild(encabezadoTabla);

    let cuerpoTabla = document.createElement('tbody');

    pilotosAMostrar.forEach(piloto => {
        const fila = document.createElement('tr');
        fila.classList.add('piloto-fila');
        const botonSeleccionar = document.createElement('button');
        botonSeleccionar.textContent = "Seleccionar";
        botonSeleccionar.classList.add('seleccionar-btn');
        botonSeleccionar.addEventListener('click', (e) => {
            e.stopPropagation();
            destacarPiloto(piloto);
        });

        fila.innerHTML = `
               <td class='piloto-celda' data-nombre="${piloto.nombre}">${piloto.nombre}</td>
               <td>${piloto.equipo}</td>
               <td>${piloto.numero}</td>
               <td>${piloto.nacionalidad}</td>
                <td></td>
            `;

        const celdaAccion = fila.querySelector('td:last-child');
        celdaAccion.appendChild(botonSeleccionar);
         if (pilotoDestacado && pilotoDestacado.nombre === piloto.nombre) {
          fila.classList.add('destacado');
           }
        cuerpoTabla.appendChild(fila);
    });

    tabla.appendChild(cuerpoTabla);
    contenedorPilotos.appendChild(tabla);
}

function destacarPiloto(piloto) {
    if (pilotoDestacado && pilotoDestacado.nombre === piloto.nombre) {
         pilotoDestacado = null;
    } else {
       pilotoDestacado = piloto;
    }

    renderizarPilotos();
}

function obtenerPilotosPaginaActual() {
    const indiceInicio = (paginaActual - 1) * pilotosPorPagina;
    const indiceFin = indiceInicio + pilotosPorPagina;
    return pilotos.slice(indiceInicio, indiceFin);
}

function actualizarBotonesPaginacion() {
    const totalPaginas = Math.ceil(pilotos.length / pilotosPorPagina);
    botonAnterior.disabled = paginaActual <= 1 || vistaTodosPilotos;
    botonSiguiente.disabled = paginaActual >= totalPaginas || vistaTodosPilotos;
    visualizadorPagina.textContent = vistaTodosPilotos ? 'Todos' : `${paginaActual}/${totalPaginas}`;
}

function ordenarPilotos(valorOrden) {
    const [clave, orden] = valorOrden.split('_');

    pilotos.sort((a, b) => {
        const valorA = a[clave];
        const valorB = b[clave];

        if (typeof valorA === 'number' && typeof valorB === 'number') {
            return orden === 'asc' ? valorA - valorB : valorB - valorA;
        } else {
            return orden === 'asc' ? valorA.localeCompare(valorB) : valorB.localeCompare(valorA);
        }
    });
    renderizarPilotos();
    actualizarBotonesPaginacion();
}


function filtrarPilotos(nacionalidad) {
    if (nacionalidad) {
        pilotos = pilotos.filter(piloto => piloto.nacionalidad.toLowerCase().includes(nacionalidad.toLowerCase()));
    } else {
        obtenerPilotos();
    }

    renderizarPilotos();
    actualizarBotonesPaginacion();
}

selectorOrden.addEventListener('change', (e) => {
    ordenarPilotos(e.target.value);

});

inputNacionalidad.addEventListener('input', (e) => {
    paginaActual = 1;
    filtrarPilotos(e.target.value);
});

botonAnterior.addEventListener('click', () => {
    if (paginaActual > 1) {
        paginaActual--;
        renderizarPilotos();
        actualizarBotonesPaginacion();
    }
});

botonSiguiente.addEventListener('click', () => {
    const totalPaginas = Math.ceil(pilotos.length / pilotosPorPagina);
    if (paginaActual < totalPaginas) {
        paginaActual++;
        renderizarPilotos();
        actualizarBotonesPaginacion();
    }
});

botonVerTodos.addEventListener('click', () => {
    vistaTodosPilotos = !vistaTodosPilotos;
    paginaActual = 1;
    renderizarPilotos();
    actualizarBotonesPaginacion();
    botonVerTodos.textContent = vistaTodosPilotos ? 'Ver paginado' : 'Ver todos';

});

obtenerPilotos();