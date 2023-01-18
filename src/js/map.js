const initMap = () => {
  const svgMarker = {
    path: 'M0,6a6,6 0 1,1 12,0a6,6 0 1,1-12,0',
    fillColor: '#FF6E30',
    fillOpacity: 1,
    strokeWeight: 0,
    scale: 1,
  };
  const map = new google.maps.Map(document.getElementById('contacts-map'), {
    center: { lat: 55.752212599999, lng: 37.62144198999499 },
    zoom: 13,
  });

  new google.maps.Marker({
    position: { lat: 55.769456945450536, lng: 37.64001916703642 },
    map,
    icon: svgMarker,
  });
};

window.initMap = initMap;
