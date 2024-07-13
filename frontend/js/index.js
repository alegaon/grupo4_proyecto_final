let BASE_URL = 'http://localhost:5000'

 // Cargo la estructura del Articulo Especies, genero una copia y luego la elimino del htmo
 let modelo = document.querySelector('#tabla_modelo')
 let modelo_copia = modelo.cloneNode(true)     // true me sirve para que lo copie con hijos incluido
 // finalmente elimino el Especies base del html
 modelo.remove()

function cargar_articulos(){
    // Cargo la estructura de Main para luego poder agregar los hijos de especies
    let tabla_especies = document.querySelector("#tabla_cuerpo")
    let url = `${BASE_URL}/api/especies`
    fetchAPI(url, "GET", (data) => {
        // Ahora se procesa la informacion que retorna la API
        let especies = []
        for (const especie of data){
            // Compruebo si el articulo no tiene borrado logico
            if (especie.activo) {
                let nueva_especie = modelo_copia.cloneNode(true)
                nueva_especie.querySelector('#td_nombre_vulgar').innerHTML = especie.nombre_vulgar;
                nueva_especie.querySelector('#td_nombre_cientifico').innerHTML = especie.nombre_cientifico;
                let btn_ver = nueva_especie.querySelector('#view_button');
                btn_ver.onclick = () => viewSpecies(especie)
                let btn_del = nueva_especie.querySelector('#del_button');
                btn_del.onclick = () => deleteSpecies(especie.id)
                tabla_especies.appendChild(nueva_especie)
            };
        };
    });
};

function viewSpecies(especie) {
    // Implementar la funcionalidad para ver los detalles de la especie
    alert(`Ver detalles de la especie con ID: ${especie.id}`);
    window.location.href = `pages/especies.html?id=${especie.id}`;
}

function deleteSpecies(id) {
    // Implementar la funcionalidad para ver los detalles de la especie
    alert(`Especie con ID: ${id} eliminada`);
    // Implementar una funcion que modifique el campo en la API
    
}

cargar_articulos()