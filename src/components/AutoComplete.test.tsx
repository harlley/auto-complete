import { cleanup, render } from "@testing-library/react";
import { afterEach, describe, it } from "vitest";
import { AutoComplete } from ".";

describe("AutoComplete test:", () => {
  afterEach(cleanup);

  it("should render component", () => {
    const countries = ["USA", "Canada", "Mexico"];
    render(<AutoComplete placeholder="Testing" options={countries} />);
  });
});
