import './css/styles.css';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
Notiflix.Notify.init({
  position: 'center-top',
  width: '350px',
  fontSize: '15px',
  clickToClose: true,
});
import { fetchCountries } from './fetchCountries';

const DEBOUNCE_DELAY = 300;
const input = document.querySelector('input#search-box');
const list = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

input.addEventListener('input', debounce(onInput, DEBOUNCE_DELAY));

function onInput() {
  clearMarkup();
  let inputText = input.value.trim();
  if (inputText === '') {
    clearMarkup();
  } else {
    fetchCountries(inputText).then(names => {
      if (names.length > 10)
        Notiflix.Notify.info(
          'Too many matches found. Please enter a more specific name.'
        );
      else if (names.length === 1) createCountryCard(names[0]);
      else createCountryList(names);
    });
  }
}

function clearMarkup() {
  list.innerHTML = '';
  countryInfo.innerHTML = '';
}

function createCountryCard(names) {
  let countryCard = '';

  const {
    name: { official },
    capital,
    population,
    languages,
    flags: { svg },
  } = names;

  const languageList = Object.values(languages).join(', ');

  countryCard = `<div class="country-head">
        <img
          src=${svg}
          alt="leaf"
        />
        <h2 class="country-title">${official}</h2>
      </div>
      <p class="p-margin"><span class="caption">Capital: </span>${capital}</p>
      <p class="p-margin"><span class="caption">Population: </span>${population}</p>
      <p class="p-margin"><span class="caption">Languages: </span>${languageList}</p>`;

  countryInfo.innerHTML = countryCard;
}

function createCountryList(names) {
  let countryMarkup = names.reduce(
    (markup, item) => createItem(item) + markup,
    ''
  );
  list.innerHTML = countryMarkup;
}

function createItem(item) {
  const {
    name: { official },
    flags: { svg },
  } = item;
  return `<li class="country-description"><img
        src=${svg}
        alt="flag"
      />
      <p>${official}</p></li>`;
}
