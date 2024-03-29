import { FC, useState } from 'react'
import { SelectOption } from '../../models/select-option'
import SelectItem from './select-item'

interface SelectProps {
	placeholder: string
	options: SelectOption[]
	value: string
	onChange: (item: SelectOption) => void
	hide?: boolean
}

export const Select: FC<SelectProps> = ({
	options,
	placeholder,
	value,
	onChange,
	hide
}) => {
	const [isMenuOpen, setIsMenuOpen] = useState(false)
	const handleOnOptionClick = (option: SelectOption) => {
		setIsMenuOpen(false)
		onChange(option)
	}

	return (
		<div
			data-testid="select-container"
			className={`select-container ${hide ? 'hidden' : ''}`}
		>
			<input
				type="text"
				value={value}
				className="select-input"
				readOnly
				onFocus={() => setIsMenuOpen(true)}
				placeholder={placeholder}
			/>
			<div className="arrow"></div>

			{isMenuOpen && (
				<>
					<div className="select-menu">
						{options.map((option) => {
							return (
								<SelectItem
									key={option.id}
									option={option}
									onClick={() => handleOnOptionClick(option)}
								/>
							)
						})}
					</div>
					<div
						className="select-cover"
						onClick={() => setIsMenuOpen(false)}
					></div>
				</>
			)}
		</div>
	)
}
export default Select
