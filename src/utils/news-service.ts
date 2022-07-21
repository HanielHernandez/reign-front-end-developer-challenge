import axios from 'axios'
import { API_URL, DEFAUL_PARAMS, SEARCH_BY_DATE_URL } from '../constants'
import { APIParams } from '../models/api-params'
import {Article} from '../models/Article'
import { NewsResponse } from '../models/news-response'
import { SelectOption } from '../models/select-option'

const http = axios.create({
	baseURL: API_URL
})

export class NewsService {
	async index(params: APIParams): Promise<NewsResponse> {
		const { data } = await http.get(SEARCH_BY_DATE_URL, {
			params: {
				...DEFAUL_PARAMS,
				...params
			}
		})
		return data
	}

	getSavedFavs(params: APIParams): NewsResponse {
		const { hitsPerPage, page } = { ...DEFAUL_PARAMS, ...params }
		const offset = hitsPerPage * (page || 0)
		const hits = this.favs.slice(offset, offset + hitsPerPage)

		return {
			hits,
			nbPages: Math.ceil(this.favs.length / hitsPerPage) + 1,
			...(page ? { page } : { page: 0 })
		}
	}

	get favs():Article[] {
		const jsonString = localStorage.getItem('saved_favs')
		return jsonString ? JSON.parse(jsonString) : []
	}

	saveAsFav(article:Article): void {
		const existingFav = this.getFav(article)
		if (existingFav) {
			localStorage.setItem(
				'saved_favs',
				JSON.stringify(
					this.favs.filter((x) => x.objectID != existingFav.objectID)
				)
			)
		} else {
			localStorage.setItem('saved_favs', JSON.stringify([...this.favs,article]))
		}
	}

	getFav(article:Article):Article| undefined {
		return this.favs.find((x) => x.objectID ==article.objectID)
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
