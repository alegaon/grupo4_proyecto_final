function  fetchAPI(url, method, callback, data = null) {
    // Esta funcion me permite establecer comunicacion para CRUD con la API
    // Donde:
    //      url: ruta a direccionar a la API
    //      method: GET, POST, PUT o DELETE
    //      callback: es una funcion que se ejecuta una vez que el "then" esta disponible
    //      data: se utiliza para enviar datos a la API (POST, PUT y DELETE)
    const options = {
        method: method,
        headers: {
            'Content_Type': 'application/json',
        },
        // Si responde con datos, lo transformo a JSON e incorporo como diccionaio
        body: data ? JSON.stringify(data) : null,  
    };

    fetch(url, options)
    .then(response => response.json())
    .then(data => {
        callback(data);
    })
    .catch(alert(`Algo salió mal. Error: ${error}`));
}