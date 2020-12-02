import React from "react";
import cn from "classnames";
import PropTypes from "prop-types";

import "./Arrow.scss";

const Arrow = ({ placement, direction, height, width }) => (
  <div
    className={cn("Arrow", `Arrow--dir-${direction}`, `Arrow--placement-${placement}`)}
    style={{ height: `${height}rem`, width: `${width}rem` }}
  >
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
  placement: "center",
  direction: "bottom",
  height: 2,
  width: 0.1875,
};

Arrow.propTypes = {
  placement: PropTypes.oneOf(["center", "right"]),
  direction: PropTypes.oneOf(["bottom", "top", "topLeft", "left"]),
  height: PropTypes.string,
  width: PropTypes.string,
};

export default Arrow;
