let BASE_URL = 'http://localhost:5000';

document.getElementById('speciesForm').addEventListener('submit', function(event) {
    event.preventDefault();

    let formdata = {
        nombre_vulgar: document.querySelector('.Nombre_Vulgar').value,
        nombre_cientifico: document.querySelector('.Nombre_Cientifico').value,
        descripcion: document.querySelector('.Descripcion').value,
        epoca: document.querySelector('.Epoca_de_Pesca').value,
        // lugar y modalidades son campos multivalo, entonces se le debe pasar al BE en formato de listas. Para ello
        // cargo los valores del campo, separo por comas y uso la funcion trim para eliminar posibles espacios
        // en blanco en comienzo y fin de cada string.
        lugar: document.querySelector('.Lugar').value.split(',').map(item => item.trim()),
        modalidades: document.querySelector('.Modalidades').value.split(',').map(item => item.trim())
    };

    let url = `${BASE_URL}/api/especie/create`;

    fetchAPI(url, "POST", () => {
        document.querySelector("#speciesForm").reset()
    },  formdata);
});