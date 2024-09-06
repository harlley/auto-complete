import { useState, useEffect } from "react";
import { useDebounce } from "./useDebounce";

export function useFilterOptions(
  options: string[] | Promise<string[]>,
  query: string,
) {
  const [filteredOptions, setFilteredOptions] = useState<string[]>([]);
  const [resolvedOptions, setResolvedOptions] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const debouncedInputValue = useDebounce(query, 300);

  useEffect(() => {
    const resolveOptions = async () => {
      if (options instanceof Promise) {
        try {
          if (debouncedInputValue) {
            setIsLoading(true);
          }
          const result = await options;
          setIsLoading(false);
          setResolvedOptions(result);
        } catch (error) {
          console.error("Failed to fetch options:", error);
          setResolvedOptions([]);
        }
      } else {
        setResolvedOptions(options);
      }
    };
    resolveOptions();
  }, [options, debouncedInputValue]);

  useEffect(() => {
    if (debouncedInputValue) {
      const newFilteredOptions = resolvedOptions.filter((option) =>
        option.toLowerCase().startsWith(debouncedInputValue.toLowerCase()),
      );
      setFilteredOptions(newFilteredOptions);
    } else {
      setFilteredOptions([]);
    }
  }, [debouncedInputValue, resolvedOptions]);

  return { filteredOptions, isLoading };
}
