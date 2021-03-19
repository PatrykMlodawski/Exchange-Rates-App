const URL = 'https://api.exchangeratesapi.io/';

async function getData({ startDateStr, endDateStr, base, currency }) {
  let data;
  try {
    const response = await fetch(
      `${URL}history?start_at=${startDateStr}&end_at=${endDateStr}&base=${base}&symbols=${currency}`
    );
    data = await response.json();
  } catch (error) {
    console.log('Fetch error:', error);
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
    console.log('Fetch error:', error);
  }
}

export default getData;
