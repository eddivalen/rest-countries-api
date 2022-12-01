import {createContext, useReducer, useEffect} from 'react';

const ThemeContext = createContext({});

let reducer = (theme, newTheme) => {
  if(newTheme == null){
    localStorage.removeItem('template');
    return initialState;
  }
  return { ...theme, ...newTheme} 
}
const initialState = {
  theme: 'dark'
};

const localState = JSON.parse(localStorage.getItem('template'));

export function ThemeContextProvider({children}){
  const [theme, setTheme] = useReducer(reducer, localState || initialState);

  useEffect( () => {
    localStorage.setItem('template', JSON.stringify(theme));
  },[theme]);

  return <ThemeContext.Provider value={{theme, setTheme}}> 
  {children}
  </ThemeContext.Provider>
}
export default ThemeContext;