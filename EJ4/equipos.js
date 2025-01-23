(() => {
    const selectEquipo = document.getElementById('equipoSelect');
    const datosEquipoDiv = document.getElementById('datosEquipo');

    const xhr = new XMLHttpRequest();
    xhr.addEventListener("readystatechange", () => {
        if (xhr.readyState === 4 && xhr.status === 200) {
            const equipos = JSON.parse(xhr.responseText);
            
            // Cargar opciones en el select
            equipos.forEach(equipo => {
                const option = document.createElement('option');
                option.value = equipo.Nombre;
                option.textContent = equipo.Nombre;
                selectEquipo.appendChild(option);
            });

            // Evento al cambiar la selección
            selectEquipo.addEventListener('change', function() {
              const selectedTeam = selectEquipo.value;
              
              if (selectedTeam) {
                const equipoSeleccionado = equipos.find(equipo => equipo.Nombre === selectedTeam);
                  if(equipoSeleccionado){
                    mostrarDatosEquipo(equipoSeleccionado);
                  }
              } else {
                  datosEquipoDiv.innerHTML = '';
              }
          });


        } else if (xhr.readyState === 4 && xhr.status !== 200) {
            datosEquipoDiv.textContent = 'Error al cargar los datos.';
        }
    });
    xhr.open("GET", "equipos.json", true);
    xhr.send();

    function mostrarDatosEquipo(equipo) {
        datosEquipoDiv.innerHTML = `
            <p><strong>Nombre:</strong> ${equipo.Nombre}</p>
            <p><strong>Partidos Jugados:</strong> ${equipo.PartidosJugados}</p>
            <p><strong>Partidos Ganados:</strong> ${equipo.PartidosGanados}</p>
            <p><strong>Partidos Perdidos:</strong> ${equipo.PartidosPerdidos}</p>
            <p><strong>Partidos Empatados:</strong> ${equipo.PartidosEmpatados}</p>
        `;
    }
})();