const formulario = document.querySelector(".login-form-container");
const nombreInput = document.getElementById("usuario");
const contrasenaInput = document.getElementById("contraseña");
const error = document.querySelector(".error");

formulario.addEventListener("submit", (e) => {

    e.preventDefault();
    const nombre = nombreInput.value.trim();
    const contraseña = contrasenaInput.value.trim();
    const localStorageRegistros = JSON.parse(localStorage.getItem("pacientes"));

    if(nombre && contraseña) {
        if (localStorageRegistros) {
            const registro = localStorageRegistros.find(reg => reg.usuario === nombre && reg.password === contraseña);
            if (registro) {
                localStorage.setItem("sesionActiva", JSON.stringify({nombre: registro.nombre, usuario: registro.usuario}));
                window.location.href = "index.html";
            } else {
                error.textContent = "Usuario o contraseña incorrectos.";
                error.style.display = "block";
            }
        }
    }
})

document.addEventListener("DOMContentLoaded", () => {
    alert("¡Bienvenido al sistema de gestión de pacientes!");
})