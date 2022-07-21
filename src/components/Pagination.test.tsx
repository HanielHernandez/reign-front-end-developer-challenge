import { render, RenderResult } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import Pagination from './Pagination'

describe('Tests for <Pagination/>', () => {
	const onChange = vi.fn()
	const defaultProps = {
		totalPages: 10,
		currentPage: 3,
		onChange
	}
	let wrapper: RenderResult

	const renderComponent = (props: typeof defaultProps) => {
		return render(<Pagination {...defaultProps} {...props} />)
	}

	beforeEach(() => {
		wrapper = renderComponent(defaultProps)
	})

	it('should render pagination buttons properly ', async () => {
		const { container } = await wrapper
		const paginationButtons =
			container.getElementsByClassName('pagination-button')

		expect(paginationButtons.length).toBe(13)
	})
})
