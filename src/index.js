/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
import Chart from 'chart.js';
import getData, { initializeOptions } from './apiHandler';

const app = document.getElementById('root');
const baseSelect = document.getElementById('base-select');
const currencySelect = document.getElementById('currency-select');
const ctx = document.getElementById('chart').getContext('2d');

const properties = {
  startDateStr: null,
  endDateStr: null,
  base: null,
  currency: null,
};

function makeChart() {
  const chart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: null,
      datasets: [
        {
          label: 'empty',
          data: null,
        },
      ],
    },
    options: {
      responsive: true,
      title: {
        display: true,
        text: 'Exchange Rates',
      },
      scales: {
        xAxes: [
          {
            display: true,
            scaleLabel: {
              display: true,
              labelString: 'Day',
            },
          },
        ],
        yAxes: [
          {
            display: true,
            scaleLabel: {
              display: true,
              labelString: 'Value',
            },
          },
        ],
      },
    },
  });
  return chart;
}

const chart = makeChart();

function updateChart(data) {
  const sortedData = [];

  for (const date in data) {
    sortedData.push([date, data[date][properties.currency]]);
  }

  sortedData.sort((a, b) => new Date(a[0]) - new Date(b[0]));
  const days = sortedData.map((e) => e[0]);
  const values = sortedData.map((e) => e[1]);

  chart.data.labels = days;
  chart.data.datasets[0].label = `${properties.base}/${properties.currency}`;
  chart.data.datasets[0].data = values;
  chart.update();

  console.log(chart.data.datasets.data);
}

function changeHandler(e) {
  if (e.target.tagName === 'SELECT') {
    let data;
    properties[e.target.dataset.value] = e.target.value;
    (async () => {
      data = await getData(properties);
      updateChart(data);
    })();
  }
}

function setDate() {
  const currentDate = new Date();
  const startDate = new Date(currentDate);
  startDate.setDate(startDate.getDate() - 29);
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
setDate();
