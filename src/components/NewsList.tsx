import { FC, useCallback, useEffect, useState } from 'react'
import { ERROR_MESSAGE, frameworkOptions } from '../constants'
import { APIParams } from '../models/api-params'
import { Article } from '../models/Article'
import { NewsResponse } from '../models/news-response'
import { SelectOption } from '../models/select-option'
import NewsService from '../utils/news-service'
import Loading from './Loading'
import { NewListItem } from './NewsListItem'
import Pagination from './Pagination'
import Select from './select/index'

interface NewListProps {
	mode: string
}
const NewsList: FC<NewListProps> = ({ mode }) => {
	const [selectedFramework, setSelectedFramework] =
		useState<SelectOption | null>(NewsService.queryFilter || null)
	const [filters, setFilters] = useState<APIParams>({
		page: 0,
		...(selectedFramework ? { query: selectedFramework.id } : {})
	})
	const [news, setNews] = useState<NewsResponse>({ page: 0, hits: [] })
	const [loading, setLoading] = useState<boolean>(false)
	const [favs, setFavs] = useState<Article[]>(NewsService.favs)
	const [errorMessage, setErrorMessage] = useState('')

	const fetchNews = useCallback(async () => {
		setErrorMessage('')
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
			setErrorMessage(ERROR_MESSAGE)
			console.error(e)
		}
	}, [filters, mode])

	const handleOnQueryChange = useCallback((option: SelectOption) => {
		NewsService.setQueryFilter(option)
		setSelectedFramework(option)
		setFilters({
			page: 0,
			query: option.id
		})
	}, [])

	const handleOnIconClick = (article: Article) => {
		NewsService.saveAsFav(article)
		setFavs(NewsService.favs)
	}
	const isInFavs = (article: Article) => {
		return favs.findIndex((x) => x.objectID == article.objectID) > -1
	}

	useEffect(() => {
		fetchNews()
	}, [filters])

	useEffect(() => {
		setFilters({
			...filters,
			page: 0
		})
	}, [mode])

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
				{!loading && !errorMessage && news.hits.length == 0 && (
					<div style={{ width: '100%', textAlign: 'center' }}>
						No news found
					</div>
				)}

				{!loading && errorMessage && (
					<div style={{ color: 'red', width: '100%', textAlign: 'center' }}>
						{errorMessage}
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
							<NewListItem
								key={article.objectID}
								onIconClick={handleOnIconClick}
								favorite={isFav}
								article={article}
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
