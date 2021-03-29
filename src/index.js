import makeChart, { updateChart } from './chartHandler';
import getData, { initializeOptions } from './apiHandler';

const currencyControllers = document.querySelector('.currency-controllers');
const timeControllers = document.querySelector('.period-controllers');
const baseSelect = document.getElementById('base-select');
const currencySelect = document.getElementById('currency-select');
const canvas = document.getElementById('chart');
const ctx = canvas.getContext('2d');
let chart;

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const properties = {
  startDateStr: null,
  endDateStr: null,
  base: null,
  currency: null,
  activeTimeController: document.querySelector('.period-controller.active'),
};

function updateDate() {
  const startDate = new Date(properties.endDateStr);
  if (properties.activeTimeController.dataset.period === 'week') {
    startDate.setDate(startDate.getDate() - 6);
  } else if (properties.activeTimeController.dataset.period === 'month') {
    startDate.setDate(startDate.getDate() - 30);
  } else {
    startDate.setMonth(startDate.getMonth() - 11);
    startDate.setDate(1);
  }
  properties.startDateStr = startDate.toISOString().substring(0, 10);
}

function changeCurrencyHandler(e) {
  if (e.target.tagName === 'SELECT') {
    properties[e.target.dataset.value] = e.target.value;
    (async () => {
      const data = await getData(properties);
      const dateNames = properties.activeTimeController.dataset.period === 'week' ? DAYS : MONTHS;
      updateChart(chart, properties, dateNames, data);
    })();
  }
}

function changePeriodHandler(e) {
  if (e.target.tagName === 'BUTTON') {
    properties.activeTimeController.classList.toggle('active');
    e.target.classList.toggle('active');
    properties.activeTimeController = e.target;
    updateDate();
    (async () => {
      const data = await getData(properties);
      const dateNames = properties.activeTimeController.dataset.period === 'week' ? DAYS : MONTHS;
      updateChart(chart, properties, dateNames, data);
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

function init() {
  currencyControllers.addEventListener('change', changeCurrencyHandler);
  timeControllers.addEventListener('click', changePeriodHandler);
  initializeOptions(setOptions);
  setDates();
  if (window.innerWidth >= 530 && window.innerWidth < 1000) {
    canvas.height = '1000';
  } else if (window.innerWidth >= 1000 && window.innerWidth < 1250) {
    canvas.height = '700';
  } else if (window.innerWidth >= 1250) {
    canvas.height = '550';
  }
  chart = makeChart(ctx);
}

init();
