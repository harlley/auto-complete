import { cleanup, render } from "@testing-library/react";
import { afterEach, describe, it } from "vitest";
import { AutoComplete } from ".";
import { countries } from "./mock/countries";

describe("AutoComplete test:", () => {
  afterEach(cleanup);

  it("should render component", () => {
    render(
      <AutoComplete
        placeholder="Type a country"
        options={countries}
        onSelectOption={() => {}}
      />,
    );
  });
});
