let clientes=[];

async function cargarClientes() {
    try{
        const response = await fetch('clientes2.json');
        if (!response.ok){
            throw new Error(`HTTP error! status:${response.status}`);
        }
        clientes=await response.json();
        console.log('clientes cargados correctamente:',clientes);
        }catch(error){
            console.log('Error al cargar clientes:',error);
    }
}

const opcion =document.getElementById('opcion');
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
document.addEventListener('DOMContentLoaded', async() =>{
    await cargarClientes();
});