const URL = 'https://api.exchangeratesapi.io/';

async function getData({ startDateStr, endDateStr }) {
  try {
    const response = await fetch(
      `${URL}history?start_at=${startDateStr}&end_at=${endDateStr}&base=EUR`
    );
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.log('Fetch error:', error);
  }
}

export async function initializeOptions(setOptions) {
  try {
    const response = await fetch(`${URL}latest`);
    const data = await response.json();
    const options = Object.keys(data.rates).sort();
    setOptions(options);
  } catch (error) {
    console.log('Fetch error:', error);
  }
}

export default getData;
