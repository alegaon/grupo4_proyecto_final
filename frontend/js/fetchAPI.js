function  fetchAPI(url, method, callback, data = null) {
    // Esta funcion me permite establecer comunicacion para CRUD con la API
    // Donde:
    //      url: ruta a direccionar a la API
    //      method: GET, POST, PUT o DELETE
    //      callback: es una funcion que se ejecuta una vez que el "then" esta disponible.
    //          -
    //      data: se utiliza para enviar datos a la API (POST, PUT y DELETE)
    const options = {
        method: method,
        headers: {
            'Content-Type': 'application/json',
        },
        // Si responde con datos, lo transformo a JSON e incorporo como diccionaio
        body: data ? JSON.stringify(data) : null,  
    };

    fetch(url, options)
        .then(response => {
            // Controlo si la repuesta de estado HTTP no está en el rango 200-299.
            // dentro del response, viene el 'status'
            if (!response.ok) {
                // Si tengo un error, armo un diccionario para capturar los detalles
                const error = new Error('Server response was not ok');
                error.status = response.status;
                error.statusText = response.statusText;
                throw error;
            }
            return response.json();
        })
        .then(data => {
            callback(null, data);
        })
        .catch(error => {
            callback(error);
    });
}