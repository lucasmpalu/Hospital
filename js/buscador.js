const pacientes = JSON.parse(localStorage.getItem("pacientes")) || []
const formBusqueda = document.getElementById('form-busqueda');
const inputCpf = document.getElementById('cpf');
const resultadoUsuario = document.getElementById('resultado-usuario');

formBusqueda.addEventListener('submit', function(e) {
  e.preventDefault();
  const cpf = inputCpf.value.trim().replace(/[.-]/g, ''); // Eliminar puntos y guiones del CPF
  const paciente = pacientes.find(u => u.cpf === cpf);

  if (paciente) {
    alert(`Paciente encontrado: ${paciente.nombre}`);
    resultadoUsuario.innerHTML = `
        <strong class="label">Nombre:</strong> ${paciente.nombre}<br>
        <strong class="label">CPF:</strong> ${paciente.cpf}<br>
        <strong class="label">Email:</strong> ${paciente.email}<br>
        <strong class="label">Teléfono:</strong> ${paciente.telefono}<br>
        <strong class="label">Dirección:</strong> ${paciente.direccion}<br>
        <strong class="label">Fecha de nacimiento:</strong> ${paciente.nacimiento}
    `;
    formBusqueda.reset(); // Limpiar el formulario después de la búsqueda
  } else {
    resultadoUsuario.innerHTML = '<span style="color:red">Paciente no encontrado.</span>';
  }
});
