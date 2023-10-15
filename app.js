function guardarDatos() {
  const ganador1 =
    document.getElementById("nombre1").options[
      document.getElementById("nombre1").selectedIndex
    ].text;
  const ganador2 =
    document.getElementById("nombre2").options[
      document.getElementById("nombre2").selectedIndex
    ].text;
  const perdedor1 =
    document.getElementById("rival1").options[
      document.getElementById("rival1").selectedIndex
    ].text;
  const perdedor2 =
    document.getElementById("rival2").options[
      document.getElementById("rival2").selectedIndex
    ].text;

  const partido = {
    ganador1,
    ganador2,
    perdedor1,
    perdedor2,
  };

  let partidosGuardados = JSON.parse(localStorage.getItem("partidos")) || [];
  partidosGuardados.push(partido);

  localStorage.setItem("partidos", JSON.stringify(partidosGuardados));

  // Guardar la estructura de la tabla
  const tablaClasificacion = document.getElementById(
    "tabla-clasificacion"
  ).innerHTML;
  localStorage.setItem("tablaClasificacion", tablaClasificacion);

  mostrarDatosGuardados(partidosGuardados);

  actualizarTabla();
}

function mostrarDatosGuardados(partidos) {
  const contenedorDatos = document.getElementById("datosGuardados");
  contenedorDatos.innerHTML = "";

  partidos.forEach((partido, index) => {
    const div = document.createElement("div");
    div.classList.add("partido");

    const contenidoPartido = document.createElement("span");
    contenidoPartido.innerText = `Partido ${index + 1}: Ganadores: ${
      partido.ganador1
    }, ${partido.ganador2} - Perdedores: ${partido.perdedor1}, ${
      partido.perdedor2
    }`;

    const botonEliminar = document.createElement("button");
    botonEliminar.innerText = "Eliminar";
    botonEliminar.addEventListener("click", () => eliminarPartido(index));

    div.appendChild(contenidoPartido);
    div.appendChild(botonEliminar);
    contenedorDatos.appendChild(div);
  });
}


function eliminarPartido(index) {
  let partidosGuardados = JSON.parse(localStorage.getItem("partidos")) || [];
  partidosGuardados.splice(index, 1);
  localStorage.setItem("partidos", JSON.stringify(partidosGuardados));
  mostrarDatosGuardados(partidosGuardados);

  actualizarTabla();
}

// Llamada para mostrar los datos guardados al cargar la página
const partidosGuardados = JSON.parse(localStorage.getItem("partidos")) || [];
mostrarDatosGuardados(partidosGuardados);





//----------------funcion actualizar tabla-----------------

function actualizarTabla(partidosGuardados) {
    const tablaBody = document.getElementById('tabla-body');

    // Limpiar el cuerpo de la tabla
    tablaBody.innerHTML = '';

    // Mapa para mantener el seguimiento de los datos de cada jugador
    const jugadores = {};

    partidosGuardados.forEach(partido => {
        // Ganador 1
        if (!jugadores[partido.ganador1]) {
            jugadores[partido.ganador1] = { PJ: 0, PG: 0, PP: 0, Puntos: 0 };
        }
        if (jugadores[partido.ganador1].PJ < 10) {
            jugadores[partido.ganador1].PJ++;
            jugadores[partido.ganador1].PG++;
            jugadores[partido.ganador1].Puntos += 3;
        }

        // Ganador 2
        if (!jugadores[partido.ganador2]) {
            jugadores[partido.ganador2] = { PJ: 0, PG: 0, PP: 0, Puntos: 0 };
        }
        if (jugadores[partido.ganador2].PJ < 10) {
            jugadores[partido.ganador2].PJ++;
            jugadores[partido.ganador2].PG++;
            jugadores[partido.ganador2].Puntos += 3;
        }

        // Perdedores
        if (!jugadores[partido.perdedor1]) {
            jugadores[partido.perdedor1] = { PJ: 0, PG: 0, PP: 0, Puntos: 0 };
        }
        if (jugadores[partido.perdedor1].PJ < 10) {
            jugadores[partido.perdedor1].PJ++;
            jugadores[partido.perdedor1].PP++;
            jugadores[partido.perdedor1].Puntos -= 1;
            jugadores[partido.perdedor1].Puntos = Math.max(0, jugadores[partido.perdedor1].Puntos);
        }

        if (!jugadores[partido.perdedor2]) {
            jugadores[partido.perdedor2] = { PJ: 0, PG: 0, PP: 0, Puntos: 0 };
        }
        if (jugadores[partido.perdedor2].PJ < 10) {
            jugadores[partido.perdedor2].PJ++;
            jugadores[partido.perdedor2].PP++;
            jugadores[partido.perdedor2].Puntos -= 1;
            jugadores[partido.perdedor2].Puntos = Math.max(0, jugadores[partido.perdedor2].Puntos);
        }
    });

    // Ordenar jugadores por puntos (mayor a menor)
    const jugadoresOrdenados = Object.entries(jugadores)
        .sort((a, b) => b[1].Puntos - a[1].Puntos);

    // Crear y agregar filas al cuerpo de la tabla
    jugadoresOrdenados.forEach((jugador, index) => {
        const [nombre, datos] = jugador;
        const fila = tablaBody.insertRow();
        fila.innerHTML = `<td>${index + 1}º</td><td>${nombre}</td><td>${datos.PJ}</td><td>${datos.PG}</td><td>${datos.PP}</td><td>${datos.Puntos}</td>`;
    });
}

// Llamar a actualizarTabla() al cargar la página para mostrar la tabla inicialmente
actualizarTabla(partidosGuardados);



  
