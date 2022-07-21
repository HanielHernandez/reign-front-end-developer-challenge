import { FC, useCallback, useEffect, useMemo, useState } from 'react'
import { frameworkOptions } from '../constants'
import { APIParams } from '../models/api-params'
import { Hit } from '../models/hit'
import { NewsResponse } from '../models/news-response'
import newsService from '../utils/news-service'
import NewsService from '../utils/news-service'
import Loading from './Loading'
import { NewListItem } from './NewsListItem'
import Pagination from './Pagination'
import Select from './select/Index'

interface NewListProps {
	mode: string
}
const NewsList: FC<NewListProps> = ({ mode }) => {
	const [selectedFramework, setSelectedFramework] = useState<any | null>(
		NewsService.queryFilter || null
	)
	const [filters, setFilters] = useState<APIParams>({
		page: 0,
		...(NewsService.queryFilter != undefined
			? { query: NewsService.queryFilter.id }
			: {})
	})
	const [news, setNews] = useState<NewsResponse>({ page: 0, hits: [] })
	const [loading, setLoading] = useState<boolean>(false)
	const [favs, setFavs] = useState<Hit[]>(NewsService.favs)

	const fetchNews = useCallback(async () => {
		setNews({
			...news,
			hits: []
		})
		try {
			setLoading(true)
			const response =
				mode != 'all'
					? NewsService.getSavedFavs(filters)
					: await NewsService.index(filters)
			setNews(response)
			setLoading(false)
		} catch (e) {
			setLoading(false)
			console.error(e)
		}
	}, [filters, mode])

	const handleOnQueryChange = useCallback((option: any) => {
		NewsService.setQueryFilter(option)
		setSelectedFramework(option)
		setFilters({
			page: 0,
			query: option.id
		})
	}, [])

	const handleOnIconClick = (hit: Hit) => {
		NewsService.saveAsFav(hit)
		setFavs(NewsService.favs)
	}

	useEffect(() => {
		fetchNews()
	}, [filters])

	useEffect(() => {
		setFilters({
			page: 0
		})
	}, [mode])

	const isInFavs = (article: Hit) => {
		return favs.findIndex((x) => x.objectID == article.objectID) > -1
	}

	return (
		<div className="tabs-content">
			<Select
				data-testid="select"
				value={selectedFramework?.text || ''}
				options={frameworkOptions}
				onChange={handleOnQueryChange}
				hide={mode != 'all'}
				placeholder="Select your news"
			/>

			<div className="card-container">
				{!loading && news.hits.length == 0 && (
					<div style={{ width: '100%', textAlign: 'center' }}>
						No news found
					</div>
				)}
				{loading && (
					<div className="spinner-container">
						<Loading></Loading>
					</div>
				)}
				{news.hits.map((article) => {
					const isFav = isInFavs(article)
					return (
						<>
							{isFav}
							<NewListItem
								key={article.objectID}
								onIconClick={handleOnIconClick}
								favorite={isFav}
								hit={article}
							/>
						</>
					)
				})}
			</div>
			<Pagination
				onChange={(page: number) =>
					setFilters({
						...filters,
						page: page - 1
					})
				}
				totalPages={news.nbPages || 0}
				currentPage={news.page + 1 || 0}
			></Pagination>
		</div>
	)
}
export default NewsList
