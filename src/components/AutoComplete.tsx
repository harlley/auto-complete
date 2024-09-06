import { useState } from "react";
import styles from "./AutoComplete.module.css";
import { useAutoComplete } from "./hooks/useAutoComplete";

type AutoCompleteProps = {
  placeholder: string;
  options: string[] | Promise<string[]>;
};

export function AutoComplete({ placeholder, options }: AutoCompleteProps) {
  const [inputValue, setInputValue] = useState("");
  const filteredOptions = useAutoComplete(options, inputValue);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  return (
    <div className={styles.root}>
      <input
        type="text"
        placeholder={placeholder}
        value={inputValue}
        onChange={handleInputChange}
      />
      {filteredOptions.length > 0 && (
        <ul className={styles.optionsList}>
          {filteredOptions.map((option, index) => (
            <li key={index} className={styles.option}>
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
