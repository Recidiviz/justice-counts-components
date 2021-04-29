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
import React, { Component } from "react";
import PropTypes from "prop-types";

import logger from "../../../utils/logger";

import "./ErrorBoundary.scss";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { isError: false };
  }

  static getDerivedStateFromError() {
    return { isError: true };
  }

  componentDidCatch(error, errorInfo) {
    logger.error(error, errorInfo);
  }

  render() {
    const { children, placeholder } = this.props;
    const { isError } = this.state;

    if (isError) {
      return (
        <div className="ErrorBoundary">
          <span className="ErrorBoundary__error">{placeholder}</span>
        </div>
      );
    }

    return children;
  }
}

ErrorBoundary.defaultProps = {
  placeholder: "Unable to render component. Unhandled error happened.",
};

ErrorBoundary.propTypes = {
  placeholder: PropTypes.string,
  children: PropTypes.node.isRequired,
};

export default ErrorBoundary;
