import { useContext } from "react";
import { BudgetContext } from "../context/budgetContext";
import { useTheme } from "../hooks/useTheme";
import {BsBank} from "react-icons/bs"
import {RiDashboardFill} from "react-icons/ri"

export const Side = () => {
  const { toggleMenu } = useContext(BudgetContext);
  const theme = useTheme()

  return (
    <div className={toggleMenu ? "sideWrapper hide" : "sideWrapper show"} style={{backgroundColor: theme.side, boxShadow: theme.sideShadow}}>
      <div className="manageWrapper">
        <BsBank style={{color: theme.text, width: "22px", height: "22px"}}></BsBank>
      </div>
      <div className="statisticsWrapper">
        <RiDashboardFill style={{color: theme.text, width: "22px", height: "22px"}}></RiDashboardFill>
      </div>
    </div>
  );
};
