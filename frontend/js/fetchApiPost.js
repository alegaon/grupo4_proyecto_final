// tomo cada input

document.querySelector('.Nombre_Vulgar').value
document.querySelector('.Nombre_Cientifico').value
document.querySelector('.Largo_Max').value
document.querySelector('.Peso_Promedio').value
document.querySelector('.Donde_pescar').value
document.querySelector('.Epoca_de_Pesca').value


async function submitForm(event) {
    event.preventDefault();
    const url = 'http://127.0.0.1:5000/api/especie/create';
    const formData = {
        nombre_vulgar: document.querySelector('.Nombre_Vulgar').value,
        nombre_cientifico: document.querySelector('.Nombre_Cientifico').value,
        modalidades: document.querySelector('.Largo_Max').value,
        descripcion: document.querySelector('.Peso_Promedio').value,
        lugar: document.querySelector('.Donde_pescar').value,
        epoca: document.querySelector('.Epoca_de_Pesca').value
    };

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });

        if (response.ok) {
            const result = await response.json();
            alert('Especie agregada exitosamente!');
        } else {
            alert('Error al agregar la especie.');
        }
    } catch (error) {
        alert('Algo salió mal. Error: ' + error);
    }
}

document.getElementById('speciesForm').addEventListener('submit', submitForm);
