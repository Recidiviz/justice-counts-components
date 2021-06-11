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
  lastUpdatedDate,
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
  measurementTypeText,
  itemStateName,
  partiallyAvailable,
  children,
}) => {
  const handleScroll = () => {
    window.scrollTo({
      top: 250,
      behavior: "smooth",
    });
  };

  return (
    <div
      className={cn("Card", className, {
        "Card--population": isPopulation,
        "Card--not-available": isNotAvailable || isTooStale,
      })}
    >
      <div className="Card__header">
        <h3 className="Card__title">{title}</h3>
        {isTooStale && (
          <div className="Card__warning-box Card__warning-box--warning">
            <button type="button" tabIndex={0} className="Card__warning-icon" aria-label={hint} />
            <div className="Card__warning">
              <p>
                {sourceUrl ? (
                  <>
                    This data is available in a public report from {itemStateName} (
                    <a
                      className="Card__source-link"
                      href={sourceUrl}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {reportName}
                    </a>
                    )
                  </>
                ) : (
                  <>
                    This data is available from {itemStateName} ({reportName})
                  </>
                )}
                , but recent data is not available (Last Reported: {mostRecentDate}).
              </p>
              <br />
              <p>
                If you believe there is a public report containing this data, please let us know
                at&nbsp;
                <a
                  target="_blank"
                  rel="noreferrer"
                  href="mailto:justicecounts@csg.org"
                  className="Card__source-link"
                >
                  justicecounts@csg.org
                </a>
                .
              </p>
            </div>
          </div>
        )}
        {!partiallyAvailable && isNotAvailable && (
          <div className="Card__warning-box Card__warning-box--warning">
            <button type="button" tabIndex={0} className="Card__warning-icon" aria-label={hint} />
            <div className="Card__warning">
              This datapoint is not available in any of {itemStateName}&apos;s publicly available
              reports. If you believe there is a public report containing this data, please let us
              know at&nbsp;
              <a
                target="_blank"
                rel="noreferrer"
                href="mailto:justicecounts@csg.org"
                className="Card__source-link"
              >
                justicecounts@csg.org
              </a>
              .
            </div>
          </div>
        )}
        {warning || partiallyAvailable ? (
          <div className="Card__warning-box Card__warning-box--warning">
            <button
              type="button"
              tabIndex={0}
              className="Card__warning-icon"
              aria-label={warning}
            />
            <div className="Card__warning">
              {warning}
              {partiallyAvailable}
              <>
                {" "}
                Use the{" "}
                <button type="button" className="Card__warning-button" onClick={handleScroll}>
                  Reporting Frequency switch
                </button>{" "}
                at the top of the page to see the most recent available data.
              </>
            </div>
          </div>
        ) : null}
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
              {sourceUrl ? (
                <a className="Card__source-link" href={sourceUrl} target="_blank" rel="noreferrer">
                  {reportName}
                </a>
              ) : (
                <>{reportName}</>
              )}
              ).
              {lastUpdatedDate && (
                <div className="Card__last-updated">Last updated: {lastUpdatedDate} </div>
              )}
              {measurementTypeText && (
                <div className="Card__last-updated">Measurement type: {measurementTypeText} </div>
              )}
            </div>
          </div>
        )}
      </div>
      <div className="Card__body">
        {isNotAvailable || isTooStale ? (
          <span className="Card__not-available-text">Not available</span>
        ) : null}
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
                {percentChange && <span>(compared to {comparedToDate})</span>}
              </div>
            </div>
          </>
        )}
      </div>
      <div className="Card__arrow">{children}</div>
    </div>
  );
};

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
  lastUpdatedDate: null,
  measurementTypeText: null,
  isTooStale: false,
  itemStateName: null,
  partiallyAvailable: null,
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
  lastUpdatedDate: PropTypes.string,
  measurementTypeText: PropTypes.string,
  isTooStale: PropTypes.bool,
  itemStateName: PropTypes.string,
  partiallyAvailable: PropTypes.string,
};

export default Card;
