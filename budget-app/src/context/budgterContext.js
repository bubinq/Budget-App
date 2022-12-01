import { createContext, useState } from "react";
import { useSessionStorage } from "../hooks/useSessionStorage";

export const BudgetContext = createContext();

export const BudgetProvider = ({ children }) => {
  const [user, setUser] = useSessionStorage("user");
  const [theme, setTheme] = useState("dark");
  const [selectedMenu, setSelectedMenu] = useState("");
  const [toggleMenu, setToggleMenu] = useState(false);
  const [dropDownToggle, setDropDownToggle] = useState(false)

  const selectMenuHandler = (type) => {
    setSelectedMenu(type);
  };

  const toggleHandler = () => {
    setToggleMenu(!toggleMenu);
  };

  const toggleTheme = () => {
    if (theme === "dark") {
      setTheme("light")
    } else {
      setTheme("dark")
    }
  }

  const dropDownHandler = (value) => {
    if (!value) {
      setDropDownToggle(value)
    } else {
      setDropDownToggle(!dropDownToggle)
    }
  }

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
        toggleTheme
      }}
    >
      {children}
    </BudgetContext.Provider>
  );
};
