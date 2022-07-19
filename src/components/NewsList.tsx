import { FC, useCallback, useEffect, useState } from "react";
import { frameworkOptions } from "../constants";
import { APIParams } from "../models/api-params";
import { NewsResponse } from "../models/news-response";
import NewsService from "../utils/news-service";
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

  const handleOnOptionClick = useCallback((option: any) => {
    setSelectedFramework(option.name);
    setFilters({
      page: 0,
      query: option.id,
    });
    fetchNews();
  }, []);

  const onRenderOption = (option: any) => {
    return (
      <div
        className="select-menu-item"
        onClick={() => handleOnOptionClick(option)}
      >
        <img
          className="select-menu-item-icon"
          src={option.icon}
          alt={`${option.text} - logo}`}
        />
        <div>{option.text}</div>
      </div>
    );
  };

  const fetchNews = useCallback(async () => {
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
  }, []);

  return (
    <div>
      {mode == "all" && (
        <Select
          value={selectedFramework?.text || ""}
          options={frameworkOptions}
          onRenderOptions={onRenderOption}
          placeholder="Select your news"
        />
      )}
      {loading && <span>Loading...</span>}
      <div className="card-container">
        {news.hits.map((article) => {
          return <NewListItem key={article.id} hit={article} />;
        })}
      </div>
    </div>
  );
};
export default NewsList;
