import { render, RenderResult, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import NewsList from "./NewsList";
import { MOCKED_RESPONSE } from "./test-utils";

vi.mock("NewsService", () => ({
  index: () => new Promise((resolve) => resolve(MOCKED_RESPONSE)),
  queryFilter: "angular",
  setQueryFilter: vi.fn(),
  saveAsFav: vi.fn(),
  getFavs: () => MOCKED_RESPONSE,
}));

describe("Tests for <NewsList/>", () => {
  let wrapper: RenderResult;

  beforeEach(() => {
    wrapper = render(<NewsList mode="all" />);
  });

  it("should render query filter", () => {
    const select = wrapper.getByTestId("select-container");
    expect(select).toBeDefined();
  });

  it("should render cards after loading", async () => {
    const { container } = wrapper;

    await waitFor(() => {
      const cards = container.getElementsByClassName("card");
      return expect(cards.length).toBe(8);
    });
  });
});
