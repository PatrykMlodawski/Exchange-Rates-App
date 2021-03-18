import getData, { initializeOptions } from './apiHandler';

const baseSelect = document.getElementById('base-select');
const currencySelect = document.getElementById('currency-select');

function setOptions(options) {
  options.forEach((element) => {
    const option = document.createElement('option');
    option.value = element;
    option.innerText = element;
    baseSelect.appendChild(option);
    currencySelect.appendChild(option.cloneNode(true));
  });
}

function setDate() {
  const currentDate = new Date();
  const startDate = new Date(currentDate);
  startDate.setDate(startDate.getDate() - 30);
  const startDateStr = startDate.toISOString().substring(0, 10);
  const endDateStr = currentDate.toISOString().substring(0, 10);

  return { startDateStr, endDateStr };
}

initializeOptions(setOptions);

getData(setDate());
