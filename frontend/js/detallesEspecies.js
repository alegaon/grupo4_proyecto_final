// http://127.0.0.1:5500/frontend/pages/especies.html?id=4

let BASE_URL = 'http://127.0.0.1:5000'

// Cargo la estructura del Articulo Especies, genero una copia y luego la elimino del htmo
let modelo = document.querySelector('#art_especies')
let modelo_copia = modelo.cloneNode(true)     // true me sirve para que lo copie con hijos incluido
// finalmente elimino el Especies base del html
modelo.remove()

// me guardo boton de editar
let btnEditar = document.querySelector('#editar_button')

// consulto id de URL para ver
let consulta_id = new URLSearchParams(window.location.search);
const mi_id_especie = consulta_id.get('id');

function cargar_vista_especie(id_especie) {
    // Cargo la estructura de Main para luego poder agregar los hijos de especies
    let articulo_especies = document.querySelector(".contenedor_especies");

    let url = `${BASE_URL}/api/especies/${id_especie}`;

    fetchAPI(url, "GET", (error, especie) => {
        // Procesar la información que retorna la API
        let nueva_especie = modelo_copia.cloneNode(true);

        // nombres consulta
        nueva_especie.querySelector('#nombre_vulgar').innerHTML = especie.nombre_vulgar;
        nueva_especie.querySelector('#nombre_cientifico').innerHTML = `(${especie.nombre_cientifico})`;
        // lugar consulta
        nueva_especie.querySelector('#lugar_titulo').innerHTML = "Lugar";
        nueva_especie.querySelector('#lugar_dato').innerHTML = `(${especie.lugar})`;
        // descripción consulta
        nueva_especie.querySelector('#descripcion_titulo').innerHTML = "Descripción";
        nueva_especie.querySelector('#descripcion_dato').innerHTML = `(${especie.descripcion})`;
        // modalidad de pesca consulta
        nueva_especie.querySelector('#modalida_titulo').innerHTML = "Modalidades de Pesca";
        nueva_especie.querySelector('#modalida_dato').innerHTML = `(${especie.modalidades})`;
        // temporada de pesca
        nueva_especie.querySelector('#hdr_temporada').innerHTML = "Temporada de Pesca";
        nueva_especie.querySelector('#epoca').innerHTML = especie.epoca;

 
        let btn_edit = nueva_especie.querySelector('#editar_button');
        btn_edit.onclick = () => editarEspecie(id_especie);

        // Cargo el nuevo artículo al main
        articulo_especies.appendChild(nueva_especie);
    });
}

function editarEspecie(id_de_la_especie){
    // redirecciona a nuestro formulario html de agregar especies nuevas con su id
    let url = `agregar_nueva_especie.html?id=${id_de_la_especie}`;
    window.location.replace(url);
};


cargar_vista_especie(mi_id_especie)