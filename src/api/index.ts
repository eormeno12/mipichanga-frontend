import axios from "axios";
import { env } from "../../config";

export const users_api = axios.create({
  baseURL: env.users_api,
  withCredentials: true,
});

export const fields_api = axios.create({
  baseURL: env.fields_api,
  withCredentials: false,
});

export const matches_api = axios.create({
  baseURL: env.matches_api,
  withCredentials: true,
});
