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
import cn from "classnames";
import PropTypes from "prop-types";

import "./Arrow.scss";

const Arrow = ({
  isDisabled,
  placement,
  direction,
  height,
  width,
  mobileHeight,
  mobileWidth,
  mobilePlacement,
  mobileDirection,
  isMobile,
}) => (
  <div
    className={cn(
      "Arrow",
      `Arrow--dir-${isMobile ? mobileDirection : direction}`,
      `Arrow--placement-${isMobile ? mobilePlacement : placement}`,
      {
        "Arrow--disabled": isDisabled,
        "Arrow--mobile": isMobile,
      }
    )}
    style={{
      height: `${isMobile ? mobileHeight : height}rem`,
      width: `${isMobile ? mobileWidth : width}rem`,
    }}
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
  isMobile: false,
  isDisabled: false,
  placement: "center",
  direction: "bottom",
  height: 2,
  width: 0.1875,
  mobilePlacement: "center",
  mobileHeight: 2,
  mobileWidth: 0.1875,
  mobileDirection: "bottom",
};

Arrow.propTypes = {
  isDisabled: PropTypes.bool,
  isMobile: PropTypes.bool,
  placement: PropTypes.oneOf(["center", "right"]),
  direction: PropTypes.oneOf(["bottom", "top", "topLeft", "left"]),
  height: PropTypes.number,
  width: PropTypes.number,
  mobileHeight: PropTypes.number,
  mobileWidth: PropTypes.number,
  mobilePlacement: PropTypes.oneOf(["center", "right", "left"]),
  mobileDirection: PropTypes.oneOf(["bottom", "top"]),
};

export default Arrow;
