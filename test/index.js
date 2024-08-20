import http from 'k6/http';
import { sleep } from 'k6';

// Define scenarios
export let options = {
  scenarios: {
    // Average Load
    average_load: {
      executor: 'ramping-vus',
      startVUs: 0,
      stages: [
        { duration: '2m', target: 100 }, // ramp-up to 100 users over 2 minutes
        { duration: '3m', target: 100 }, // stay at 100 users for 3 minutes
        { duration: '2m', target: 0 }, // ramp-down to 0 users over 2 minutes
      ],
      startTime: '0s',
    },
    // Spike Test
    spike_test: {
      executor: 'ramping-vus',
      startVUs: 0,
      stages: [
        { duration: '30s', target: 0 }, // warm-up period with 0 users
        { duration: '30s', target: 1000 }, // spike to 1000 users within 30 seconds
        { duration: '1m', target: 1000 }, // stay at 1000 users for 1 minute
        { duration: '2m', target: 0 }, // ramp-down to 0 users over 2 minutes
      ],
      startTime: '10m',
    },
    // Stress Test
    stress_test: {
      executor: 'ramping-vus',
      startVUs: 0,
      stages: [
        { duration: '2m', target: 200 }, // ramp-up to 200 users over 2 minutes
        { duration: '2m', target: 400 }, // ramp-up to 400 users over 2 minutes
        { duration: '2m', target: 600 }, // ramp-up to 600 users over 2 minutes
        { duration: '2m', target: 800 }, // ramp-up to 800 users over 2 minutes
        { duration: '2m', target: 1000 }, // ramp-up to 1000 users over 2 minutes
        { duration: '5m', target: 1000 }, // stay at 1000 users for 5 minutes
        { duration: '2m', target: 0 }, // ramp-down to 0 users over 2 minutes
      ],
      startTime: '15m',
    },
  },
};

export default function () {
  // Replace with your server's URL
  const url = 'http://localhost:8080/products';
  http.get(url);
  sleep(1);
}
