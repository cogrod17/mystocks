import axios from "axios";

const API_KEY = `9VTUD3XE4HKHNVBM`;

export default axios.create({
  baseURL: "https://www.alphavantage.co",
  params: { apikey: API_KEY },
});
