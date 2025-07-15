const pacientes = JSON.parse(localStorage.getItem("pacientes")) || [];
const formBusqueda = document.getElementById('form-busqueda');
const selectOption = document.getElementById('option');
const busquedaInput = document.getElementById('busqueda');
const resultadoUsuario = document.getElementById('resultado-usuario');
const sesionActiva = JSON.parse(localStorage.getItem('sesionActiva')) || {};


const buscarPaciente = (tipoBusqueda, busqueda) => {
    const resultados = pacientes.filter(p => {
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
    if (e.target.classList.contains('btn-borrar')) {
        const id = e.target.getAttribute('data-id');
        nuevospacientes = pacientes.filter(e => e.id !== id)
        localStorage.setItem('pacientes', JSON.stringify(nuevospacientes))
        resultadoUsuario.innerHTML = "<span style='color:green'>Paciente eliminado exitosamente.</span>";
        cerrarSesion();
      }
    if (e.target.classList.contains('btn-editar')) {
        const id = e.target.getAttribute('data-id');
        // lógica para editar el paciente con ese id
        // Aquí podrías redirigir a un formulario de edición o mostrar un modal
        alert(`Funcionalidad de edición no implementada para el paciente con ID: ${id}`);
        cerrarSesion();
    }
});

formBusqueda.addEventListener('submit', function(e) {
    e.preventDefault();
    const tipoBusqueda = selectOption.value;
    const busqueda = busquedaInput.value.trim();
    buscarPaciente(tipoBusqueda, busqueda);
});


