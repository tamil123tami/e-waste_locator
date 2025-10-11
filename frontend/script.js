const map = L.map('map').setView([28.6448, 77.2167], 12);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '© OpenStreetMap contributors'
}).addTo(map);

let allMarkers = [];
let facilities = [];
let routingControl = null;

fetch('http://localhost:5000/api/facilities')
  .then(res => res.json())
  .then(data => {
    facilities = data;
    renderMarkers(data);
    document.getElementById('loading').style.display = 'none';
  })
  .catch(err => {
    console.error("❌ Failed to fetch facilities:", err);
    document.getElementById('loading').textContent = 'Failed to load facilities.';
  });

function renderMarkers(data) {
  allMarkers.forEach(marker => map.removeLayer(marker));
  allMarkers = [];

  data.forEach(facility => {
    const marker = L.marker([facility.lat, facility.lng])
      .addTo(map)
      .bindPopup(`
        <b>${facility.name}</b><br>
        Type: ${facility.type}<br>
        Contact: ${facility.contact}<br>
        Hours: ${facility.hours}<br>
        <button onclick="routeTo(${facility.lat}, ${facility.lng})">📍 Get Route</button>
      `);
    allMarkers.push(marker);
  });
}

document.getElementById('searchBox').addEventListener('input', e => {
  const query = e.target.value.toLowerCase();
  const filtered = facilities.filter(facility =>
    facility.name.toLowerCase().includes(query) ||
    facility.type.toLowerCase().includes(query)
  );
  renderMarkers(filtered);
});

function findNearby() {
  if (!navigator.geolocation) {
    alert("Geolocation not supported");
    return;
  }

  navigator.geolocation.getCurrentPosition(pos => {
    const userLat = pos.coords.latitude;
    const userLng = pos.coords.longitude;
    const radiusKm = 25;

    const nearby = facilities.filter(f => {
      const d = getDistanceFromLatLonInKm(userLat, userLng, f.lat, f.lng);
      return d <= radiusKm;
    });

    renderMarkers(nearby);

    map.setView([userLat, userLng], 12);
    L.circle([userLat, userLng], {
      radius: radiusKm * 1000,
      color: 'blue',
      fillColor: '#3f0',
      fillOpacity: 0.2
    }).addTo(map).bindPopup("📍 You are here").openPopup();
  });
}

function showNearestFacility() {
  if (!navigator.geolocation) {
    alert("Geolocation not supported");
    return;
  }

  navigator.geolocation.getCurrentPosition(pos => {
    const userLat = pos.coords.latitude;
    const userLng = pos.coords.longitude;

    let nearest = null;
    let minDistance = Infinity;

    facilities.forEach(f => {
      const dist = getDistanceFromLatLonInKm(userLat, userLng, f.lat, f.lng);
      if (dist < minDistance) {
        minDistance = dist;
        nearest = f;
      }
    });

    if (nearest) {
      map.setView([nearest.lat, nearest.lng], 14);
      L.marker([nearest.lat, nearest.lng])
        .addTo(map)
        .bindPopup(`
          <b>${nearest.name}</b><br>
          Type: ${nearest.type}<br>
          Contact: ${nearest.contact}<br>
          Hours: ${nearest.hours}<br>
          Distance: ${minDistance.toFixed(2)} km
        `)
        .openPopup();
    } else {
      alert("No facilities found.");
    }
  });
}

function routeTo(destLat, destLng) {
  if (!navigator.geolocation) {
    alert("Geolocation not supported");
    return;
  }

  navigator.geolocation.getCurrentPosition(pos => {
    const userLat = pos.coords.latitude;
    const userLng = pos.coords.longitude;

    if (routingControl) {
      map.removeControl(routingControl);
    }

    routingControl = L.Routing.control({
      waypoints: [
        L.latLng(userLat, userLng),
        L.latLng(destLat, destLng)
      ],
      routeWhileDragging: false
    }).addTo(map);
  });
}

function findRealOSMRecyclingCenters() {
  if (!navigator.geolocation) {
    alert("Geolocation not supported");
    return;
  }

  navigator.geolocation.getCurrentPosition(pos => {
    const lat = pos.coords.latitude;
    const lon = pos.coords.longitude;
    const radius = 25000;

    const query = `
      [out:json];
      (
        node(around:${radius},${lat},${lon})["amenity"="recycling"];
      );
      out body;
    `;

    const overpassUrl = `https://overpass-api.de/api/interpreter?data=${encodeURIComponent(query)}`;

    fetch(overpassUrl)
      .then(res => res.json())
      .then(data => {
        if (!data.elements.length) {
          alert("⚠️ No OSM recycling centers found within 25 km.");
          return;
        }

        const facilities = data.elements.map(el => ({
          name: el.tags.name || "Recycling Center",
          lat: el.lat,
          lng: el.lon,
          type: "E-Waste (OSM)",
          contact: el.tags.phone || "N/A",
          hours: el.tags.opening_hours || "Unknown"
        }));

        renderMarkers(facilities);
        map.setView([lat, lon], 12);
      })
      .catch(err => {
        console.error("❌ Overpass API error:", err);
        alert("Failed to load real facilities.");
      });
  });
}

function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
  const R = 6371;
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
    Math.sin(dLon / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

function deg2rad(deg) {
  return deg * (Math.PI / 180);
}
