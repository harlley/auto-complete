import styles from "./AutoComplete.module.css";

type AutoCompleteProps = {
  placeholder: string;
};

export function AutoComplete({ placeholder }: AutoCompleteProps) {
  return <div className={styles.root}>{placeholder}</div>;
}
