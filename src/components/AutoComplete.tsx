import { useState, forwardRef } from "react";
import styles from "./AutoComplete.module.css";
import { useFilterOptions } from "./hooks/useFilterOptions";

export interface AutoCompleteProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  options: string[] | Promise<string[]>;
  onSelectOption: (value: string) => void;
}

export const AutoComplete = forwardRef<HTMLInputElement, AutoCompleteProps>(
  ({ options, onSelectOption, ...inputProps }, ref) => {
    const [inputValue, setInputValue] = useState("");
    const { filteredOptions, isLoading } = useFilterOptions(
      options,
      inputValue,
    );

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setInputValue(event.target.value);
    };

    const handleOptionClick = (value: string) => {
      onSelectOption(value);
    };

    const highlightOption = (option: string, inputValueLength: number) => (
      <>
        <u>{option.slice(0, inputValueLength)}</u>
        {option.slice(inputValueLength)}
      </>
    );

    return (
      <div className={styles.root}>
        <div className={styles.inputWrapper}>
          <input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            {...inputProps}
            ref={ref}
          />
          {isLoading && <Spinner />}
          {inputValue.length > 0 && !isLoading && (
            <Clear setInputValue={setInputValue} />
          )}
        </div>

        {filteredOptions.length > 0 && (
          <ul className={styles.optionsList}>
            {filteredOptions.map((option, index) => (
              <li
                key={index}
                className={styles.option}
                onClick={() => handleOptionClick(option)}
              >
                {highlightOption(option, inputValue.length)}
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  },
);

const Spinner = () => <div role="progressbar" className={styles.spinner}></div>;

type ClearProps = {
  setInputValue: (value: string) => void;
};

const Clear = ({ setInputValue }: ClearProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20 20"
    width="20"
    height="20"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={styles.clear}
    onClick={() => setInputValue("")}
    role="button"
  >
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);
