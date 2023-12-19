import http from 'k6/http';
import { sleep } from 'k6';

export const options = {
  stages: [
    { duration: '30s', target: 25 }, // Average-load: 50 users for 10 minutes
    { duration: '5m', target: 50 }, // Spike: Sudden increase to 50 users for 5 minutes
    { duration: '5m', target: 100 }, // Stress: Sudden increase to 100 users for 5 minutes
  ],
};

export default function () {
  http.get('http://localhost:5173/');
  sleep(1);
}
