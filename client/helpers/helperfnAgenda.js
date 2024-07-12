import moment from 'moment';

export const filterItemsByCurrentMonth = (itemsData) => {
  const currentDate = moment();
  return itemsData.filter((item) => {
    const itemDate = moment(item.dateOf);
    return itemDate.isSame(currentDate, 'month');
  });
};

export const formatItems = (itemsData) => {
  const formatted = {};
  itemsData.forEach((item) => {
    const date = moment(item.dateOf).format('YYYY-MM-DD');
    if (!formatted[date]) {
      formatted[date] = [];
    }
    formatted[date].push({
      name: item.nameOf,
      email: item.email,
      time: moment(item.timeOf).format('HH:mm'),
      type: item.typeOf,
    });
  });
  return formatted;
};

export const formatHolidays = (holidaysData) => {
  const formatted = {};
  holidaysData.forEach((holiday) => {
    const date = moment(holiday.date.iso).format('YYYY-MM-DD');
    if (!formatted[date]) {
      formatted[date] = [];
    }
    formatted[date].push({
      name: holiday.name,
      description: holiday.description,
      type: 'Holidays',
    });
  });
  return formatted;
};
import axios from 'axios';
import { API_URL, CALENDARIFIC_API_KEY, CALENDARIFIC_COUNTRY, CALENDARIFIC_YEAR } from '@env';

export const fetchItems = async () => {
  const response = await axios.get(`${API_URL}/api/alls/get`);
  return response.data;
};

export const fetchHolidays = async () => {
  const response = await axios.get(
    `https://calendarific.com/api/v2/holidays?api_key=${CALENDARIFIC_API_KEY}&country=${CALENDARIFIC_COUNTRY}&year=${CALENDARIFIC_YEAR}&language=fr`
  );
  // console.log(response.data.response.holidays,'holidays');
  return response.data.response.holidays;
};
