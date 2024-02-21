const form = document.getElementById('zip-form');
const outputContainer = document.getElementById('output');

form.addEventListener('submit', async (event) => {
  event.preventDefault();
  const formData = new FormData(event.target);
  const zipCode = formData.get('zip');
  const fetchUrl = `https://api.zippopotam.us/us/${zipCode}`;
  const data = await fetch(fetchUrl);
  const parsedData = await data.json();
  outputContainer.textContent = JSON.stringify(parsedData);
});
