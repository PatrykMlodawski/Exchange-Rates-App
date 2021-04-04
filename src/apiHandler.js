const URL = 'https://api.exchangerate.host/';

function errorHandler(error) {
  alert('API error:', error);
}

async function getData({ startDateStr, endDateStr, base, currency }) {
  let data;
  try {
    const response = await fetch(
      `${URL}timeseries?&start_date=${startDateStr}&end_date=${endDateStr}&base=${base}&symbols=${currency}`
    );
    data = await response.json();
  } catch (error) {
    errorHandler(error);
  }
  return data.rates;
}

export async function initializeOptions(setOptions) {
  try {
    const response = await fetch(`${URL}latest`);
    const data = await response.json();
    const options = [...Object.keys(data.rates), data.base].sort();
    setOptions(options);
  } catch (error) {
    errorHandler(error);
  }
}

export default getData;
