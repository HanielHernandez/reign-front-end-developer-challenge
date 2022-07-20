import { FC } from "react";
import { Hit } from "../models/hit";
import timeLogo from "../assets/time.png";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import favoriteLogoOn from "../assets/favorite_on.png";
import favoriteLogoOff from "../assets/favorite_off.png";

interface NewListItemProps {
  hit: Hit;
  favorite?: boolean;
  onIconClick: (hit: Hit) => void;
}
export const NewListItem: FC<NewListItemProps> = ({
  hit,
  favorite,
  onIconClick,
}) => {
  const getTimeFronNow = (date: string) => {
    dayjs.extend(relativeTime);
    return dayjs(date).fromNow();
  };

  return (
    <div className="card">
      <a href={hit.story_url} target="blank" className="card-content">
        <div className="card-title">
          <img src={timeLogo} alt="time-logo" className="card-title-icon" />
          {`${getTimeFronNow(hit.created_at)} by ${hit.author}`}
        </div>
        <div
          className="card-text"
          dangerouslySetInnerHTML={{ __html: hit.story_title }}
        ></div>
        <div
          className="card-side"
          onClick={(e) => {
            e.preventDefault();
            onIconClick(hit);
          }}
        >
          <img
            data-testid="favorite_logo"
            src={favorite ? favoriteLogoOn : favoriteLogoOff}
            alt="favorite logo"
            className="card-side-logo"
          />
        </div>
      </a>
    </div>
  );
};
