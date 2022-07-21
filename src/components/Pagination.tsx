import { FC, useMemo } from 'react'
import { DOTS } from '../constants'
import { range } from '../utils'

interface PaginationProps {
	totalPages: number
	currentPage: number
	onChange: (page: number) => void
}

export const Pagination: FC<PaginationProps> = ({
	currentPage,
	totalPages,
	onChange
}) => {
	const pages = useMemo(() => {
		const siblingCount = 3
		const totalPageNumbers = siblingCount + 5
		const totalPagesCount = totalPages
		if (totalPageNumbers >= totalPagesCount) {
			return range(1, totalPagesCount)
		}
		const leftSiblingIndex = Math.max(currentPage - siblingCount, 1)
		const rightSiblingIndex = Math.min(
			currentPage + siblingCount,
			totalPagesCount
		)
		const shouldShowLeftDots = leftSiblingIndex > 2
		const shouldShowRightDots = rightSiblingIndex < totalPagesCount - 2

		const firstPageIndex = 1
		const lastPageIndex = totalPagesCount

		if (!shouldShowLeftDots && shouldShowRightDots) {
			const leftItemCount = 3 + 2 * siblingCount
			const leftRange = range(1, leftItemCount)

			return [...leftRange, DOTS, totalPagesCount]
		}

		if (shouldShowLeftDots && !shouldShowRightDots) {
			const rightItemCount = 3 + 2 * siblingCount
			const rightRange = range(
				totalPagesCount - rightItemCount + 1,
				totalPagesCount
			)
			return [firstPageIndex, DOTS, ...rightRange]
		}

		if (shouldShowLeftDots && shouldShowRightDots) {
			const middleRange = range(leftSiblingIndex, rightSiblingIndex)
			return [firstPageIndex, DOTS, ...middleRange, DOTS, lastPageIndex]
		}
	}, [totalPages, currentPage])

	return (
		<div className="pagination">
			<button
				disabled={currentPage == 1}
				onClick={() => onChange(currentPage - 1)}
				className="pagination-button"
			>
				<div className="arrow right"></div>
			</button>

			{pages?.map((page: string | number, index: number) => {
				return typeof page == 'number' ? (
					<button
						key={`page-button-${page}`}
						onClick={() => onChange(page)}
						className={`pagination-button ${
							page == currentPage ? 'active' : ''
						}`}
					>
						{page}
					</button>
				) : (
					<button
						key={`page-button-dots-${index}`}
						className="pagination-button dots"
					>
						{DOTS}
					</button>
				)
			})}

			<button
				disabled={currentPage == totalPages}
				onClick={() => onChange(currentPage + 1)}
				className="pagination-button"
			>
				<div className="arrow left"></div>
			</button>
		</div>
	)
}

export default Pagination
