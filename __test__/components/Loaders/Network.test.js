import Network from "~/components/Loaders/Network";
import React from "react";
import { render, screen } from "@testing-library/react";

describe("An example test", () => {
  it("should expect something", async () => {
    render(<Network />);
    expect(await screen.findAllByTestId("svg")).toHaveLength(1);
  });
});
