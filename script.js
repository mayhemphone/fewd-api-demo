console.log('hello world');

const baseUrl = 'https://api.tvmaze.com';
const endpoint = '/search/shows';
const root = document.querySelector('#root');
const resultsDiv = document.querySelector('#results');

async function getShows(event) {
  event.preventDefault();
  resultsDiv.innerHTML = '';

  const searchTerm = document.querySelector('#searchTerm').value;

  console.log({ searchTerm });

  const response = await fetch(`${baseUrl}${endpoint}?q=${searchTerm}`);
  const data = await response.json();
  console.log({ data });



  if (data.length > 0) {
    letsMap(data);
    // displayImage(data)
    // letsForEach(data)
  } else {
    resultsDiv.innerHTML = 'No results';
  }

}

function displayImage(data) {

  for (i = 0; i < data.length; i++) {
    console.log('🔥', data[i].show.name);

    const newImage = document.createElement('img');
    newImage.setAttribute('src', data[i].show.image.medium);
    resultsDiv.appendChild(newImage);
  }

}

const letsForEach = (data) => {

  const save = data.forEach((item) => {
    console.log({ item });

    const newImage = document.createElement('img');
    newImage.setAttribute('src', item.show.image.medium);
    resultsDiv.appendChild(newImage);
  });


};

const letsMap = (data) => {

  const newElements = data.map((result) => `
    <div class='card'>
      <div class='image'>
        ${result?.show?.image?.medium ? `<img src="${result.show.image.medium}" />` : `<div class="no-image">No Image</div>`}
      </div>
      <div class="details">
        <h4>${result.show.name}</h4>
        ${result.show.summary}
      </div>
    </div>
  `);
  resultsDiv.innerHTML = newElements.join('');

};

document.querySelector("#search-form").addEventListener("submit", (event) => getShows(event));
