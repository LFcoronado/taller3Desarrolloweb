let tareas = [];

function añadirTareas() {
    const titulo = document.getElementById("tituloTarea").value;
    const descripcion = document.getElementById("DescripciónTarea").value;
    const prioridad = document.getElementById("p").value;
    const fecha = document.getElementById("fecha").value;

    if (titulo === "" || fecha === "") {
        alert("Ingresa el titulo y la fecha");
        return;
    }

    const tarea = {
        titulo, 
        descripcion, 
        prioridad, 
        fecha: new Date(fecha)
    };

    tareas.push(tarea);
    ordenarTareas();
    mostrarTareas(); 
    limpiar();
    programarNotificacion(tarea);
}

function limpiar() {
    document.getElementById("tituloTarea").value = "";
    document.getElementById("DescripciónTarea").value = "";
    document.getElementById("p").value = "baja";
    document.getElementById("fecha").value = "";
}

function ordenarTareas() {
    tareas.sort((a, b) => {
        const prioridadOrden = { "alta": 1, "media": 2, "baja": 3 };
        if (prioridadOrden[a.prioridad] !== prioridadOrden[b.prioridad]) {
            return prioridadOrden[a.prioridad] - prioridadOrden[b.prioridad];
        }
        return a.fecha - b.fecha;
    });
}

function mostrarTareas() {
    const tareasLista = document.getElementById('tareaslist');
    tareasLista.innerHTML = '';

    tareas.forEach(tarea => {
        const listItems = document.createElement('li');
        listItems.classList.add('task-item');
        listItems.classList.add(`priority-${tarea.prioridad}`);

        listItems.innerHTML = `
            <span>${tarea.titulo}</span>
            <div>
                <span>Vence: ${tarea.fecha.toLocaleDateString()}</span>
            </div>
        `;
        tareasLista.appendChild(listItems); 
    });
}

function programarNotificacion(tarea) {
    const tiempoNotificacion = new Date(tarea.fecha);
    tiempoNotificacion.setMinutes(tiempoNotificacion.getMinutes() - 10); 

    const ahora = new Date();
    const tiempoHastaNotificacion = tiempoNotificacion - ahora;

    if (tiempoHastaNotificacion > 0) {
        setTimeout(() => {
            mostrarNotificacion(tarea.titulo);
        }, tiempoHastaNotificacion);
    }
}

// mosrar notificación
function mostrarNotificacion(titulo) {
    if (Notification.permission === 'granted') {
        new Notification(`Recordatorio: La tarea "${titulo}" está a punto de vencer.`);
    } else if (Notification.permission !== 'denied') {
        Notification.requestPermission().then(permiso => {
            if (permiso === 'granted') {
                new Notification(`Recordatorio: La tarea "${titulo}" está a punto de vencer.`);
            }
        });
    }
}
