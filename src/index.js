import getData from './apiHandler';

const date = new Date();
const startDate = new Date(date);
startDate.setDate(startDate.getDate() - 30);
const dateStr = date.toISOString().substring(0, 10);
const startDateStr = startDate.toISOString().substring(0, 10);
console.log(dateStr, startDateStr);

getData(startDateStr, dateStr);
