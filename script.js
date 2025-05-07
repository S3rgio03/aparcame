let map;
let autocomplete;
let marker;

function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 40.4168, lng: -3.7038 },
    zoom: 14,
  });
  const input = document.getElementById("destination");
  autocomplete = new google.maps.places.Autocomplete(input);
  autocomplete.bindTo("bounds", map);
}

function findParking() {
  const place = autocomplete.getPlace();
  const location = place?.geometry?.location || map.getCenter();
  map.setCenter(location);
  if (marker) marker.setMap(null);
  marker = new google.maps.Marker({
    position: location,
    map,
    title: "Posible aparcamiento",
  });
  const directions = new google.maps.DirectionsService();
  const renderer = new google.maps.DirectionsRenderer();
  renderer.setMap(map);
  directions.route({
    origin: map.getCenter(),
    destination: location,
    travelMode: google.maps.TravelMode.DRIVING,
  }, (res, status) => {
    if (status === "OK") renderer.setDirections(res);
  });
}

function buscarAparcamiento() {
    // Mostrar el indicador de búsqueda
    document.getElementById("loading").style.display = "flex";

    // Simulamos una espera antes de encontrar el aparcamiento (aquí podrías hacer una llamada real a la API de los sensores)
    setTimeout(() => {
        encontrarAparcamiento();
    }, 3000); // 3 segundos para simular la búsqueda
}

function encontrarAparcamiento() {
    // Aquí podemos definir la ubicación ficticia del aparcamiento
    const aparcamiento = { lat: 40.4168, lng: -3.7038 }; // Este sería el punto de aparcamiento encontrado

    // Ocultar la animación de búsqueda
    document.getElementById("loading").style.display = "none";

    // Crear el marcador para el aparcamiento encontrado
    const marker = new google.maps.Marker({
        position: aparcamiento,
        map: map,
        icon: 'https://maps.google.com/mapfiles/ms/icons/blue-dot.png' // Cambia a un ícono personalizado si lo deseas
    });

    // Crear la ruta al aparcamiento usando DirectionsService
    const directionsService = new google.maps.DirectionsService();
    const directionsRenderer = new google.maps.DirectionsRenderer();
    directionsRenderer.setMap(map);

    const request = {
        origin: currentLocation,  // Suponiendo que tienes la ubicación actual del usuario
        destination: aparcamiento,
        travelMode: google.maps.TravelMode.DRIVING
    };

    // Solicitar la ruta
    directionsService.route(request, function(result, status) {
        if (status == google.maps.DirectionsStatus.OK) {
            directionsRenderer.setDirections(result);
        } else {
            alert('No se pudo calcular la ruta');
        }
    });
}

document.getElementById('search-btn').addEventListener('click', function() {
    buscarAparcamiento();  // Inicia la animación de búsqueda
});

