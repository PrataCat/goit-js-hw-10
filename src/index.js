import './css/styles.css';
import debounce from 'lodash.debounce';
import { fetchCountries } from './fetchCountries';

const DEBOUNCE_DELAY = 300;
const input = document.querySelector('input#search-box');
const list = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');
// const btn = document.getElementById('test-btn');
// const inputText = input.value.trim();
console.dir(list);

input.addEventListener('input', debounce(onInput, 300));
// btn.addEventListener('click', onClick);
// function onClick() {
//   console.log('ok');
// }

function onInput() {
  const inputText = input.value.trim();
  fetchCountries(inputText).then(names => {
    if (names.length > 10) {
      console.log('Too many matches found. Please enter a more specific name.');
    }
    createMarkup(names);
  });
}

function createMarkup(names) {
  if ((inputText = '')) {
    list.innerHTML('');
  }
  names.reduce((markup, field) => {
    const liItem = `<li>
    <h2>${field.name}</h2>
    </li>`;
  });
}
