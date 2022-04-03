import axios from "axios";

require("dotenv").config();

const api = axios.create({
  //baseURL: `http://localhost:5000/api/`,
  baseURL: `https://leonhardeuro2021.herokuapp.com/api/`,
});

export { api };
