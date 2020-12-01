import React from "react";
import cn from "classnames";
import PropTypes from "prop-types";

import "./Arrow.scss";

const Arrow = ({ direction, height, width }) => (
  <div className={cn("Arrow", `Arrow--${direction}`)} style={{ height, width }}>
    <svg
      className="Arrow__arrow"
      viewBox="0 0 20 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M2 2L10 10L18 2"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  </div>
);

Arrow.defaultProps = {
  direction: "bottom",
  height: "2rem",
  width: "3px",
};

Arrow.propTypes = {
  direction: PropTypes.oneOf("bottom", "top", "topLeft", "left"),
  height: PropTypes.string,
  width: PropTypes.string,
};

export default Arrow;
