import { useState } from "react";
import styles from "./AutoComplete.module.css";
import { useAutoComplete } from "./hooks/useAutoComplete";

type AutoCompleteProps = {
  placeholder: string;
  options: string[] | Promise<string[]>;
};

export function AutoComplete({ placeholder, options }: AutoCompleteProps) {
  const [inputValue, setInputValue] = useState("");
  const { filteredOptions, isLoading } = useAutoComplete(options, inputValue);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  return (
    <div className={styles.root}>
      <div className={styles.inputWrapper}>
        <input
          type="text"
          placeholder={placeholder}
          value={inputValue}
          onChange={handleInputChange}
        />

        {isLoading && <Spinner />}
      </div>

      {filteredOptions.length > 0 && (
        <ul>
          {filteredOptions.map((option, index) => (
            <li key={index}>{option}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

export function Spinner() {
  return <div className={styles.spinner}></div>;
}
