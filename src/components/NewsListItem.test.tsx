import { render } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { NewListItem } from './NewsListItem'
import {Article} from '../models/Article'

interface OptionalProps {
	article:Article
	favorite?: boolean
	onIconClick: (hit:Article) => void
}
const renderComponent = (props: OptionalProps) => {
	return render(<NewListItem {...props}></NewListItem>)
}
const title = 'Best React Practice for 2022'

const defaultProperties = {
	article: {
		author: '',
		created_at: '',
		objectID: '',
		id: '',
		story_url: '',
		story_title: title
	},
	onIconClick: vi.fn(),
	favorite: false
}

describe('Test for <NewListItem/>', () => {
	it('it should render title correctly', () => {
		const wrapper = renderComponent(defaultProperties)
		const titleElement = wrapper.getByText(title)
		expect(titleElement).toBeDefined()
	})

	it('it should render favorite icon correctly', () => {
		const wrapper = renderComponent(defaultProperties)
		const favoriteIcon = wrapper.getByAltText(/favorite/i) as HTMLImageElement
		expect(favoriteIcon.src).toBe(
			'http://localhost:3000/src/assets/favorite_off.png'
		)
	})
})
