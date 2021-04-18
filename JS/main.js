const apiKey = "at_Kp7YeI6NmTRbtjBlTNjIoikJMWGGr";
let ipAddress = "";
const input = document.querySelector("input");
const submitBtn = document.querySelector("button");
const displayIpAddress = document.getElementById("ipaddress");
const displayLocation = document.getElementById("location");
const displayTimezone = document.getElementById("timezone");
const displayIsp = document.getElementById("isp");
const mapContainer = document.getElementById("mapcontainer");

const searchIpAddress = (e) => {
  e.preventDefault();
  ipAddress = input.value;
  getLocationUsingIpAddress();
};

const displaySearchedData = (ip, isp, country, city, region, timezone) => {
  displayIpAddress.innerHTML = ip;
  displayIsp.innerHTML = isp;
  displayLocation.innerHTML = `${city}, ${region}, ${country}`;
  displayTimezone.innerHTML = `UTC${timezone}`;
};

const showMap = (lat, lng) => {
  var map = L.map("map").setView([lat, lng], 8);
  L.tileLayer(
    "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}",
    {
      attribution:
        'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      maxZoom: 18,
      id: "mapbox/streets-v11",
      tileSize: 512,
      zoomOffset: -1,
      accessToken:
        "pk.eyJ1IjoicmQtdHJlbmRzIiwiYSI6ImNrbmw4N2p0ejBmYzgyeG1wdnd4MnZsM3EifQ.UoMajkzmRirnMdI1YzP6ng",
    }
  ).addTo(map);

  var locationIcon = L.icon({
    iconUrl: "/images/icon-location.svg",
    iconSize: [40, 50], // size of the icon
  });

  L.marker([lat, lng], { icon: locationIcon }).addTo(map);
};

const getLocationUsingIpAddress = async () => {
  mapContainer.innerHTML = `<div id="map"></div>`;
  const res = await fetch(
    `https://geo.ipify.org/api/v1?apiKey=${apiKey}&ipAddress=${ipAddress}`
  );

  const data = await res.json();
  console.log(data);
  const { ip, isp, location } = data;
  const {
    country,
    city,
    lat,
    lng,
    region,
    geonameId,
    timezone,
    postalCode,
  } = location;

  displaySearchedData(ip, isp, country, city, region, timezone);
  showMap(lat, lng);
};

// eventListeners
submitBtn.addEventListener("click", searchIpAddress);

getLocationUsingIpAddress();
