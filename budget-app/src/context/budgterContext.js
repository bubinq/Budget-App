import { createContext, useEffect, useReducer, useState } from "react";
import { useSessionStorage } from "../hooks/useSessionStorage";

export const BudgetContext = createContext();

function expensesManager(state, action) {
  switch (action.type) {
    case "ADD":
      return [...state, { ...action.payload }];

    default:
      return state;
  }
}

function expensesInitializer() {
  const session = JSON.parse(sessionStorage.getItem("expenses"));
  return session || [];
}

export const BudgetProvider = ({ children }) => {
  const [user, setUser] = useSessionStorage("user");
  const [expenses, dispatcher] = useReducer(
    expensesManager,
    [],
    expensesInitializer
  );
  const [expensesStorage, setExpensesStorage] = useSessionStorage("expenses");
  const [theme, setTheme] = useState("dark");
  const [selectedMenu, setSelectedMenu] = useState("");
  const [toggleMenu, setToggleMenu] = useState(false);
  const [dropDownToggle, setDropDownToggle] = useState(false);

  const selectMenuHandler = (type) => {
    setSelectedMenu(type);
  };

  const toggleHandler = () => {
    setToggleMenu(!toggleMenu);
  };

  const toggleTheme = () => {
    if (theme === "dark") {
      setTheme("light");
    } else {
      setTheme("dark");
    }
  };

  const dropDownHandler = (value) => {
    if (!value) {
      setDropDownToggle(value);
    } else {
      setDropDownToggle(!dropDownToggle);
    }
  };

  useEffect(() => {
    setExpensesStorage(expenses);
  }, [expenses, setExpensesStorage]);

  return (
    <BudgetContext.Provider
      value={{
        selectedMenu,
        selectMenuHandler,
        toggleHandler,
        toggleMenu,
        user,
        setUser,
        dropDownHandler,
        dropDownToggle,
        setDropDownToggle,
        theme,
        setTheme,
        toggleTheme,
        expenses,
        dispatcher,
        expensesStorage
      }}
    >
      {children}
    </BudgetContext.Provider>
  );
};
