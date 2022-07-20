import { FC, useCallback, useEffect, useMemo, useState } from "react";
import { frameworkOptions } from "../constants";
import { APIParams } from "../models/api-params";
import { Hit } from "../models/hit";
import { NewsResponse } from "../models/news-response";
import newsService from "../utils/news-service";
import NewsService from "../utils/news-service";
import Loading from "./Loading";
import { NewListItem } from "./NewsListItem";
import Pagination from "./Pagination";
import Select from "./select";

interface NewListProps {
  mode: string;
}
const NewsList: FC<NewListProps> = ({ mode }) => {
  const [selectedFramework, setSelectedFramework] = useState<any | null>(
    NewsService.queryFilter || null
  );
  const [filters, setFilters] = useState<APIParams>({
    page: 0,
    ...(NewsService.queryFilter != undefined
      ? {
          query: NewsService.queryFilter.id,
        }
      : {}),
  });
  const [news, setNews] = useState<NewsResponse>({ page: 0, hits: [] });
  const [loading, setLoading] = useState<Boolean>(false);

  const handleOnQueryChange = useCallback((option: any) => {
    console.log("query change", option);
    NewsService.setQueryFilter(option);
    setSelectedFramework(option);
    setFilters({
      page: 0,
      query: option.id,
    });
  }, []);

  const handleOnIconClick = (hit: Hit) => {
    NewsService.saveAsFav(hit);
  };

  const fetchNews = useCallback(async () => {
    setNews({
      ...news,
      hits: [],
    });
    try {
      setLoading(true);
      const response =
        mode != "all"
          ? NewsService.getFavs(filters)
          : await NewsService.index(filters);
      setNews(response);
      setLoading(false);
    } catch (e) {
      setLoading(false);
      console.error(e);
    }
  }, [filters, mode]);

  useEffect(() => {
    fetchNews();
  }, [filters]);

  useEffect(() => {
    setFilters({
      page: 0,
    });
  }, [mode]);

  return (
    <div className="tabs-content">
      <Select
        value={selectedFramework?.text || ""}
        options={frameworkOptions}
        onChange={handleOnQueryChange}
        hide={mode != "all"}
        placeholder="Select your news"
      />
      {!loading && news.hits.length == 0 && (
        <p style={{ textAlign: "center" }}>No news found</p>
      )}

      <div className="card-container">
        {loading && (
          <div className="spinner-container">
            <Loading></Loading>
          </div>
        )}
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
      <Pagination
        onChange={(page: number) =>
          setFilters({
            ...filters,
            page: page - 1,
          })
        }
        totalPages={news.nbPages || 0}
        currentPage={news.page + 1 || 0}
      ></Pagination>
    </div>
  );
};
export default NewsList;
