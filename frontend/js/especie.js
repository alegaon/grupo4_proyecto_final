let BASE_URL = 'http://localhost:5000'
document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');
    
    if (id) {
        fetch(`${BASE_URL}//api//especies/${id}`)
        .then(response => response.json())
        .then(data => {
            document.getElementById('nombre_vulgar').textContent = data.nombre_vulgar;
            document.getElementById('nombre_cientifico').textContent = data.nombre_cientifico;
            document.getElementById('descripcion').textContent = data.descripcion;
            document.getElementById('epoca').textContent = data.epoca;
            document.getElementById('lugares').textContent = data.lugar.join(', ');
            document.getElementById('modalidades').textContent = data.modalidades.join(', ');
        })
        .catch(error => console.log("No se pudo obtener la descripción de la especie", error));
    } else {
        alert('No se especificó una especie');
    }
});
