// Generar datos aleatorios
function getRandomCommonName() {
    const names = ["Trucha", "Salmón", "Tilapia", "Carpa", "Bagre"];
    return names[Math.floor(Math.random() * names.length)];
  }
  
  function getRandomScientificName() {
    const names = ["Oncorhynchus mykiss", "Salmo salar", "Oreochromis niloticus", "Cyprinus carpio", "Ictalurus punctatus"];
    return names[Math.floor(Math.random() * names.length)];
  }
  
  function getRandomMaxLength() {
    return (Math.random() * 100).toFixed(2); // Largo aleatorio entre 0 y 100 cm
  }
  
  function getRandomAverageWeight() {
    return (Math.random() * 20).toFixed(2); // Peso promedio aleatorio entre 0 y 20 kg
  }
  
  function getRandomFishingPlace() {
    const places = ["Río", "Lago", "Océano", "Estanque", "Arroyo"];
    return places[Math.floor(Math.random() * places.length)];
  }
  
  function getRandomFishingSeason() {
    const seasons = ["Primavera", "Verano", "Otoño", "Invierno"];
    return seasons[Math.floor(Math.random() * seasons.length)];
  }
  
  // Llenar los campos del formulario
  function fillForm() {
    document.querySelectorAll('input')[0].value = getRandomCommonName();
    document.querySelectorAll('input')[1].value = getRandomScientificName();
    document.querySelectorAll('input')[2].value = getRandomMaxLength();
    document.querySelectorAll('input')[3].value = getRandomAverageWeight();
    document.querySelectorAll('input')[4].value = getRandomFishingPlace();
    document.querySelectorAll('input')[5].value = getRandomFishingSeason();
  }
  
  // Enviar el formulario
  function submitForm() {
    document.querySelector('form').submit();
  }
  
  // Ejecutar las funciones
  fillForm();
  submitForm();
  