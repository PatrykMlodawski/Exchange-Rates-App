import getData, { initializeOptions } from './apiHandler';

const app = document.getElementById('root');
const baseSelect = document.getElementById('base-select');
const currencySelect = document.getElementById('currency-select');

const properties = {
  startDateStr: null,
  endDateStr: null,
  base: null,
  currency: null,
};

function setDate() {
  const currentDate = new Date();
  const startDate = new Date(currentDate);
  startDate.setDate(startDate.getDate() - 30);
  const startDateStr = startDate.toISOString().substring(0, 10);
  const endDateStr = currentDate.toISOString().substring(0, 10);

  properties.startDateStr = startDateStr;
  properties.endDateStr = endDateStr;
}

function changeCurrency(e) {
  if (e.target.tagName === 'SELECT') {
    properties[e.target.dataset.value] = e.target.value;
    console.log(properties);
  }
}

function setOptions(options) {
  [properties.base] = options;
  [properties.currency] = options;

  options.forEach((element) => {
    const option = document.createElement('option');
    option.value = element;
    option.innerText = element;
    baseSelect.appendChild(option);
    currencySelect.appendChild(option.cloneNode(true));
  });
}

app.addEventListener('change', changeCurrency);
initializeOptions(setOptions);
setDate();

getData(properties);
