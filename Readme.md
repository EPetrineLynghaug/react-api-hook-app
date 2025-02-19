#  Lecture Notes: Understanding useParams() and Custom Hooks in React

## useParams() in React Router
<details> <summary><strong>Click to read</strong></summary>

**What is useParams()?**

* useParams() is a React Router hook that allows you to extract URL parameters from the current route. It is useful when dealing with dynamic routes, such as:
```jsx
<Route path="/user/:userId" element={<UserProfile />} />

```
* When a user navigates to /user/123, the useParams() hook extracts the userId parameter (123 in this case), which can then be used in the component.

**Example Usage:**
```jsx

import { useParams } from 'react-router-dom';

function UserProfile() {
  const { userId } = useParams();

  return (
    <div>
      <h1>User Profile</h1>
      <p>User ID: {userId}</p>
    </div>
  );
}

```

**When to Use useParams()?**
- Fetching user details from an API based on the id.
- Dynamic routing that requires extracting route parameters.

**Installation:**
To use useParams(), install React Router:
```bash
npm install react-router-dom
```
</details>

## Custom Hooks in React
<details> <summary><strong>Click to read more</strong></summary>

**What Are Custom Hooks?**
* Custom hooks are functions that encapsulate complex logic and allow reusability. They are used for tasks like fetching data, handling form inputs, managing state, etc. A custom hook should always start with use, such as useFetch, useForm, etc.

**Benefits of Custom Hooks:**
- Encapsulation: Extracts complex logic out of components.
- Reusability: Can be reused across different components.
- Separation of Concerns: Keeps components focused on rendering while hooks handle logic.

**Example: useToggle Hook**

This hook manages a boolean toggle state.
```jsx
import { useState } from 'react';

function useToggle(initialValue = false) {
  const [value, setValue] = useState(initialValue);

  const toggleValue = () => {
    setValue(prevValue => !prevValue);
  };

  return [value, toggleValue];
}

export default useToggle;
```
**Usage**
```jsx
import useToggle from './useToggle';

function ToggleComponent() {
  const [isToggled, toggle] = useToggle(false);

  return (
    <div>
      <p>The toggle is {isToggled ? 'ON' : 'OFF'}</p>
      <button onClick={toggle}>Toggle</button>
    </div>
  );
}

export default ToggleComponent;
```

### useFetch Hook
**What Does useFetch Do?**
- Fetches data from an API.
- Manages loading, data, and error states.
- Works with any API endpoint.

```jsx
import { useState, useEffect } from 'react';

function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!url) return;

    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const json = await response.json();
        setData(json);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { data, loading, error };
}

export default useFetch;
```
**Usage**
```jsx
import useFetch from './useFetch';

function DataDisplay({ url }) {
  const { data, loading, error } = useFetch(url);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return <pre>{JSON.stringify(data, null, 2)}</pre>;
}

export default DataDisplay;
```
**Example Usage in an App Component:**
```jsx
import DataDisplay from './DataDisplay';

function App() {
  const url = 'https://jsonplaceholder.typicode.com/todos/1';

  return (
    <div>
      <h1>Data Fetching Example</h1>
      <DataDisplay url={url} />
    </div>
  );
}

export default App;
```
### useLocalStorage Hook
**What Does useLocalStorage Do?**

- Reads and writes values to localStorage.
- Ensures synchronization between state and local storage.
```jsx
import { useState, useEffect } from 'react';

function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(storedValue));
    } catch (error) {
      console.error(error);
    }
  }, [key, storedValue]);

  return [storedValue, setStoredValue];
}

export default useLocalStorage;
```
**usage**
```jsx
import useLocalStorage from './useLocalStorage';

function ThemeSwitcher() {
  const [theme, setTheme] = useLocalStorage('theme', 'light');

  return (
    <div>
      <p>Current theme: {theme}</p>
      <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
        Toggle Theme
      </button>
    </div>
  );
}

export default ThemeSwitcher;
```

</details>

## Summary
- **useParams():** Extracts URL parameters in React Router.
- **Custom Hooks:** Encapsulate logic for reusability.
- **useToggle:** Handles boolean state toggling.
- **useFetch:** Fetches data with error handling.
- **useLocalStorage:** Manages local storage values.

These hooks help streamline component logic, making applications more maintainable and scalable.

