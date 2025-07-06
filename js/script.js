const nombrePaciente = localStorage.getItem("sesionActiva") ? JSON.parse(localStorage.getItem("sesionActiva")).nombre : null;
const boxLogin = document.querySelector(".userLog");
const titulo = document.querySelector(".titulo");
const formulario = document.getElementById("formulario");
const btnRegistro = document.querySelector(".btnRegistro");
const txtRegistro = document.querySelector(".txtRegistro");





boxLogin.addEventListener("click", (e) => {
    e.preventDefault();
    const nombre = localStorage.getItem("sesionActiva");
        if (nombre) {
            if (confirm("¿Está seguro que desea cerrar sesión?")) {
                localStorage.removeItem("sesionActiva");
                window.location.href = "index.html";
        boxLogin.innerHTML = `<img src="img/acceso.png" alt="User Icon"><span class="userLog">Login</span>`;
            }
        } else {
            window.location.href = "login.html";
        }
    }
);

document.addEventListener("DOMContentLoaded", () => {
    if (nombrePaciente) {
        boxLogin.innerHTML = `<img src="img/acceso.png" alt="User Icon"><span class="userLog">${nombrePaciente}</span>`;
        titulo.innerHTML = `Bienvenido al Hospital Philips, ${nombrePaciente}`;
        btnRegistro.style.display = "none";
        txtRegistro.style.display = "none";
    } else {
        boxLogin.innerHTML = `<img src="img/acceso.png" alt="User Icon"><span class="userLog">Login</span>`;
        titulo.innerHTML = "Bienvenido al Hospital Philips, invitado";
    }
});

formulario.addEventListener("submit", (e) => {
    e.preventDefault();

    const nombre = document.getElementById("nombre").value.trim();
    const email = document.getElementById("email").value.trim();
    const mensaje = document.getElementById("mensaje").value.trim();

    if (nombre && email && mensaje) {
        alert("Formulario enviado exitosamente.");
        formulario.reset();
    } else {
        alert("Por favor, complete todos los campos.");
    }
});

