// Recidiviz - a data platform for criminal justice reform
// Copyright (C) 2021 Recidiviz, Inc.
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

import "./Switch.scss";

import { MONTHLY, ANNUAL } from "../MainPage/constants";

const Switch = ({ activeTab, onTabChange }) => {
  const createOnTabChange = (tab) => () => {
    onTabChange(tab);
  };

  const handleGlobalClick =
    activeTab === MONTHLY ? createOnTabChange(ANNUAL) : createOnTabChange(MONTHLY);

  return (
    <div
      className="Switch"
      role="button"
      tabIndex={0}
      onClick={handleGlobalClick}
      onKeyPress={handleGlobalClick}
    >
      <button
        className={cn("Switch__button", {
          "Switch__button--active": activeTab === MONTHLY,
          "Switch__slide-right": activeTab === MONTHLY,
        })}
        type="button"
        onClick={createOnTabChange(MONTHLY)}
      >
        Monthly
      </button>
      <button
        className={cn("Switch__button", {
          "Switch__button--active": activeTab === ANNUAL,
          "Switch__slide-left": activeTab === ANNUAL,
        })}
        type="button"
        onClick={createOnTabChange(ANNUAL)}
      >
        Annual
      </button>
    </div>
  );
};

Switch.propTypes = {
  activeTab: PropTypes.string.isRequired,
  onTabChange: PropTypes.func.isRequired,
};

export default Switch;
