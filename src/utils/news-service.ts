import axios from 'axios'
import { API_URL, DEFAUL_PARAMS, SEARCH_BY_DATE_URL } from '../constants'
import { APIParams } from '../models/api-params'
import { Article } from '../models/Article'
import { NewsResponse } from '../models/news-response'
import { SelectOption } from '../models/select-option'

const http = axios.create({
	baseURL: API_URL
})

export class NewsService {
	timer: NodeJS.Timeout | null
	constructor() {
		this.timer = null
	}

	async index(params: APIParams): Promise<NewsResponse> {
		return new Promise((resolve) => {
			if (this.timer) {
				clearTimeout(this.timer)
				this.timer = null
			}

			this.timer = setTimeout(async () => {
				const { data } = await http.get(SEARCH_BY_DATE_URL, {
					params: {
						...DEFAUL_PARAMS,
						...params
					}
				})
				resolve({
					...data,
					hits: data.hits.filter(
						(article: Article) =>
							article.story_title && article.created_at && article.objectID
					)
				})
			})
		})
	}

	getSavedFavs(params: APIParams): NewsResponse {
		const { hitsPerPage, page } = { ...DEFAUL_PARAMS, ...params }
		const offset = hitsPerPage * (page || 0)
		const hits = this.favs.slice(offset, offset + hitsPerPage)

		return {
			hits,
			nbPages: Math.ceil(this.favs.length / hitsPerPage),
			page
		}
	}

	get favs(): Article[] {
		const jsonString = localStorage.getItem('saved_favs')
		return jsonString ? JSON.parse(jsonString) : []
	}

	saveAsFav(article: Article): void {
		const existingFav = this.getFav(article)
		if (existingFav) {
			localStorage.setItem(
				'saved_favs',
				JSON.stringify(
					this.favs.filter((x) => x.objectID != existingFav.objectID)
				)
			)
		} else {
			localStorage.setItem(
				'saved_favs',
				JSON.stringify([...this.favs, article])
			)
		}
	}

	getFav(article: Article): Article | undefined {
		return this.favs.find((x) => x.objectID == article.objectID)
	}

	setQueryFilter(filter: SelectOption): void {
		localStorage.setItem('query_filter', JSON.stringify(filter))
	}

	get queryFilter(): SelectOption | undefined {
		const filter = localStorage.getItem('query_filter')
		return filter ? JSON.parse(filter) : undefined
	}
}

export default new NewsService()
