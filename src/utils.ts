import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';

dayjs.extend(customParseFormat);

export const DATE_FORMAT = 'DD-MM-YYYY';
export const getToday = () => dayjs().format(DATE_FORMAT);
export const getCurrentTime = () => dayjs().format('HH:mm');
export const getFormattedDate = (date: Date) => dayjs(date).format(DATE_FORMAT);
export const unformatDate = (formattedDate: string) => {
    console.log(formattedDate);
    const r = dayjs(formattedDate, DATE_FORMAT).format('YYYY-MM-DD');
    console.log(r);
    return r;
};
