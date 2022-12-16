import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import "../helpers/matchMedia.mock";
import Detail from "../pages/detail/[id]";
import mockRouter from "next-router-mock";
import { createDynamicRouteParser } from "next-router-mock/dynamic-routes";

mockRouter.useParser(createDynamicRouteParser(["/detail/[id]"]));

jest.mock("next/router", () => require("next-router-mock"));

describe("Detail page", () => {
  beforeEach(() => {
    mockRouter.setCurrentUrl("/detail/44511");
  });

  it("renders correctly without error", async () => {
    render(<Detail />);
    const detailTitle = await screen.findByText("Chainsaw Man (2022)");
    expect(detailTitle).toBeInTheDocument();
  });
});
