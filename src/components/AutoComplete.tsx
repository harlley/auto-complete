import { useState } from "react";
import styles from "./AutoComplete.module.css";
import { useFilterOptions } from "./hooks/useFilterOptions";

export interface AutoCompleteProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  options: string[] | Promise<string[]>;
  onSelectOption: (value: string) => void;
}

export function AutoComplete({
  options,
  onSelectOption,
  ...inputProps
}: AutoCompleteProps) {
  const [inputValue, setInputValue] = useState("");
  const { filteredOptions, isLoading } = useFilterOptions(options, inputValue);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleOptionClick = (value: string) => {
    onSelectOption(value);
  };

  return (
    <div className={styles.root}>
      <div className={styles.inputWrapper}>
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          {...inputProps}
        />
        {isLoading && <Spinner />}
        {inputValue.length > 0 && !isLoading && (
          <ClearIcon setInputValue={setInputValue} />
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
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function Spinner() {
  return <div className={styles.spinner}></div>;
}

interface ClearIconProps {
  setInputValue: (value: string) => void;
}

function ClearIcon({ setInputValue }: ClearIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width="20"
      height="20"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={styles.clearIcon}
      onClick={() => setInputValue("")}
    >
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}
