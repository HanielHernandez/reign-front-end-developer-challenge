import { render } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { NewListItem } from "./NewsListItem";
import favoriteLogoOff from "../assets/favorite_ff.png";

interface OptionalPros {
  hit: any;
  favorite?: boolean;
  onIconClick: (hit: any) => void;
}
const renderComponent = (props: OptionalPros) => {
  return render(<NewListItem {...props}></NewListItem>);
};

describe("Tet for <NewListItem/>", () => {
  const title = "Best React Practice for 2022";
  const wrapper = renderComponent({
    hit: {
      story_title: title,
    },
    onIconClick: () => {},
    favorite: false
  });
  test("should render title correctly", () => {
    const titleElement = wrapper.getByText(title);
    expect(titleElement).toBeDefined();
  });
  test("should render favorite icon correctly", ()=>{
    const favoriteIcon =  wrapper.getByTestId("favorite_logo") as HTMLImageElement 
    expect(favoriteIcon.src).toBe(favoriteLogoOff)
    
  })

  test;
});
