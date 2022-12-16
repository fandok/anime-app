import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import "../helpers/matchMedia.mock";
import Home from "../pages";

test("render home page and expected the data shows up", async () => {
  // Render a React element into the DOM
  render(<Home />);

  const titleText = await screen.findByText("Amartha Anime App");
  expect(titleText).toBeInTheDocument();

  const animeText = await screen.findByText("Trigun (1998)");
  expect(animeText).toBeInTheDocument();
});
