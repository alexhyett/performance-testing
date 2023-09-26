import http from 'k6/http';

export const options = {
    vus: 1,
    duration: '10s'
};

export default () => {
    http.get(`http://${__ENV.HOSTNAME}/age/1987-09-01`);
};