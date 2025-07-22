document.addEventListener('DOMContentLoaded', function() {
const formBusqueda = document.getElementById('form-busqueda');
const selectOption = document.getElementById('option');
const busquedaInput = document.getElementById('busqueda');
const resultadoUsuario = document.getElementById('resultado-usuario');
const sesionActiva = JSON.parse(localStorage.getItem('sesionActiva')) || {};


const buscarPaciente = (tipoBusqueda, busqueda) => {

  const pacientesActualizados = JSON.parse(localStorage.getItem("pacientes")) || [];
    console.log('Pacientes en storage:', pacientesActualizados);
    console.log('Buscando:', tipoBusqueda, busqueda);
    const resultados = pacientesActualizados.filter(p => {
        if (tipoBusqueda === 'nombre') {
            return p.nombre && p.nombre.toLowerCase().includes(busqueda.toLowerCase());
        }
        if (tipoBusqueda === 'apellido') {
            return p.apellido && p.apellido.toLowerCase().includes(busqueda.toLowerCase());
        }
        if (tipoBusqueda === 'cpf') {
            return p.cpf && p.cpf.includes(busqueda);
        }
        if (tipoBusqueda === 'convenio') {
            return p.convenio && p.convenio.toLowerCase().includes(busqueda.toLowerCase());
        }
        return false;
    });
    console.log('Resultados:', resultados);

    if (resultados.length > 0) {
        resultadoUsuario.innerHTML = resultados.map(paciente => `
            <div class="card-paciente">
                <strong class="label">Nombre:</strong> ${paciente.nombre}<br>
                <strong class="label">Apellido:</strong> ${paciente.apellido}<br>
                <strong class="label">CPF:</strong> ${paciente.cpf}<br>
                <strong class="label">Email:</strong> ${paciente.email}<br>
                <strong class="label">Teléfono:</strong> ${paciente.telefono}<br>
                <strong class="label">Dirección:</strong> ${paciente.direccion}<br>
                <strong class="label">Convenio:</strong> ${paciente.convenio}<br>
                <strong class="label">Fecha de nacimiento:</strong> ${paciente.nacimiento}<br>
                <div class="acciones-paciente">
                    <button class="btn-editar" data-id="${paciente.id}">Editar</button>
                    <button class="btn-borrar" data-id="${paciente.id}">Borrar</button>
                </div>
            </div>
        `).join('');
    } else {
        resultadoUsuario.innerHTML = '<span style="color:red">Paciente no encontrado.</span>';
    }
}

const cerrarSesion = () => {
    localStorage.removeItem('sesionActiva');
    window.location.href = 'index.html';
}

resultadoUsuario.addEventListener('click', function(e) {
    const pacientesActualizados = JSON.parse(localStorage.getItem("pacientes")) || [];
    if (e.target.classList.contains('btn-borrar')) {
        const id = e.target.getAttribute('data-id');
        const nuevosPacientes = pacientesActualizados.filter(e => e.id !== id);
        localStorage.setItem('pacientes', JSON.stringify(nuevosPacientes));
        resultadoUsuario.innerHTML = "<span style='color:green'>Paciente eliminado exitosamente.</span>";
        buscarPaciente(selectOption.value, busquedaInput.value.trim());
    }
    if (e.target.classList.contains('btn-editar')) {
        const id = e.target.getAttribute('data-id');
        const paciente = pacientesActualizados.find(p => p.id === id);
        if (paciente) {
            document.getElementById('modal-editar').style.display = 'flex';
            document.getElementById('editar-id').value = paciente.id;
            document.getElementById('editar-nombre').value = paciente.nombre;
            document.getElementById('editar-apellido').value = paciente.apellido;
            document.getElementById('editar-cpf').value = paciente.cpf;
            document.getElementById('editar-email').value = paciente.email;
            document.getElementById('editar-telefono').value = paciente.telefono;
            document.getElementById('editar-direccion').value = paciente.direccion;
            document.getElementById('editar-convenio').value = paciente.convenio;
            document.getElementById('editar-nacimiento').value = paciente.nacimiento;
        }
    }
});

const cerrarModalBtn = document.getElementById('cerrar-modal');
cerrarModalBtn.addEventListener('click', function() {
    document.getElementById('modal-editar').style.display = 'none';
});

const formEditar = document.getElementById('form-editar');
formEditar.addEventListener('submit', function(e) {
    e.preventDefault();
    const pacientesActualizados = JSON.parse(localStorage.getItem("pacientes")) || [];
    const id = document.getElementById('editar-id').value;
    const nuevosDatos = {
        id,
        nombre: document.getElementById('editar-nombre').value,
        apellido: document.getElementById('editar-apellido').value,
        cpf: document.getElementById('editar-cpf').value,
        email: document.getElementById('editar-email').value,
        telefono: document.getElementById('editar-telefono').value,
        direccion: document.getElementById('editar-direccion').value,
        convenio: document.getElementById('editar-convenio').value,
        nacimiento: document.getElementById('editar-nacimiento').value
    };
    const pacientesEditados = pacientesActualizados.map(p => p.id === id ? {...p, ...nuevosDatos} : p);
    localStorage.setItem('pacientes', JSON.stringify(pacientesEditados));
    document.getElementById('modal-editar').style.display = 'none';
    buscarPaciente(selectOption.value, busquedaInput.value.trim());
});

formBusqueda.addEventListener('submit', function(e) {
    e.preventDefault();
    const tipoBusqueda = selectOption.value;
    const busqueda = busquedaInput.value.trim();
    buscarPaciente(tipoBusqueda, busqueda);
});
});


