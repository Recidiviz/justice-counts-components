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
