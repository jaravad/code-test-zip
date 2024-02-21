const form = document.getElementById('zip-form');
const outputContainer = document.getElementById('output');
const container = document.getElementById('container');

form.addEventListener('submit', async (event) => {
  try {
    event.preventDefault();
    const formData = new FormData(event.target);
    const zipCode = formData.get('zip');
    const fetchUrl = `https://api.zippopotam.us/us/${zipCode}`;
    const data = await fetch(fetchUrl);
    const parsedData = await data.json();

    // Display data
    const outputContainer = document.createElement('div');
    outputContainer.className = 'output-container';
    const countryHeader = document.createElement('h2');
    countryHeader.className = 'country-header';
    countryHeader.textContent = `${parsedData['post code']} ${parsedData['country']} (${parsedData['country abbreviation']})`;
    outputContainer.appendChild(countryHeader);
    const placesSubtitle = document.createElement('h4');
    placesSubtitle.textContent = 'Places:';
    placesSubtitle.className = 'places-subtitle';
    outputContainer.appendChild(placesSubtitle);
    parsedData.places.map((place, i) => {
      const placeNameSubtitle = document.createElement('h3');
      placeNameSubtitle.className = 'place-name-subtitle';
      placeNameSubtitle.textContent = place['place name'];
      outputContainer.appendChild(placeNameSubtitle);
      const stateName = document.createElement('h4');
      stateName.textContent = `${place.state} (${place['state abbreviation']})`;
      const stateImg = document.createElement('img');
      stateImg.src = `./states/${place['state abbreviation']}.svg`;
      outputContainer.appendChild(stateName);
      outputContainer.appendChild(stateImg);

      const longitude = document.createElement('h5');
      longitude.textContent = 'Longitude: ' + place.longitude;
      const latitude = document.createElement('h5');
      latitude.textContent = 'Latitude: ' + place.latitude;
      outputContainer.appendChild(longitude);
      outputContainer.appendChild(latitude);
    });
    container.appendChild(outputContainer);
  } catch (e) {
    console.log(e);
  }
});
