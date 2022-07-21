import { render, RenderResult, waitFor } from '@testing-library/react'
import { beforeEach, describe, expect, it } from 'vitest'
import Select from '.'
import { SelectOption } from '../../models/select-option'

interface OptionalProps {
	placeholder: string
	options: any[]
	value: string
	onChange: (item: SelectOption) => void
	hide?: boolean
}
const renderComponent = (props: OptionalProps) => {
	return render(<Select {...props}></Select>)
}
describe('Test for <Select/>', () => {
	let wrapper: RenderResult
	const placeholder = 'My select'
	const defaultProps = {
		placeholder,
		options: [
			{
				id: 'angular',
				text: 'Angular'
			},
			{
				id: 'react',
				text: 'React'
			}
		],
		value: '',
		onChange: () => {}
	}

	beforeEach(() => {
		wrapper = renderComponent(defaultProps)
	})

	it('should render placeholder correactly', () => {
		expect(wrapper.getByPlaceholderText(placeholder)).toBeDefined()
	})

	it('should render options on input focus ', async () => {
		const input = wrapper.getByPlaceholderText(placeholder)
		input.focus()

		await waitFor(() => {
			const { container } = wrapper
			const menuItems = container.getElementsByClassName('select-menu-item')
			return expect(menuItems.length).toBe(2)
		})
	})

	it('should add hideen class if hide property is passed', () => {
		wrapper.rerender(<Select {...defaultProps} hide></Select>)
		const container = wrapper.getByTestId('select-container')
		expect(container.classList.contains('hidden')).toBeTruthy()
	})
})
