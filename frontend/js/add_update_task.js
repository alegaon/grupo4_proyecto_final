let BASE_URL = 'http://localhost:5000';

let submitButton = document.querySelector("#Formulario #Crear");

let params = new URLSearchParams(document.location.search);
let task_id = params.get("task_id");

function add_new_task(event) {
    let data = {
        'nombre': document.querySelector("#Formulario #Titulo").value,
        'descripcion': document.querySelector("#Formulario #Descripcion").value,
        'comida': document.querySelector('#Formulario #icomida').checked,
        'embarcacion': document.querySelector('#Formulario #iembarcacion').checked,
        'guia': document.querySelector('#Formulario #iguia').checked,
        'equipos': document.querySelector('#Formulario #iequipos').checked,
        'carnada': document.querySelector('#Formulario #icarnada').checked,
        'wifi': document.querySelector('#Formulario #iwifi').checked,
        'hospedaje': document.querySelector('#Formulario #ihospedaje').checked,
        'atencion': document.querySelector('#Formulario #iatencion').checked,
        'salvavidas': document.querySelector('#Formulario #isalvavidas').checked,
    }

    let url = BASE_URL + '/api/tasks/create/';

    fetchData(url, "POST", () => {
        document.querySelector("#Formulario").reset();
        window.location.replace("../index.html#TareasPendientes");
    }, 
    data);
}

function update_task(event) {
    let data = {
        'nombre': document.querySelector("#Formulario #Titulo").value,
        'descripcion': document.querySelector("#Formulario #Descripcion").value,
        'comida': document.querySelector('#Formulario #icomida').checked,
        'embarcacion': document.querySelector('#Formulario #iembarcacion').checked,
        'guia': document.querySelector('#Formulario #iguia').checked,
        'equipos': document.querySelector('#Formulario #iequipos').checked,
        'carnada': document.querySelector('#Formulario #icarnada').checked,
        'wifi': document.querySelector('#Formulario #iwifi').checked,
        'hospedaje': document.querySelector('#Formulario #ihospedaje').checked,
        'atencion': document.querySelector('#Formulario #iatencion').checked,
        'salvavidas': document.querySelector('#Formulario #isalvavidas').checked,

    }

    let url = BASE_URL + '/api/tasks/update/' + task_id;

    fetchData(url, "PUT", () => {
        document.querySelector("#Formulario").reset();
        window.location.replace("../index.html#TareasPendientes");
    }, 
    data);
}

function set_form_readOnly(value) {
    let form = document.querySelector("#Formulario");
    var elements = form.elements;
    for (input of elements) { 
        input.readOnly = value;
    }
}

function add_or_update(){
    if(task_id !== null) {
        document.querySelector(".actionTitle").innerHTML = "Editar tarea existente";

        set_form_readOnly(true);

        let url = BASE_URL + '/api/tasks/fetch/' + task_id;
        fetchData(url, "GET", (data) => {
            document.querySelector("#Titulo").value = data.nombre;
            document.querySelector("#Descripcion").value = data.descripcion;
            document.querySelector("#task_id").value = data.id;
            document.querySelector(".fecha").innerHTML = data.fecha_creacion;
            document.querySelector('#icomida').checked = data.comida;
            document.querySelector('#iembarcacion').checked;
            document.querySelector('#iguia').checked;
            document.querySelector('#iequipos').checked;
            document.querySelector('#icarnada').checked;
            document.querySelector('#iwifi').checked;
            document.querySelector('#ihospedaje').checked;
            document.querySelector('#iatencion').checked;
            document.querySelector('#isalvavidas').checked;


            set_form_readOnly(false);
        });

        submitButton.addEventListener("click", update_task);
    } else {
        submitButton.addEventListener("click", add_new_task);
    }
}

add_or_update();



