let clientes = [];

function cargarClientes() {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'clientes.json', true);
    xhr.onload = function () {
        if (xhr.status === 200) {
            clientes = JSON.parse(xhr.responseText);
            console.log('Clientes cargados correctamente:', clientes);
        } else {
            console.log('Error al cargar los clientes. Código de estado:', xhr.status);
        }
    };
    xhr.send();
}

const opcion = document.getElementById('opcion');
const añadirLocalidad = document.getElementById('añadirLocalidad');
const añadirCuota = document.getElementById('añadirCuota');
const botonMostrarClientes = document.getElementById('mostrarClientes');
const tablaClientes = document.getElementById('tablaClientes').querySelector('tbody');

// Manejador de cambios en el menú desplegable
opcion.addEventListener('change', function () {
    const opcionSeleccionada = opcion.value;

    if (opcionSeleccionada === 'localidad') {
        añadirLocalidad.style.display = 'block';
        añadirCuota.style.display = 'none';
    } else if (opcionSeleccionada === 'cuota') {
        añadirLocalidad.style.display = 'none';
        añadirCuota.style.display = 'block';
    } else {
        añadirLocalidad.style.display = 'none';
        añadirCuota.style.display = 'none';
    }
});

// Función para mostrar los clientes en la tabla
function mostrarClientes(clientesFiltrados) {
    tablaClientes.innerHTML = '';
    clientesFiltrados.forEach(cliente => {
        const fila = `<tr>
            <td>${cliente.nombre}</td>
            <td>${cliente.localidad}</td>
            <td>${cliente.cuota}</td>
        </tr>`;
        tablaClientes.innerHTML += fila;
    });
}

// Manejador del botón de búsqueda
botonMostrarClientes.addEventListener('click', function () {
    const opcionSeleccionada = opcion.value;

    if (opcionSeleccionada === 'todos') {
        mostrarClientes(clientes);
    } else if (opcionSeleccionada === 'localidad') {
        const localidad = document.getElementById('localidad').value.trim();
        const clientesFiltrados = clientes.filter(cliente => cliente.localidad.toLowerCase() === localidad.toLowerCase());
        console.log(`Filtrados por localidad (${localidad}):`, clientesFiltrados);
        mostrarClientes(clientesFiltrados);
    } else if (opcionSeleccionada === 'cuota') {
        const cuota = parseFloat(document.getElementById('cuota').value);
        const clientesFiltrados = clientes.filter(cliente => cliente.cuota > cuota);
        console.log(`Filtrados por cuota mayor a (${cuota}):`, clientesFiltrados);
        mostrarClientes(clientesFiltrados);
    }
});

// Cargar los clientes al cargar la página
document.addEventListener('DOMContentLoaded', cargarClientes);
