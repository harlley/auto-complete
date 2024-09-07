import {
  cleanup,
  render,
  screen,
  fireEvent,
  waitFor,
} from "@testing-library/react";
import { afterEach, describe, it, vi, expect } from "vitest";
import { AutoComplete, AutoCompleteProps } from "./AutoComplete";
import { useFilterOptions } from "./hooks/useFilterOptions";

const mockOptions = ["Brazil", "Portugal", "Poland", "USA"];
const mockFilteredOptions = ["Portugal", "Poland"];

vi.mock("./hooks/useFilterOptions", () => ({
  useFilterOptions: vi.fn(() => ({
    filteredOptions: mockFilteredOptions,
    isLoading: false,
  })),
}));

describe("AutoComplete", () => {
  afterEach(cleanup);
  const setup = (props: Partial<AutoCompleteProps> = {}) => {
    const defaultProps: AutoCompleteProps = {
      options: mockOptions,
      onSelectOption: vi.fn(),
      ...props,
    };
    return render(<AutoComplete {...defaultProps} />);
  };

  it("renders input element", () => {
    setup();
    expect(screen.getByRole("textbox")).toBeInTheDocument();
  });

  it("filters and displays options when typing", async () => {
    setup();
    const input = screen.getByRole("textbox");

    fireEvent.change(input, { target: { value: "po" } });

    await waitFor(() => {
      expect(
        screen.getByText((_, element) => element?.textContent === "Portugal"),
      ).toBeInTheDocument();
      expect(
        screen.getByText((_, element) => element?.textContent === "Poland"),
      ).toBeInTheDocument();
    });
  });

  it("calls onSelectOption when an option is clicked", async () => {
    const onSelectOption = vi.fn();
    setup({ onSelectOption });

    fireEvent.change(screen.getByRole("textbox"), { target: { value: "po" } });

    await waitFor(() => {
      const option = screen.getByText(
        (_, element) => element?.textContent === "Portugal",
      );
      fireEvent.click(option);
    });

    expect(onSelectOption).toHaveBeenCalledWith("Portugal");
  });

  it("shows loading spinner when options are loading", () => {
    vi.mocked(useFilterOptions).mockReturnValue({
      filteredOptions: [],
      isLoading: true,
    });

    setup();

    expect(screen.getByRole("progressbar")).toBeInTheDocument();
  });

  it("displays Clear component and clears input when clicked", async () => {
    vi.mocked(useFilterOptions).mockReturnValue({
      filteredOptions: ["Apple", "Banana"],
      isLoading: false,
    });
    setup();
    const input = screen.getByRole("textbox");

    fireEvent.change(input, { target: { value: "a" } });

    await waitFor(() => {
      expect(screen.getByRole("button")).toBeInTheDocument();
    });

    fireEvent.click(screen.getByRole("button"));

    expect(input).toHaveValue("");
  });

  it("does not render options list when no options are filtered", () => {
    vi.mocked(useFilterOptions).mockReturnValue({
      filteredOptions: [],
      isLoading: false,
    });

    setup();

    expect(screen.queryByRole("list")).not.toBeInTheDocument();
  });
});
