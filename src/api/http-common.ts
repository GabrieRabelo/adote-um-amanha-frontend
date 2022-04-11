import { getAccessToken } from "../modules/shared/utils/AuthenticationManager";
import axios from "axios";

export const HTTP = axios.create({
  baseURL: `http://localhost:8090/api/`,
  headers: {
    "Content-Type": "application/json",
  },
  transformRequest: [
    function (data, headers: any) {
      headers.common.Authorization = `Bearer ${getAccessToken()}`;
      return JSON.stringify(data);
    },
  ],
});
