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

import formatNumber from "../../../utils/formatNumber";

import "./Card.scss";

const Card = ({
  mostRecentDate,
  comparedToDate,
  metricLastUpdated,
  isNotAvailable,
  isTooStale,
  isPopulation,
  isNumberPercent,
  hint,
  warning,
  title,
  number,
  percentChange,
  className,
  sourceText,
  reportName,
  sourceUrl,
  children,
}) => (
  <div
    className={cn("Card", className, {
      "Card--population": isPopulation,
      "Card--not-available": isNotAvailable,
      "Card--too-stale": isTooStale,
    })}
  >
    <div className="Card__header">
      <h3 className="Card__title">{title}</h3>
      {warning && (
        <div className="Card__warning-box Card__warning-box--warning">
          <button type="button" tabIndex={0} className="Card__warning-icon" aria-label={warning} />
          <div className="Card__warning">{warning}</div>
        </div>
      )}
      {!isTooStale && sourceText && (
        <div className="Card__warning-box">
          <button
            type="button"
            tabIndex={0}
            className="Card__warning-icon"
            aria-label={sourceText}
          />
          <div className="Card__warning">
            {sourceText} (
            <a className="Card__source-link" href={sourceUrl} target="_blank" rel="noreferrer">
              {reportName}
            </a>
            )
            {metricLastUpdated && (
              <div className="Card__last-updated">Last updated: {metricLastUpdated} </div>
            )}
          </div>
        </div>
      )}
    </div>
    <div className="Card__body">
      {isNotAvailable && <span className="Card__not-available-text">Not available</span>}
      {isTooStale && <span className="Card__not-available-text">Data is too stale to display</span>}
      {!isNotAvailable && !isTooStale && (
        <>
          <span className="Card__number">
            {formatNumber(number)}
            {isNumberPercent && "%"}
          </span>
          {!isNumberPercent &&
            (percentChange === null ? (
              <span className="Card__percent">(--%)</span>
            ) : (
              <span className="Card__percent">
                ({Math.round(percentChange) > 0 && "+"}
                {Math.round(percentChange)}%)
              </span>
            ))}
          <div className="Card__bottom">
            {hint && (
              <span className="Card__warning-box Card__warning-box--hint">
                <button
                  type="button"
                  tabIndex={0}
                  className="Card__warning-icon"
                  aria-label={hint}
                />
                <div className="Card__warning">{hint}</div>
              </span>
            )}
            <div className="Card__date-range">
              {mostRecentDate}&nbsp;
              {!isNumberPercent && percentChange && <span>(compared to {comparedToDate})</span>}
            </div>
          </div>
        </>
      )}
    </div>
    <div className="Card__arrow">{children}</div>
  </div>
);

Card.defaultProps = {
  isNotAvailable: false,
  isNumberPercent: false,
  sourceText: null,
  reportName: null,
  sourceUrl: null,
  isPopulation: false,
  hint: null,
  warning: null,
  number: null,
  percentChange: null,
  className: "",
  children: null,
  mostRecentDate: null,
  comparedToDate: null,
  metricLastUpdated: null,
  isTooStale: false,
};

Card.propTypes = {
  title: PropTypes.string.isRequired,
  sourceText: PropTypes.string,
  reportName: PropTypes.string,
  sourceUrl: PropTypes.string,
  isNotAvailable: PropTypes.bool,
  isPopulation: PropTypes.bool,
  isNumberPercent: PropTypes.bool,
  hint: PropTypes.string,
  warning: PropTypes.string,
  number: PropTypes.number,
  percentChange: PropTypes.number,
  className: PropTypes.string,
  children: PropTypes.node,
  mostRecentDate: PropTypes.string,
  comparedToDate: PropTypes.string,
  metricLastUpdated: PropTypes.string,
  isTooStale: PropTypes.bool,
};

export default Card;
