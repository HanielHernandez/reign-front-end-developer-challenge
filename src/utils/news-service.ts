import axios from "axios";
import { API_URL, DEFAUL_PARAMS, SEARCH_BY_DATE_URL } from "../constants";
import { APIParams } from "../models/api-params";
import { Hit } from "../models/hit";
import { NewsResponse } from "../models/news-response";

const http = axios.create({
  baseURL: API_URL,
});

export class NewsService {
  async index(params: APIParams): Promise<NewsResponse> {
    const { data } = await http.get(SEARCH_BY_DATE_URL, {
      params: {
        ...DEFAUL_PARAMS,
        ...params,
      },
    });
    return data;
  }

  getFavs(params: APIParams): NewsResponse {
    return { hits: this.favs, page: 0 };
  }

  get favs(): Hit[] {
    const jsonString = localStorage.getItem("saved_favs");
    return jsonString ? JSON.parse(jsonString) : [];
  }

  saveAsFav(hit: Hit): void {
    const existingFav = this.getFav(hit);
    console.log(this.favs);
    if (existingFav) {
      const newFavs = [
        ...this.favs.filter((x) => x.objectID != existingFav.objectID),
      ];
      localStorage.setItem("saved_favs", JSON.stringify(newFavs));
    } else {
      localStorage.setItem("saved_favs", JSON.stringify([...this.favs, hit]));
    }
  }

  getFav(hit: Hit): Hit | undefined {
    return this.favs.find((x) => x.objectID == hit.objectID);
  }
}

export default new NewsService();
