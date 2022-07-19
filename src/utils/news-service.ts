import axios from "axios";
import { API_URL, SEARCH_BY_DATE_URL } from "../constants";
import { APIParams } from "../models/api-params";

const http = axios.create({
  baseURL: API_URL,
});

export class NewsService {
  index(params: APIParams): Promise<any> {
    return http.get(SEARCH_BY_DATE_URL, {
      params,
    });
  }
}

export default new NewsService();
