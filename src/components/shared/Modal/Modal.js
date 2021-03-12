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
import React, { useRef } from "react";
import { createPortal } from "react-dom";
import PropTypes from "prop-types";
import useOnClickOutside from "use-onclickoutside";

import "./Modal.scss";

const Modal = ({ isShowing, hide, children }) => {
  const ref = useRef();
  useOnClickOutside(ref, hide);

  document.body.className = isShowing ? "Modal__open" : "";

  return isShowing
    ? createPortal(
        <div className="Modal">
          <div className="Modal__overlay" />
          <div
            className="Modal__wrapper"
            aria-modal
            aria-hidden
            aria-label="Modal"
            tabIndex={-1}
            role="dialog"
          >
            <div className="Modal__body" ref={ref}>
              <div className="Modal__header">
                <button
                  type="button"
                  className="Modal__close-button"
                  data-dismiss="modal"
                  aria-label="Close"
                  onClick={hide}
                />
              </div>
              {children}
            </div>
          </div>
        </div>,
        document.body
      )
    : null;
};

Modal.propTypes = {
  isShowing: PropTypes.bool.isRequired,

  children: PropTypes.node.isRequired,
};

export default Modal;
