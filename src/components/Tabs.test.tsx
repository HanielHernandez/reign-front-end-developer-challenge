import { render, RenderResult } from '@testing-library/react'
import { FC } from 'react'
import { beforeAll, describe, expect, it } from 'vitest'
import Tabs from './Tabs'

const TestingComponent: FC = () => {
	return <div data-testid="testing-component">This is a testing component</div>
}
describe('Tests for <Tabs/>', () => {
	let wrapper: RenderResult

	const defaultProps = {
		tabs: [
			{
				name: 'Tab A',
				component: TestingComponent
			},

			{
				name: 'Tab B',
				component: TestingComponent
			}
		],
		defaultActiveTab: 'Tab A'
	}

	beforeAll(() => {
		wrapper = render(<Tabs {...defaultProps} />)
	})

	it('Should render tabs', () => {
		const tabs = wrapper.getAllByTestId(/tab/i)
		expect(tabs.length).toBe(2)
	})
})
