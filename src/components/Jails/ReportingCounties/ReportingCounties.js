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
import React, { useState } from "react";
import PropTypes from "prop-types";

import Modal from "../../shared/Modal";
import County from "../../shared/County";

import "./ReportingCounties.scss";

const ReportingCounties = ({ counties, stateName }) => {
  const [open, setOpen] = useState(false);

  return counties.length ? (
    <span className="ReportingCounties">
      See full list of counties&nbsp;
      <button className="ReportingCounties__button" type="button" onClick={() => setOpen(!open)}>
        here
      </button>
      .
      <Modal isShowing={open} hide={() => setOpen(false)}>
        <h1 className="ReportingCounties__title">{`Counties in ${stateName}`}</h1>
        <div className="ReportingCounties__subtitle">
          These are all of the counties that are actively reporting data on a monthly basis in{" "}
          {stateName}. See Methodology for more details on how these counties were determined.
        </div>
        <div className="ReportingCounties__body-content">
          {counties.map((county) => (
            <County
              key={county.name}
              name={county.name}
              population={county.population}
              isNoData={county.isNoData}
              isNotClickable
            />
          ))}
        </div>
      </Modal>
    </span>
  ) : null;
};

ReportingCounties.propTypes = {
  stateName: PropTypes.string.isRequired,
  counties: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      population: PropTypes.number.isRequired,
    })
  ).isRequired,
};

export default ReportingCounties;
