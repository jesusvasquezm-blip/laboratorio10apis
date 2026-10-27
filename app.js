const btnBuscar = document.getElementById('btnBuscar');
const inputBuscar = document.getElementById('inputBuscar');
const contenedor = document.getElementById('usuarios');

btnBuscar.addEventListener('click', async () => {
  try {
    const response = await fetch('https://randomuser.me/api/?results=6');
    
    if (!response.ok) {
      throw new Error('Error al obtener datos');
    }

    const data = await response.json();
    const textoBuscado = inputBuscar.value.toLowerCase().trim();

    const usuariosFiltrados = data.results.filter(u => 
      u.name.first.toLowerCase().includes(textoBuscado) || 
      u.name.last.toLowerCase().includes(textoBuscado)
    );

    contenedor.innerHTML = '';

    if (usuariosFiltrados.length === 0) {
      contenedor.innerHTML = '<p>No se encontraron usuarios con ese nombre.</p>';
      return;
    }

    usuariosFiltrados.forEach(u => {
      contenedor.innerHTML += `
        <div class="card">
          <img src="${u.picture.large}" alt="Foto">
          <h3>${u.name.first} ${u.name.last}</h3>
          <p>Email: ${u.email}</p>
          <p>Tel: ${u.phone}</p>
          <p>País: ${u.location.country}</p>
        </div>
      `;
    });

  } catch (error) {
    contenedor.innerHTML = `<p style="color: red;">Error: ${error.message}</p>`;
  }
});