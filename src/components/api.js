import axios from "axios";

// Must be same as the json-server port,currently at port 2000
// json-server "src/assets/api/api.json" --port 2000

export default axios.create({
  baseURL: "http://localhost:2000"
});