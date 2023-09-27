import http from 'k6/http';
import { sleep } from 'k6';
import { SharedArray } from 'k6/data';

var hostname = __ENV.HOSTNAME;
if (hostname == null) hostname = 'localhost:5157';

export const options = {
    stages: [
        { duration: '10s', target: 200 }, // ramp up
        { duration: '1m', target: 200 }, // stable
        { duration: '10s', target: 2000 }, // ramp up
        { duration: '5m', target: 2000 }, // stable
        { duration: '10s', target: 200 }, // ramp up
        { duration: '1m', target: 200 }, // stable
        { duration: '10s', target: 0 }, // ramp-down to 0 users
    ],
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
    http.get(`http://${hostname}/age/${randomDate}`);
    sleep(1);
};