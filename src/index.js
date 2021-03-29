import makeChart, { updateChart } from './chartHandler';
import getData, { initializeOptions } from './apiHandler';

const app = document.getElementById('root');
const baseSelect = document.getElementById('base-select');
const currencySelect = document.getElementById('currency-select');
const ctx = document.getElementById('chart').getContext('2d');

const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

const properties = {
  startDateStr: null,
  endDateStr: null,
  base: null,
  currency: null,
};

const chart = makeChart(ctx);

function changeHandler(e) {
  if (e.target.tagName === 'SELECT') {
    let data;
    properties[e.target.dataset.value] = e.target.value;
    (async () => {
      data = await getData(properties);
      updateChart(chart, properties, DAYS, data);
    })();
  }
}

function setDates() {
  const currentDate = new Date();
  const startDate = new Date(currentDate);
  startDate.setDate(startDate.getDate() - 6);
  const startDateStr = startDate.toISOString().substring(0, 10);
  const endDateStr = currentDate.toISOString().substring(0, 10);

  properties.startDateStr = startDateStr;
  properties.endDateStr = endDateStr;
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

app.addEventListener('change', changeHandler);
initializeOptions(setOptions);
setDates();
