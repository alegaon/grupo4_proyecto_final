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
            if (especie.activo) {
                let nueva_especie = modelo_copia.cloneNode(true)
                nueva_especie.querySelector('#nombre_vulgar').innerHTML = especie.nombre_vulgar;
                nueva_especie.querySelector('#nombre_cientifico').innerHTML = `(${especie.nombre_cientifico})`;
                nueva_especie.querySelector('#hdr_temporada').innerHTML = "Temporada de Pesca";
                nueva_especie.querySelector('#epoca').innerHTML = especie.epoca;
                let btn_ver = nueva_especie.querySelector('#view_button');
                btn_ver.onclick = () => viewSpecies(especie)
                let btn_del = nueva_especie.querySelector('#del_button');
                btn_del.onclick = () => deleteSpecies(especie)
                // Cargo el nuevo articulo al main
                articulo_especies.appendChild(nueva_especie)
            };
        };
    });
};

function viewSpecies(especie) {
    // click en boton VER para ir a detalles de la especie
    window.location.href = `pages/especies.html?id=${especie.id}`;
}

function deleteSpecies(especie) {
    // Solicita confirmar la accion de eliminar
    const action = confirm(`¿Estás seguro de que deseas eliminar la especie ${especie.nombre_vulgar}?`);
     // Si el usuario confirma, procedemos con la eliminación
     if (action) {
        // Mostrar un mensaje de que la especie ha sido eliminada
        let url = `${BASE_URL}/api/especie/activo/${especie.id}`
        
        fetchAPI(url, "DELETE", (error, data) => {
            if (error){
                alert(`Ocurrio un error al intentar de eliminar la especie.`);
            } else {
                alert(`La Especie ${especie.nombre_vulgar} fue eliminada`);
                // refresco el html al eliminar un elemento
                location.reload();
            }
        });
        
        // Implementar la función que modifique el campo en la API
        // Aquí podrías hacer una llamada a tu API para eliminar la especie
        // Por ejemplo, usando fetch para enviar una solicitud DELETE
        // deleteSpeciesFromAPI(id);
    }     
}

cargar_articulos()