import axios from "axios";
import { API_URL, SEARCH_BY_DATE_URL } from "../constants";
import { APIParams } from "../models/api-params";
import { NewsResponse } from "../models/news-response";

const http = axios.create({
  baseURL: API_URL,
});

export class NewsService {
  async index(params: APIParams): Promise<NewsResponse> {
    const {data} =  await http.get(SEARCH_BY_DATE_URL, {
      params,
    });
    return data
  }
}

export default new NewsService();
