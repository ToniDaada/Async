'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

//  https://restcountries.com/v2/name/nigeria

///////////////////////////////////////
const renderCountry = function (data, className) {
  const html = `
     <article class="country ${className} ">
          <img class="country__img" src="${data.flag}" />
          <div class="country__data">
            <h3 class="country__name">${data.name}</h3>
            <h4 class="country__region">${data.region}</h4>
            <p class="country__row"><span>👫</span>${(
              +data.population / 1000000
            ).toFixed(1)}M</p>
            <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
            <p class="country__row"><span>💰</span>${
              data.currencies[0].name
            }</p>
          </div>
        </article>
  `;

  countriesContainer.insertAdjacentHTML('beforebegin', html);
  //   countriesContainer.style.opacity = 1;
};

const renderError = function (msg) {
  countriesContainer.insertAdjacentText('beforeend', msg);
  //   countriesContainer.style.opacity = 1;
};
// // Old school way
// const getCountryDataAndNeighbour = function (country) {
//   // AJAX call country 1
//   const request = new XMLHttpRequest();
//   // used Github for public API
//   request.open('GET', `https://restcountries.com/v2/name/${country}`);
//   request.send();
//   request.addEventListener('load', function () {
//     const [data] = JSON.parse(this.responseText);

//     // Render Country 1
//     renderCountry(data);

//     //Get neihbouring countries
//     for (let i = 0; i < data.borders.length; i++) {
//       const neighbour = data.borders?.[i];
//       //Second AJAX call
//       const request2 = new XMLHttpRequest();
//       request2.open('GET', `https://restcountries.com/v2/alpha/${neighbour}`);
//       request2.send();
//       request2.addEventListener('load', function () {
//         const data2 = JSON.parse(this.responseText);
//         renderCountry(data2, 'neighbour');
//       });
//     }
//   });
// };
// //
// getCountryDataAndNeighbour('ghana');

// const request = new XMLHttpRequest();
// //   // used Github for public API
//   request.open('GET', `https://restcountries.com/v2/name/${country}`);

// const getCountryData = function (...country) {
//   fetch(`https://restcountries.com/v2/name/${country}`).then(function (
//     response
//   ) {
//     return response.json().then(data => {
//       renderCountry(data[0]);
//     });
//   });
// };

// PROMISE AND FETCH!!!!

const getCountryData = function (...country) {
  fetch(`https://restcountries.com/v2/name/${country}`)
    .then(response => {
      // MANUAL THROWING OF EERRORS
      if (!response.ok)
        throw new Error(`${country} not found (${response.status})`);

      return response.json();
    })
    .then(data => {
      renderCountry(data[0]);
      const neighbour = data[0].borders?.[0];
      return fetch(`https://restcountries.com/v2/alpha/${neighbour}`);
    })
    .then(response => response.json())
    .then(data => {
      renderCountry(data, 'neighbour');
      const neighbour = data.borders?.[0];
      return fetch(`https://restcountries.com/v2/alpha/${neighbour}`);
    })
    .then(response => response.json())
    .then(data => {
      renderCountry(data, 'neighbour');
    })
    .catch(err => {
      console.log(err);
      renderError(`Something went wrong!!!

        
        ${err.message}
        
        Try again`);
    })
    .finally(() => {
      countriesContainer.style.opacity = 1;
    });
};

btn.addEventListener('click', function () {
  getCountryData(`nigeria`);
});

// HANDLING REJECTED PROMISES
