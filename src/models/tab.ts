import { ReactNode } from 'react'

export interface Tab {
	name: string
	onRender: () => ReactNode
}
