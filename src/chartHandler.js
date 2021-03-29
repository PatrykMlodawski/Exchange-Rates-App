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

export function updateChart(chart, properties, DAYS, data) {
  const sortedData = [];

  for (const date in data) {
    sortedData.push([date, data[date][properties.currency]]);
  }

  sortedData.sort((a, b) => new Date(a[0]) - new Date(b[0]));
  let days = sortedData.map((e) => e[0]);
  const values = sortedData.map((e) => e[1]);

  days = days.map((day) => DAYS[new Date(day).getDay()]);

  chart.data.labels = days;
  chart.data.datasets[0].label = `${properties.base}/${properties.currency}`;
  chart.data.datasets[0].data = values;
  chart.update();
}

export default makeChart;
