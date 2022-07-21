import { FC } from 'react'
import { Article } from '../models/Article'
import timeLogo from '../assets/time.png'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import favoriteLogoOn from '../assets/favorite_on.png'
import favoriteLogoOff from '../assets/favorite_off.png'

interface NewListItemProps {
	article: Article
	favorite?: boolean
	onIconClick: (article: Article) => void
}
export const NewListItem: FC<NewListItemProps> = ({
	article,
	favorite,
	onIconClick
}) => {
	const getTimeFronNow = (date: string) => {
		dayjs.extend(relativeTime)
		return dayjs(date).fromNow()
	}

	return (
		<div className="card">
			<a href={article.story_url} target="blank" className="card-content">
				<div className="card-title">
					<img src={timeLogo} alt="time-logo" className="card-title-icon" />
					{`${getTimeFronNow(article.created_at)} by ${article.author}`}
				</div>
				<div
					className="card-text"
					dangerouslySetInnerHTML={{ __html: article.story_title }}
				></div>
				<div
					className="card-side"
					onClick={(e) => {
						e.preventDefault()
						onIconClick(article)
					}}
				>
					<img
						data-testid="favorite-logo"
						src={favorite ? favoriteLogoOn : favoriteLogoOff}
						alt="favorite logo"
						className="card-side-logo"
					/>
				</div>
			</a>
		</div>
	)
}
