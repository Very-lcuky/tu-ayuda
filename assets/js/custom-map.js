// Detectar el idioma del navegador
var userLang = navigator.language || navigator.userLanguage; 
var mapLanguage = userLang.startsWith('es') ? 'es' : 'en';

// Cambiar el idioma de la página (texto)
function setTexts() {
  if (mapLanguage === 'es') {
    document.getElementById('welcome-text').innerText = 'Bienvenido a nuestra página';
    document.getElementById('login-button').innerText = 'Iniciar sesión';
    document.getElementById('logout-button').innerText = 'Cerrar sesión';
    document.getElementById('service-text').innerText = 'Servicios disponibles';
  } else {
    document.getElementById('welcome-text').innerText = 'Welcome to our page';
    document.getElementById('login-button').innerText = 'Login';
    document.getElementById('logout-button').innerText = 'Logout';
    document.getElementById('service-text').innerText = 'Available services';
  }
}

// Opciones del mapa
var mapOptions = {
  zoom: 14,
  center: new google.maps.LatLng(42.2406, -8.7207),
  mapTypeId: google.maps.MapTypeId.ROADMAP,
  // Google Maps no tiene opción language directa aquí; se pasa en la URL de la API
  mapTypeControl: false,
  mapTypeControlOptions: {
    style: google.maps.MapTypeControlStyle.DROPDOWN_MENU,
    position: google.maps.ControlPosition.LEFT_CENTER,
  },
  panControl: false,
  panControlOptions: {
    position: google.maps.ControlPosition.TOP_RIGHT,
  },
  zoomControl: true,
  zoomControlOptions: {
    style: google.maps.ZoomControlStyle.LARGE,
    position: google.maps.ControlPosition.RIGHT_BOTTOM,
  },
  scrollwheel: false,
  scaleControl: false,
  scaleControlOptions: {
    position: google.maps.ControlPosition.LEFT_CENTER,
  },
  streetViewControl: true,
  streetViewControlOptions: {
    position: google.maps.ControlPosition.RIGHT_BOTTOM,
  },
  styles: [],
};

// Función para crear el mapa
function initMap() {
  setTexts();
  var mapObject = new google.maps.Map(document.getElementById("map"), mapOptions);
  var directionsService = new google.maps.DirectionsService();
  var directionsRenderer = new google.maps.DirectionsRenderer({
    suppressMarkers: true,
    polylineOptions: { strokeColor: "#222222" },
  });
  directionsRenderer.setMap(mapObject);
  calculateAndDisplayRoute(directionsService, directionsRenderer);
}

function calculateAndDisplayRoute(directionsService, directionsRenderer) {
  directionsService.route({
    origin: { query: "Boufe Boutique Cafe" },
    destination: { query: "Gardens by the Bay" },
    travelMode: "DRIVING",
  }, function(response, status) {
    if (status === "OK") {
      directionsRenderer.setDirections(response);
    } else {
      window.alert("Directions request failed due to " + status);
    }
  });
}

// Para que Google Maps pueda llamar a initMap desde la URL con callback
window.initMap = initMap;

