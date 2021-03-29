import Chart from 'chart.js';

function makeChart(ctx) {
  const chart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: null,
      datasets: [
        {
          label: 'Choose a currency',
          data: null,
          backgroundColor: 'rgb(108, 177, 241)',
        },
      ],
    },
    options: {
      responsive: true,
      title: {
        display: false,
      },
      scales: {
        xAxes: [
          {
            display: true,
            // scaleLabel: {
            //   display: true,
            //   labelString: 'Day',
            // },
          },
        ],
        yAxes: [
          {
            display: true,
            // scaleLabel: {
            //   display: true,
            //   labelString: 'Value',
            // },
          },
        ],
      },
    },
  });
  return chart;
}

export function updateChart(chart, { currency, activeTimeController, base }, dateNames, data) {
  const sortedData = [];

  for (const date in data) {
    sortedData.push([date, data[date][currency]]);
  }

  sortedData.sort((a, b) => new Date(a[0]) - new Date(b[0]));
  let dates = sortedData.map((e) => e[0]);
  let values = sortedData.map((e) => e[1]);

  if (activeTimeController.dataset.period === 'week')
    dates = dates.map((day) => dateNames[new Date(day).getDay()]);

  if (activeTimeController.dataset.period === 'year') {
    let buffor = new Date(sortedData[0][0]).getMonth();
    values = [];
    dates = [];
    let rates = [];
    sortedData.forEach((e) => {
      if (new Date(e[0]).getMonth() !== buffor) {
        values.push(rates.reduce((sum, val) => sum + val) / rates.length);
        dates.push(buffor);
        buffor = new Date(e[0]).getMonth();
        rates = [];
      }
      rates.push(e[1]);
    });
    values.push(rates.reduce((sum, val) => sum + val) / rates.length);
    dates.push(buffor);
    dates = dates.map((month) => dateNames[month]);
  }

  chart.data.labels = dates;
  chart.data.datasets[0].label = `${base}/${currency}`;
  chart.data.datasets[0].data = values;
  chart.update();
}

export default makeChart;
