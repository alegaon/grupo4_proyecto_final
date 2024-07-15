let BASE_URL = 'http://localhost:5000'

 // Cargo la estructura del Articulo Especies, genero una copia y luego la elimino del htmo
 let modelo = document.querySelector('#art_especies')
 let modelo_copia = modelo.cloneNode(true)     // true me sirve para que lo copie con hijos incluido
 // finalmente elimino el Especies base del html
 modelo.remove()

function cargar_articulos(){
    // Cargo la estructura de Main para luego poder agregar los hijos de especies
    let articulo_especies = document.querySelector(".contenedor_especies")
    let url = `${BASE_URL}/api/especies`
    fetchAPI(url, "GET", (error, data) => {
        // Ahora se procesa la informacion que retorna la API
        let especies = []
        for (const especie of data){
            // Compruebo si el articulo no tiene borrado logico
            if (!especie.activo) {
                let nueva_especie = modelo_copia.cloneNode(true)
                nueva_especie.querySelector('#nombre_vulgar').innerHTML = especie.nombre_vulgar;
                nueva_especie.querySelector('#nombre_cientifico').innerHTML = `(${especie.nombre_cientifico})`;
                nueva_especie.querySelector('#hdr_temporada').innerHTML = "Temporada de Pesca";
                nueva_especie.querySelector('#epoca').innerHTML = especie.epoca;
                let btn_ver = nueva_especie.querySelector('#view_button');
                btn_ver.onclick = () => viewSpecies(especie)
                let btn_activar = nueva_especie.querySelector('#update_button');
                btn_activar.onclick = () => updateSpecies(especie)
                // Cargo el nuevo articulo al main
                articulo_especies.appendChild(nueva_especie)
            };
        };
    });
};

function viewSpecies(especie) {
    // Implementar la funcionalidad para ver los detalles de la especie
    alert(`Ver detalles de la especie con ID: ${especie.id}`);
    window.location.href = `pages/especies.html?id=${especie.id}`;
}

function updateSpecies(especie){
    let url = `${BASE_URL}/api/especies/update/${especie.id}`;
    formdata = {
        activo: true,
    };
    console.log(url, especie.nombre_vulgar)
    fetchAPI(url, "PUT", (error, data) => {
        // Actualiza la carga del html
        location.reload();
    },  formdata);
}

cargar_articulos()