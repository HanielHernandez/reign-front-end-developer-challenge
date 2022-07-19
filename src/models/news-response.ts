import { Hit } from "./hit";

export interface NewsResponse {
  hits: Hit[];
  hitsPerPage?: number;
  page: number;
  params?: string;
  query?: string;
}
