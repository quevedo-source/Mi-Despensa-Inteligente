// Mostrar y ocultar pantallas
function mostrarLogin() {
    ocultarTodo();
    document.getElementById("pantalla-login").style.display = "block";
}

function mostrarRegistro() {
    ocultarTodo();
    document.getElementById("pantalla-registro").style.display = "block";
}

function volverInicio() {
    ocultarTodo();
    document.getElementById("pantalla-bienvenida").style.display = "block";
}

function mostrarFormularioAlimento() {
    ocultarTodo();
    document.getElementById("pantalla-alimento").style.display = "block";
}

function volverDashboard() {
    ocultarTodo();
    document.getElementById("pantalla-dashboard").style.display = "block";
    mostrarAlimentos();
}

// Función general para ocultar todas las pantallas
function ocultarTodo() {
    const pantallas = [
        "pantalla-bienvenida",
        "pantalla-login",
        "pantalla-registro",
        "pantalla-dashboard",
        "pantalla-alimento",
        "formulario-edicion"
    ];
    pantallas.forEach(id => document.getElementById(id).style.display = "none");
}

// Simulación de inicio de sesión
function iniciarSesion(event) {
    event.preventDefault();
    alert("Inicio de sesión exitoso ✅");
    ocultarTodo();
    document.getElementById("pantalla-dashboard").style.display = "block";
    mostrarAlimentos();
}

// Simulación de registro
function registrarUsuario(event) {
    event.preventDefault();
    alert("Usuario registrado correctamente 📝");
    volverInicio();
}

// Agregar un alimento nuevo
function guardarAlimento(event) {
    event.preventDefault();

    const nombre = document.getElementById("nombre-alimento").value;
    const fecha = document.getElementById("fecha-vencimiento").value;

    if (!nombre || !fecha) {
        alert("Por favor completa todos los campos 🍎");
        return;
    }

    let alimentos = JSON.parse(localStorage.getItem("alimentos")) || [];
    alimentos.push({ nombre, fecha });
    localStorage.setItem("alimentos", JSON.stringify(alimentos));

    document.getElementById("nombre-alimento").value = "";
    document.getElementById("fecha-vencimiento").value = "";

    alert("✅ Alimento guardado correctamente");
    volverDashboard();
}

function mostrarAlimentos() {
    const listaAlimentos = document.getElementById('listaAlimentos');
    listaAlimentos.innerHTML = "";

    const alimentos = JSON.parse(localStorage.getItem('alimentos')) || [];

    if (alimentos.length === 0) {
        listaAlimentos.innerHTML = "<li>No hay alimentos registrados.</li>";
        return;
    }

    const hoy = new Date().toISOString().split("T")[0];

    alimentos.forEach((item, index) => {
        const li = document.createElement("li");
        li.textContent = `🍽 ${item.nombre} - Vence: ${item.fecha}`;

        // Color según vencimiento
        li.style.backgroundColor = (item.fecha < hoy) ? "#f8d7da" : "#d4edda";

        const btnEditar = document.createElement("button");
        btnEditar.textContent = "✏";
        btnEditar.className = "btn btn-sm btn-warning ms-2";
        btnEditar.onclick = () => editarAlimento(index);

        const btnEliminar = document.createElement("button");
        btnEliminar.textContent = "❌";
        btnEliminar.className = "btn btn-sm btn-danger ms-2";
        btnEliminar.onclick = () => eliminarAlimento(index);

        li.appendChild(btnEditar);
        li.appendChild(btnEliminar);
        listaAlimentos.appendChild(li);
    });
}

function eliminarAlimento(index) {
    let alimentos = JSON.parse(localStorage.getItem("alimentos")) || [];
    alimentos.splice(index, 1);
    localStorage.setItem("alimentos", JSON.stringify(alimentos));
    mostrarAlimentos();
}

// === FUNCIONES DE EDICIÓN ===
let alimentoEditando = null;

function editarAlimento(index) {
    ocultarTodo();
    document.getElementById("formulario-edicion").style.display = "block";

    const alimentos = JSON.parse(localStorage.getItem("alimentos")) || [];
    const alimento = alimentos[index];
    alimentoEditando = index;

    document.getElementById("editar-nombre").value = alimento.nombre;
    document.getElementById("editar-fecha").value = alimento.fecha;
}

function guardarCambios(event) {
    event.preventDefault();

    const nombre = document.getElementById("editar-nombre").value;
    const fecha = document.getElementById("editar-fecha").value;

    if (!nombre || !fecha) {
        alert("Por favor completa todos los campos 🍏");
        return;
    }

    let alimentos = JSON.parse(localStorage.getItem("alimentos")) || [];
    alimentos[alimentoEditando] = { nombre, fecha };
    localStorage.setItem("alimentos", JSON.stringify(alimentos));

    alert("✅ Cambios guardados correctamente");
    volverDashboard();
}

function eliminarActual() {
    let alimentos = JSON.parse(localStorage.getItem("alimentos")) || [];
    alimentos.splice(alimentoEditando, 1);
    localStorage.setItem("alimentos", JSON.stringify(alimentos));

    alert("🗑 Alimento eliminado");
    volverDashboard();
}

// === FUNCIÓN PARA CAMBIAR ENTRE MODO CLARO Y OSCURO ===
function cambiarTema() {
    const body = document.body;
    body.classList.toggle("dark-mode");

    // Guardar el estado del modo en localStorage
    if (body.classList.contains("dark-mode")) {
        localStorage.setItem("modoOscuro", "true");
    } else {
        localStorage.setItem("modoOscuro", "false");
    }
}

// Cerrar sesión
function cerrarSesion() {
    alert("Has cerrado sesión 👋");
    volverInicio();
}

document.addEventListener("DOMContentLoaded", mostrarAlimentos);
