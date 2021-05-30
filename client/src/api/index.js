import axios from "axios";

export const server = axios.create({
  baseURL: "http://localhost:3001",
});

export const alphaVantage = axios.create({
  baseURL: "https://www.alphavantage.co",
  params: { apikey: `9VTUD3XE4HKHNVBM` },
});

export const finPrep = axios.create({
  baseURL: "https://financialmodelingprep.com/api/v3",
  params: { apikey: "55291f85eb8b58745cc80fe4c443ba2c" },
});

export const finHub = axios.create({
  baseURL: "https://finnhub.io/api/v1",
  params: {
    token: "c2b9odaad3i8k5kfml40",
  },
});
