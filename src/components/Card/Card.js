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

import formatNumber from "../../utils/formatNumber";

import "./Card.scss";

const Card = ({
  isNotAvailable,
  isPopulation,
  warning,
  title,
  number,
  percent,
  className,
  children,
}) => (
  <div
    className={cn("Card", className, {
      "Card--population": isPopulation,
      "Card--not-available": isNotAvailable,
    })}
  >
    <div className="Card__header">
      <h3 className="Card__title">{title}</h3>
      {warning && (
        <div className="Card__warning-box">
          <div className="Card__warning-icon" />
          <div className="Card__warning">{warning}</div>
        </div>
      )}
    </div>
    <div className="Card__body">
      {isNotAvailable ? (
        <span className="Card__not-available-text">Not available</span>
      ) : (
        <>
          <span className="Card__number">{formatNumber(number)}</span>
          <span className="Card__percent">({percent}%)</span>
        </>
      )}
    </div>
    <div className="Card__arrow">{children}</div>
  </div>
);

Card.defaultProps = {
  isNotAvailable: false,
  isPopulation: false,
  warning: null,
  number: null,
  percent: null,
  className: "",
  children: null,
};

Card.propTypes = {
  title: PropTypes.string.isRequired,
  isNotAvailable: PropTypes.bool,
  isPopulation: PropTypes.bool,
  warning: PropTypes.string,
  number: PropTypes.number,
  percent: PropTypes.number,
  className: PropTypes.string,
  children: PropTypes.node,
};

export default Card;
