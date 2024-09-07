1. What is the difference between Component and PureComponent? Give an example where it might break my app.

   > PureComponent does a shallow comparison of props and state, re-rendering only when they change, while Component always re-renders unless you control it with shouldComponentUpdate. Using PureComponent with complex data structures may miss changes in nested properties, potentially breaking your app.

2. Context + ShouldComponentUpdate might be dangerous. Why is that?

   > Context triggers re-renders when its value changes, but shouldComponentUpdate might not detect this, causing inconsistent UI updates.

3. Describe 3 ways to pass information from a component to its PARENT.

   > First way is to pass a function as a prop to the child component. Second way is to use context to pass data from the child to the parent. Third way is to use a callback function to pass data from the child to the parent.

4. Give 2 ways to prevent components from re-rendering.

   > A way is to use React.memo to memoize the component and prevent re-renders. Another way is to use shouldComponentUpdate in class components to prevent re-renders based on prop or state changes. You also can use React.useMemo and React.useCallback in functional components to memoize values and functions

5. What is a fragment and why do we need it? Give an example where it might break my app.

   > A fragment lets you return multiple elements without an extra wrapper in the DOM. It can break your app if a tool (like a CSS selector) requires a single root element.

6. Give 3 examples of the HOC pattern.

   > withTheme, withLogger and withErrorBoundary

7. What's the difference in handling exceptions in promises, callbacks and async...await?

   > You can use try/catch blocks with async/await, but not with promises or callbacks. With promises, you can use the .catch() method to handle errors, and with callbacks, you can use the error parameter to handle errors.

8. How many arguments does setState take and why is it async.

   > setState can take an object or a function. It's async to batch updates for better performance.

9. List the steps needed to migrate a Class to Function Component.

   > First would be write unit tests for the class component, then create a new function component, copy the logic from the class component to the function component using useEffect for replace lifecycle methods and replace this.state and this.setState for the useState hook. Migrate any class methods to functions or custom hooks. Finally run the tests to make sure everything is working as expected.

10. List a few ways styles can be used with components.

    > Module css, inline styles, CSS-in-JS libraries (eg: styled-components, Emotion) or Tailwind CSS.

11. How to render an HTML string coming from the server.

    > WUse dangerouslySetInnerHTML to safely render the HTML string.
