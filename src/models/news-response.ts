import { Article } from './Article'

export interface NewsResponse {
	hits: Article[]
	hitsPerPage?: number
	page: number
	params?: string
	query?: string
	nbPages?: number
}
