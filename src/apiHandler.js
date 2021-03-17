const URL = 'https://api.exchangeratesapi.io/history';

async function getData(startDate, endDate) {
  try {
    const response = await fetch(
      `${URL}?start_at=${startDate}&end_at=${endDate}&base=USD`
    );
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.log('Fetch error:', error);
  }
}

export default getData;
