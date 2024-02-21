const form = document.getElementById('zip-form');
const container = document.getElementById('container');
const input = document.getElementById('zip');
const outputContainer = createElement({
  type: 'div',
  className: 'output-container',
});

form.addEventListener('submit', async (event) => {
  try {
    event.preventDefault();
    const formData = new FormData(event.target);
    const zipCode = formData.get('zip');
    if (zipCode === '') return;
    // clean input, get rid of previous result or errors if any
    input.value = '';
    outputContainer.innerHTML = '';
    let errors = document.querySelectorAll('.error');
    errors.forEach(function (element) {
      element.remove();
    });
    const fetchUrl = `https://api.zippopotam.us/us/${zipCode}`;
    const data = await fetch(fetchUrl);
    const parsedData = await data.json();

    // Display data
    const countryHeader = createElement({
      type: 'h2',
      className: 'country-header',
      text: `${parsedData['post code']} ${parsedData['country']} (${parsedData['country abbreviation']})`,
    });
    const placesSubtitle = createElement({
      type: 'h4',
      className: 'places-subtitle',
      text: 'Places:',
    });
    outputContainer.appendChild(countryHeader);
    outputContainer.appendChild(placesSubtitle);
    // Iterate over places in case there are several of them in the array
    parsedData.places.map((place, i) => {
      const placeDiv = createElement({
        type: 'div',
        className: 'place-container',
      });
      const textDiv = createElement({
        type: 'div',
        className: 'place-text-container',
      });
      const placeNameSubtitle = createElement({
        type: 'h3',
        className: 'place-name-subtitle',
        text: place['place name'],
      });
      textDiv.appendChild(placeNameSubtitle);
      const stateName = document.createElement('h4');
      stateName.textContent = `${place.state} (${place['state abbreviation']})`;
      const stateImg = document.createElement('img');
      stateImg.src = `./states/${place['state abbreviation']}.svg`;
      textDiv.appendChild(stateName);
      placeDiv.appendChild(textDiv);
      placeDiv.appendChild(stateImg);

      const longitude = createElement({
        type: 'h5',
        text: `Longitude: ${place.longitude}`,
      });
      const latitude = createElement({
        type: 'h5',
        text: `Latitude: ${place.latitude}`,
      });
      textDiv.appendChild(longitude);
      textDiv.appendChild(latitude);
      outputContainer.appendChild(placeDiv);
      if (i < parsedData.places.length - 1) {
        const divider = createElement({ type: 'hr', className: 'divider' });
        outputContainer.appendChild = divider;
      }
    });
    container.appendChild(outputContainer);
  } catch (e) {
    const errorDiv = createElement({
      type: 'div',
      className: 'error',
      text: 'An error has ocurred',
    });
    // show error message
    container.appendChild(errorDiv);
    console.log(e);
  }
});

function createElement({ type, className, text }) {
  const element = document.createElement(type);
  element.className = className;
  element.textContent = text;
  return element;
}
