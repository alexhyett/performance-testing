import http from 'k6/http';
import { sleep } from 'k6';
import { SharedArray } from 'k6/data';

export const options = {
    stages: [
        { duration: '5m', target: 200 }, // ramp up
        { duration: '20m', target: 200 }, // stable
        { duration: '5m', target: 0 }, // ramp-down to 0 users
    ],
    thresholds: {
        http_req_duration: ['p(99)<10'], // 99% of requests must complete within 10ms
    }
};

const dates = new SharedArray('dates', function () {
    var dates = [];
    var currentDate = new Date();
    var minDate = new Date();
    minDate.setFullYear(currentDate.getFullYear() - 100);

    for (var i = 0; i < 100; i++) {
        var randomTime = Math.random() * (currentDate.getTime() - minDate.getTime());
        var randomDate = new Date(minDate.getTime() + randomTime);
        dates.push(randomDate.toISOString());
    }

    return dates;
});

export default () => {
    const randomDate = dates[Math.floor(Math.random() * dates.length)];
    http.get(`http://${__ENV.HOSTNAME}/age/${randomDate}`);
    sleep(1);
};