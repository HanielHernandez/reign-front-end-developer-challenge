import { FC, useCallback, useEffect, useMemo, useState } from "react";
import { frameworkOptions } from "../constants";
import { APIParams } from "../models/api-params";
import { Hit } from "../models/hit";
import { NewsResponse } from "../models/news-response";
import newsService from "../utils/news-service";
import NewsService from "../utils/news-service";
import Loading from "./Loading";
import { NewListItem } from "./NewsListItem";
import Select from "./select";

interface NewListProps {
  mode: string;
}
const NewsList: FC<NewListProps> = ({ mode }) => {
  const [selectedFramework, setSelectedFramework] = useState<any | null>();
  const [filters, setFilters] = useState<APIParams>({ page: 0 });
  const [news, setNews] = useState<NewsResponse>({ page: 0, hits: [] });
  const [loading, setLoading] = useState<Boolean>(false);
  const [favs, setFavs] = useState<Hit[]>(NewsService.favs);

  const handleOnQueryChange = useCallback((option: any) => {
    console.log("query change", option);
    setSelectedFramework(option);
    setFilters({
      page: 0,
      query: option.id,
    });
  }, []);

  const handleOnIconClick = (hit: Hit) => {
    console.log(hit);
    NewsService.saveAsFav(hit);
    setFavs(NewsService.favs);
  };

  const fetchNews = useCallback(async () => {
    setNews({
      ...news,
      hits: [],
    });
    try {
      setLoading(true);
      const response = await NewsService.index(filters);
      setNews(response);
      setLoading(false);
    } catch (e) {
      setLoading(false);
      console.error(e);
    }
  }, [filters]);

  useEffect(() => {
    fetchNews();
  }, [filters]);

  return (
    <div className="tabs-content">
      <Select
        value={selectedFramework?.text || ""}
        options={frameworkOptions}
        onChange={handleOnQueryChange}
        hide={mode != "all"}
        placeholder="Select your news"
      />
      {loading && (
        <div className="spinner-container">
          <Loading></Loading>
        </div>
      )}
      <div className="card-container">
        {news.hits.map((article) => {
          return (
            <NewListItem
              key={article.objectID}
              onIconClick={handleOnIconClick}
              favorite={NewsService.getFav(article) != undefined}
              hit={article}
            />
          );
        })}
      </div>
    </div>
  );
};
export default NewsList;
