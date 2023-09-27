import http from 'k6/http';

var hostname = __ENV.HOSTNAME;
if (hostname == null) hostname = 'localhost:5157';

export const options = {
    vus: 1,
    duration: '10s'
};

export default () => {
    http.get(`http://${hostname}/age/1987-09-01`);
};