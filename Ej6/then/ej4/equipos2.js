(() => {
    const selectEquipo = document.getElementById('equipoSelect');
    const datosEquipoDiv = document.getElementById('datosEquipo');

    fetch('equipos2.json')
    .then(response =>{
        if (!response.ok) {
            throw new Error(`HTTP error! status:${response.status}`);
    }
        return response.json()
 })
        .then(equipos=>{

        
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
        })
        .catch(error=>{
            console.log('Error al cargar datos');
        });
       
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