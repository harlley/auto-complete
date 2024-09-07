# AutoComplete Component

This is a simple autocomplete component that allows you to search for a list of items and select one of them.

## Node version used

v20.10.0

## How to run the storybook

1. Run `npm install`
2. Run `npm run storybook`
3. Open your browser and go to `http://localhost:6006/`

## How to run the tests

1. Run `npm install`
2. Run `npm run test`

## How to use the component in an external local project

1. Run `npm install`
2. Run `npm run build`
3. Run `npm link`
4. In your project run `npm link auto-complete`
5. This is an example of how to use the component:

```tsx
import { AutoComplete } from "auto-complete";
import { useEffect, useRef, useState } from "react";

type StarWarsCharacter = {
  name: string;
};

function App() {
  const refElement = useRef<HTMLInputElement>(null);
  const [starWarsCharacters, setStarWarsCharacters] = useState<string[]>([]);

  useEffect(() => {
    fetch("https://swapi.dev/api/people/?format=json")
      .then((response) => response.json())
      .then((data) => {
        setStarWarsCharacters(
          data.results.map((character: StarWarsCharacter) => character.name),
        );
      });
  }, []);

  useEffect(() => {
    refElement.current?.focus();
  }, []);

  return (
    <AutoComplete
      placeholder="Type a Star Wars character"
      options={starWarsCharacters}
      onSelectOption={(option) => console.log(option)}
      ref={refElement}
    />
  );
}

export default App;
```
