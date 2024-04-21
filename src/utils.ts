import dayjs from 'dayjs';

export const getToday = () => dayjs().format('DD-MM-YYYY');
export const getCurrentTime = () => dayjs().format('HH:mm');
