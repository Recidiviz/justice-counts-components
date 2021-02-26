import React from "react";
import PropTypes from "prop-types";
import cn from "classnames";

import { CORRECTIONS, JAILS } from "./constants";

const Tabs = ({ activeTab, onTabChange }) => {
  const createOnTabChange = (tab) => () => {
    onTabChange(tab);
  };

  return (
    <div className="MainPage__tabs">
      <button
        type="button"
        className={cn("MainPage__tab", { MainPage__tab_active: activeTab === CORRECTIONS })}
        onClick={createOnTabChange(CORRECTIONS)}
      >
        Corrections
      </button>
      <button
        type="button"
        className={cn("MainPage__tab", { MainPage__tab_active: activeTab === JAILS })}
        onClick={createOnTabChange(JAILS)}
      >
        Jails
      </button>
    </div>
  );
};

Tabs.propTypes = {
  activeTab: PropTypes.oneOf([CORRECTIONS, JAILS]).isRequired,
  onTabChange: PropTypes.func.isRequired,
};

export default Tabs;
