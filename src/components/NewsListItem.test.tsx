import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { NewListItem } from "./NewsListItem";
import favoriteLogoOff from "../assets/favorite_ff.png";

interface OptionalProps {
  hit: any;
  favorite?: boolean;
  onIconClick: (hit: any) => void;
}
const renderComponent = (props: OptionalProps) => {
  return render(<NewListItem {...props}></NewListItem>);
};

describe("Test for <NewListItem/>", () => {
  it("it should render title correctly", () => {
    const title = "Best React Practice for 2022";
    const wrapper = renderComponent({
      hit: {
        story_title: title,
      },
      onIconClick: () => {},
      favorite: false,
    });
    const titleElement = wrapper.getByText(title);
    expect(titleElement).toBeDefined();
  });

  it("it should render favorite icon correctly", () => {
    const wrapper = renderComponent({
      hit: {
        story_title: "",
      },
      onIconClick: () => {},
      favorite: false,
    });
    const favoriteIcon = wrapper.getByAltText(/favorite/i) as HTMLImageElement;
    expect(favoriteIcon.src).toBe(
      "http://localhost:3000/src/assets/favorite_off.png"
    );
  });
});
