
(()=>{

    // Array tareas vacio
        let tareas = [];
    
    // Referencias a elementos del DOM
    const inputTarea = document.getElementById("nuevaTarea");
    const botonCrear = document.getElementById("crearTarea");
    const listaTareas = document.getElementById("listaTareas");
    
    // Función para renderizar la lista de tareas
    function renderizarTareas() {
        listaTareas.innerHTML = ""; // Limpiar la lista
        tareas.forEach((tarea, index) => {
            // Crear elementos para cada tarea
            const li = document.createElement("li");
            const checkbox = document.createElement("input");
            checkbox.type = "checkbox";
            checkbox.checked = tarea.realizada;
    
            // Evento para marcar la tarea como completada
            checkbox.addEventListener("change", () => {
                tarea.realizada = checkbox.checked;
                li.className = tarea.realizada ? "incorrecto" : "";
            });
    
            // Texto de la tarea
            const textoTarea = document.createTextNode(tarea.texto);
    
            // Aplicar estilo si la tarea está completada
            if (tarea.realizada) {
                li.className = "incorrecto";
            }
    
            // Agregar elementos al DOM
            li.appendChild(checkbox);
            li.appendChild(textoTarea);
            listaTareas.appendChild(li);
        });
    }
    
    // Función para agregar una nueva tarea
    function agregarTarea() {
        const texto = inputTarea.value.trim();
        if (texto !== "") {
            tareas.push({ texto, realizada: false });
            inputTarea.value = ""; // Limpiar el input
            renderizarTareas(); // Actualizar la lista
        }
    }
    
    // Evento al hacer clic en el botón de crear tarea
    botonCrear.addEventListener("click", agregarTarea);
    
    
    
    fetch('tareas2.json')
    .then(response => {
        if (!response.ok){
            throw new Error(`HTTP error! status:${response.status}`);
        }
        return response.json();
    })
       .then(data=> {
            tareas=data;
            renderizarTareas();
       })
       .catch(error => {console.log('Error cargar las tareas:', error);
                
    });
    
    })();