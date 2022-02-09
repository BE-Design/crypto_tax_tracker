import axios from "axios";

export default axios.create({
  // todo read this URL from .env
  baseURL: "http://127.0.0.1:666"
});
