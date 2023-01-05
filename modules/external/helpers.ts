import { AxiosError } from 'axios';

export const axiosErrorHandler = (error: AxiosError) => {
    const { data, status, statusText } = error.response || {};
    console.error('failed request', { data, status, statusText });
    throw Error('failed request');
};
