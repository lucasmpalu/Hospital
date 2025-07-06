const formulario = document.getElementById("formulario");

formulario.addEventListener("submit", (e) => {
    e.preventDefault();

    const paciente = {
        nombre: document.getElementById("nombre").value.trim(),
        cpf: document.getElementById("cpf").value.trim().replace(/[.-]/g, ''),
        nacimiento: document.getElementById("nacimiento").value.trim(),
        direccion: document.getElementById("direccion").value.trim(),
        convenio: document.getElementById("convenio").value.trim(),
        telefono: document.getElementById("telefono").value.trim(),
        email: document.getElementById("email").value.trim(),
        usuario: document.getElementById("usuario").value.trim(),
        password: document.getElementById("password").value.trim(),
        observaciones: document.getElementById("observaciones").value.trim(),
    };

    const errores = {
        nombre: '',
        cpf: '',
        nacimiento: '',
        direccion: '',
        convenio: '',
        telefono: '',
        email: '',
        usuario: '',
        password: '',
        observaciones: ''
    };

    if(paciente.nombre === '') {
        errores.nombre = 'El nombre es obligatorio';
    } else if (paciente.nombre.length < 3) {
        errores.nombre = 'El nombre debe tener al menos 3 caracteres';
    }

    if (!/^\d{11}$/.test(paciente.cpf)) {
        errores.cpf = 'El CPF debe tener exactamente 11 dígitos numéricos';
    }

    if(paciente.nacimiento === '') {
        errores.nacimiento = 'La fecha de nacimiento es obligatoria';
    }

    if(paciente.direccion === '') {
        errores.direccion = 'La dirección es obligatoria';
    }

    if(paciente.convenio === '') {
        errores.convenio = 'El convênio es obligatorio';
    }

    if (!/^\d{10,11}$/.test(paciente.telefono)) {
        errores.telefono = 'El teléfono debe tener 10 u 11 dígitos';
    }

    if (paciente.email === '' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(paciente.email)) {
        errores.email = 'El email no es válido';
    }

    if(paciente.usuario === '') {
        errores.usuario = 'El nombre de usuario es obligatorio';
    }

    if(paciente.password.length < 6) {
        errores.password = 'La contraseña debe tener al menos 6 caracteres';
    }

    const mensajesError = Object.values(errores).filter(msg => msg !== '');
    if (mensajesError.length > 0) {
        alert(mensajesError.join("\n"));
        return;
    }



        const pacientes = JSON.parse(localStorage.getItem("pacientes")) || [];
        pacientes.push(paciente);
        localStorage.setItem("pacientes", JSON.stringify(pacientes));

        alert("Registro guardado exitosamente.\n" +
            "Datos del paciente:\n" +
            "Nombre: " + paciente.nombre + "\n" +
            "CPF: " + paciente.cpf + "\n" +
            "Fecha de Nacimiento: " + paciente.nacimiento + "\n" +
            "Dirección: " + paciente.direccion + "\n" +
            "Convênio: " + paciente.convenio + "\n" +
            "Teléfono: " + paciente.telefono + "\n" +
            "Email: " + paciente.email + "\n" +
            "Usuario: " + paciente.usuario + "\n" +
            "Observaciones: " + paciente.observaciones);
        formulario.reset();
        window.location.href = "index.html";
        localStorage.setItem("sesionActiva", JSON.stringify({nombre: paciente.nombre, usuario: paciente.usuario}));

});

document.addEventListener("DOMContentLoaded", () => {
alert("Por favor, complete el formulario de registro.");
})