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
        
        <p class="country__row">
              <span>🗣️</span>${data.languages[0].name}
            </p>
          
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

const getJSON = function (url, errMsg = 'Something went wrong') {
  fetch(url).then(response => {
    if (!response.ok) throw new Error(errMsg);

    return response.json();
  });
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

// const getCountryData = function (country) {
//   //   fetch()
//   //     .then(response => {
//   //       // MANUAL THROWING OF EERRORS
//   //       if (!response.ok)
//   //         throw new Error(`${country} not found (${response.status})`);

//   //       return response.json();
//   //     })
//   getJSON(`https://restcountries.com/v2/name/${country}`, `Country not found`)
//     .then(data => {
//       renderCountry(data[0]);
//       const neighbour = data[0].borders?.[0];
//       return getJSON(`https://restcountries.com/v2/name/${neighbour}`);
//     })
//     .then(data => {
//       renderCountry(data, 'neighbour');
//       const neighbour = data;
//       return getJSON(`https://restcountries.com/v2/name/${neighbour}`);
//     })
//     .then(data => renderCountry(data, 'neighbour'))
//     .catch(err => {
//       renderError(`Something went wrong!!!

//         ${err.message}

//         Try again`);
//     })
//     .finally(() => {
//       countriesContainer.style.opacity = 1;
//     });
// };

// btn.addEventListener('click', function () {
//   getCountryData(`nigeria`);
// });

// // HANDLING REJECTED PROMISES

//CHALLENGE 1
// new API https:// api.bigdataclous.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}

// const whereAmI = function (lat, lng) {
//   fetch(
//     `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}`
//   )
//     .then(response => {
//       console.log(response.status);
//       if (!response.ok) throw new Error(`Your request has timed out`);
//       return response.json();
//     })
//     .then(data => {
//       console.log(`You are in ${data.city}, ${data.countryName}`);
//       return fetch(
//         `https://restcountries.com/v2/name/${data.countryName.toLowerCase()}`
//       );
//     })
//     .then(response => {
//       return response.json();
//     })
//     .then(data => renderCountry(data[0]))
//     .catch(err => console.log(err))
//     .finally(() => (countriesContainer.style.opacity = 1));
// };

// // btn.addEventListener('click', function () {
// //   whereAmI(52.508, 13.381);
// //   whereAmI(51, 13.381);
// //   // whereAmI(52.508, 13.381);
// //   whereAmI(6.5244, 3.1);
// // });

// // console.log('Test start');
// // setTimeout(() => console.log(`0 second timer`), 0);
// // Promise.resolve(`Resolved Prmoise 1`).then(res => console.log(res));
// // console.log(`Test end`);

// // Building a promise

// const lotteryPromise = new Promise(function (resolve, reject) {
//   console.log(`Lottery is happening`);
//   setTimeout(() => {
//     if (Math.random() >= 0.5) {
//       resolve(`You win nigga`);
//     } else {
//       reject(new Error(`You lost your money bitch`));
//     }
//   }, 2000);
// });
// lotteryPromise
//   .then(result => console.log(result))
//   .catch(err => console.log(err));

// const wait = function (seconds) {
//   return new Promise(function (resolve) {
//     setTimeout(resolve, seconds * 1000);
//   });
// };
// wait(2)
//   .then(() => {
//     console.log(`I waited for two secinds`);
//     return wait(1);
//   })
//   .then(() => console.log(`I waited fior 1 second`));

// navigator.geolocation.getCurrentPosition(
//   position => console.log(position),
//   err => console.log(err)
// );
const promiseNavigator = function () {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};

// promiseNavigator()
//   .then(res => console.log(res.coords))
//   .catch(err => console.log(err));

// const whereAmI = function () {
//   promiseNavigator()
//     .then(pos => {
//       const { latitude: lat } = pos.coords;
//       const { longitude: lng } = pos.coords;
//       return fetch(
//         `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}`
//       );
//     })
//     .then(response => {
//       console.log(response.status);
//       if (!response.ok) throw new Error(`Your request has timed out`);
//       return response.json();
//     })
//     .then(data => {
//       console.log(`You are in ${data.city}, ${data.countryName}`);
//       return fetch(
// //         `https://restcountries.com/v2/name/${data.countryName.toLowerCase()}`
// //       );
// //     })
// //     .then(response => {
// //       return response.json();
// //     })
// //     .then(data => {
// //       renderCountry(data[0]);
// //       console.log(data[0]);
// //       let neighbour = data[0].borders?.[0];

// //       return fetch(`https://restcountries.com/v2/alpha/${neighbour}   `);
// //     })
// //     .then(res => res.json())
// //     .then(data => renderCountry(data))
// //     .catch(err => console.log(err))
// //     .finally(() => (countriesContainer.style.opacity = 1));
// // };

// // btn.addEventListener('click', whereAmI);

// const wait = function (seconds) {
//   return new Promise(function (resolve) {
//     setTimeout(resolve, seconds * 1000);
//   });
// };

// const imgContainer = document.querySelector('.images');

// // PATH 1
// const createImage = function (imgPath) {
//   return new Promise(function (resolve, reject) {
//     const img = document.createElement('img');
//     img.src = imgPath;

//     img.addEventListener('load', function () {
//       imgContainer.append(img);
//       resolve(img);
//     });

//     img.addEventListener('error', function () {
//       reject(new Error(`Image not found`));
//     });
//   });
// };
// let currImage;
// createImage('img/img-1.jpg')
//   .then(img => {
//     currImage = img;
//     console.log(`Image 1 loaded`);
//     return wait(2);
//   })
//   .then(() => {
//     currImage.style.display = 'none';
//     console.log(`Hidden`);
//     return createImage('img/img-2.jpg');
//   })
//   .then(img => {
//     currImage = img;
//     return wait(2);
//   })
//   .then(() => {
//     currImage.style.display = 'none';
//     console.log(`Hidden`);
//     return createImage('img/img-3.jpg');
//   })
//   .then(img => {
//     currImage = img;
//     return wait(2);
//   })
//   .then(() => (currImage.style.display = 'none'))
//   .catch(err => console.error(err.message));

const getPosition = function () {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      position => resolve(position),
      err => reject(err)
    );
  });
};
const whereAmI = async function () {
  try {
    const pos = await getPosition();
    const { latitude: lat, longitude: lng } = pos.coords;

    const res = await fetch(
      `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}`
    );

    if (res.ok) throw new Error('Problem getting ;pcation data');

    const data = await res.json();
    console.log(data.countryCode);
    const countryDetails = await fetch(
      `https://restcountries.com/v2/name/${data.countryName}`
    );
    const result = await countryDetails.json();
    renderCountry(result[0]);

    // FOR NEIGHBOURS
    const neighbour = result[0].borders;
    if (!neighbour) return;
    for (const item of neighbour) {
      const res = await fetch(`https://restcountries.com/v2/alpha/${item}`);
      const data = await res.json();
      renderCountry(data, 'neighbour');
    }
  } catch (err) {
    renderError(`Something went wrong ${err.message}`);
  }
};
// btn.addEventListener('click', () => whereAmI());
whereAmI();

console.log('fIRST');
