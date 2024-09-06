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

export function Spinner() {
  return <div className={styles.spinner}></div>;
}
