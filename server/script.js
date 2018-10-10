import http from "k6/http";
import { sleep, check } from "k6";

export let options = {
  vus: 100,
  rps: 3000,
  duration: "300s"
};

export default function() {
  var popular = Math.ceil(Math.random() * 10000 + 10000001);
  var id = Math.ceil(Math.random() * 10000000 + 10000001);
  for (let i = 0; i < 8; i++) {
    let res = http.get("http://localhost:3004/api/v1/artists/" + (popular + i));
    check(res, {
      "status was 200": r => r.status == 200,
      "transaction time OK": r => r.timings.duration < 1000
    });
  }
  for (let k = 0; k < 2; k++) {
    let res = http.get("http://localhost:3004/api/v1/artists/" + (id + k));
    check(res, {
      "status was 200": r => r.status == 200,
      "transaction time OK": r => r.timings.duration < 1000
    });
  }
}
