<!DOCTYPE html>
<html lang="en"> <!-- Se mantiene el idioma en inglés por defecto -->
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Mapa y Detección de Idioma</title>
  <!-- Incluir tu archivo de Google Maps -->
  <script async defer src="https://maps.googleapis.com/maps/api/js?key=TU_API_KEY&callback=initMap"></script>
  <script src="path/to/swiper-bundle.min.js"></script>
  <script src="path/to/custom-earnings-chart.js"></script>
  <script src="path/to/image-change.js"></script>
  <script src="path/to/template-setting.js"></script>
  <script src="path/to/custom-map.js"></script> <!-- El archivo donde está tu código JS -->
</head>
<body>

  <!-- Texto en la página que cambia según el idioma -->
  <div id="welcome-text"></div>
  <button id="login-button"></button>
  <button id="logout-button"></button>
  <div id="service-text"></div>

  <!-- Mapa de Google -->
  <div id="map" style="height: 500px;"></div>

  <script>
    // Detectar el idioma del navegador
    var userLang = navigator.language || navigator.userLanguage; // Detecta idioma
    var mapLanguage = userLang.startsWith('es') ? 'es' : 'en';  // Si es español, asigna 'es', sino 'en'

    // Cambiar el idioma de la página (texto)
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

    // Inicialización de Google Maps con idioma
    var mapOptions = {
      zoom: 14,
      center: new google.maps.LatLng(42.2406, -8.7207),
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      language: mapLanguage,  // Establece el idioma de Google Maps (es o en)
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
      styles: [
        // Los estilos del mapa siguen siendo los mismos, sin cambios
      ],
    };

    // Crear el mapa
    function initMap() {
      var mapObject = new google.maps.Map(document.getElementById("map"), mapOptions);
      var directionsService = new google.maps.DirectionsService();
      var directionsRenderer = new google.maps.DirectionsRenderer({
        suppressMarkers: true,
        polylineOptions: {
          strokeColor: "#222222",
        },
      });
      directionsRenderer.setMap(mapObject);
      calculateAndDisplayRoute(directionsService, directionsRenderer);
    }

    function calculateAndDisplayRoute(directionsService, directionsRenderer) {
      directionsService.route(
        {
          origin: { query: "Boufe Boutique Cafe" },
          destination: { query: "Gardens by the Bay" },
          travelMode: "DRIVING",
        },
        function (response, status) {
          if (status === "OK") {
            directionsRenderer.setDirections(response);
          } else {
            window.alert("Directions request failed due to " + status);
          }
        }
      );
    }
  </script>

</body>
</html>

