let BASE_URL = 'http://localhost:5000';

// consulto id en url
let consulta_id = new URLSearchParams(window.location.search);
const mi_id_especie = consulta_id.get('id');

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

// // carga los valores del id a editar
// function carga_valores_en_form(value) {
//     let form = document.querySelector("#speciesForm");
//     let datos_especies = form.datos_especies;
//     for (let input of datos_especies) { 
//         input.readOnly = value;
//     }
// }


// function agregra_o_actualizar() {
//     // si la URL viene con id entonces actualizar 
//     if(mi_id_especie !== null) {
//         document.querySelector("#form-titulo").innerHTML = "Editar Especie";

//         carga_valores_en_form(true);

//         let url = `${BASE_URL}/api/especies/${mi_id_especie}`;
//         fetchData(url, "GET", (data) => {
//             document.querySelector("#nombre_vulgar").value = data.nombre_vulgar;
//             document.querySelector("#nombre_cientifico").value = `(${data.nombre_cientifico})`;
//             document.querySelector("#lugar").value = data.lugar;
//             document.querySelector("#descripcion").value = data.descripcion;
//             document.querySelector("#modalidades").value = data.modalidades;
//             document.querySelector("#epoca_de_pesca").value = data.epoca;
//             carga_valores_en_form(false);
//         });

//         submitButton.addEventListener("click", update_task);
//     } else {
//         submitButton.addEventListener("click", add_new_task);
//     }

// };


// // determino si se va a actualizar o si se va a agregar nueva informacion
// agregra_o_actualizar();