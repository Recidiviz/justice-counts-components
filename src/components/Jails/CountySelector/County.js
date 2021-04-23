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

import "./County.scss";

const County = ({ name, population, isSelected, isNoData, onClick }) => {
  return (
    <button
      type="button"
      className={cn("County", {
        "County--selected": isSelected === name,
        "County--not-available": isNoData,
      })}
      onClick={isNoData ? null : onClick}
    >
      <span>{name}</span>&nbsp;
      <span className="County__population">({population.toLocaleString("en-US")} people)</span>
    </button>
  );
};

County.propTypes = {
  name: PropTypes.string.isRequired,
  population: PropTypes.number.isRequired,
  isSelected: PropTypes.string.isRequired,
  isNoData: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default County;
