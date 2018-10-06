import http from "k6/http";
import { sleep, check } from "k6";

export let options = {
  vus: 300,
  rps: 3000,
  duration: "300s"
  // stages: [
  //   { duration: "1ms", target: 100 },
  //   { duration: "1m30s", target: 300 },
  //   { duration: "20s", target: 500 }
  // ]
};

export default function() {
  var id = Math.ceil(Math.random() * 10000000 + 10000001);
  let res = http.get("http://localhost:3004/api/v1/artists/" + id);
  check(res, {
    "status was 200": r => r.status == 200,
    "transaction time OK": r => r.timings.duration < 1000
  });
}
