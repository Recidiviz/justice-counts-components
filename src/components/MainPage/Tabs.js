// Recidiviz - a data platform for criminal justice reform
// Copyright (C) 2020 Recidiviz, Inc.
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with this program.  If not, see <https://www.gnu.org/licenses/>.
// =============================================================================
import React from "react";
import PropTypes from "prop-types";
import cn from "classnames";

import { CORRECTIONS, JAILS } from "./constants";

const Tabs = ({ activeTab, onTabChange, isUnified }) => {
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
        className={cn("MainPage__tab", {
          MainPage__tab_active: activeTab === JAILS,
          "MainPage__tab--disabled": isUnified,
        })}
        onClick={isUnified ? null : createOnTabChange(JAILS)}
      >
        Jails{isUnified && " (Not Applicable)"}
      </button>
    </div>
  );
};
// This state operates a "unified corrections system," which combines the jail and prison systems. As such, some of the numbers below may include pre-trial populations.

Tabs.propTypes = {
  activeTab: PropTypes.oneOf([CORRECTIONS, JAILS]).isRequired,
  onTabChange: PropTypes.func.isRequired,
  isUnified: PropTypes.bool.isRequired,
};

export default Tabs;
