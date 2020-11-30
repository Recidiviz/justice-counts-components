import React from "react";
import PropTypes from "prop-types";

import formatNumber from "../../utils/formatNumber";

import "./Card.scss";

const Card = ({ title, number, percent }) => (
  <div className="Card">
    <div className="Card__header">
      <h3 className="Card__title">{title}</h3>
    </div>
    <div className="Card__body">
      <span className="Card__number">{formatNumber(number)}</span>
      <span className="Card__percent">({percent}%)</span>
    </div>
  </div>
);

Card.propTypes = {
  title: PropTypes.string.isRequired,
  number: PropTypes.number.isRequired,
  percent: PropTypes.number.isRequired,
};

export default Card;
