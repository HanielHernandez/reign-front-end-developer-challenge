import { FunctionComponent, useCallback, useMemo, useState } from 'react'
import { Tab } from '../models/tab'

interface Props {
	tabs: Tab[]
	defaultActiveTab: string
}

const Tabs: FunctionComponent<Props> = ({ tabs, defaultActiveTab }) => {
	const [activeTab, setActiveTab] = useState<string>(defaultActiveTab)
	const currentTab = useMemo(
		() => tabs.find((tab) => tab.name == activeTab) || tabs[0],
		[activeTab]
	)

	const handleOnTabClick = useCallback((tab: Tab) => {
		setActiveTab(tab.name)
	}, [])
	return (
		<div className="tabs-container">
			<div className="tabs">
				{tabs.map((tab) => {
					return (
						<div
							key={tab.name}
							data-testid="tab"
							className={`tab ${activeTab == tab.name ? 'active' : ''}`}
							onClick={() => handleOnTabClick(tab)}
						>
							{tab.name}
						</div>
					)
				})}
			</div>
			{currentTab.onRender()}
		</div>
	)
}

export default Tabs
