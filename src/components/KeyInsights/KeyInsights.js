// Recidiviz - a data platform for criminal justice reform
// Copyright (C) 2020 Recidiviz, Inc.
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

import Card from "../shared/Card";

import "./KeyInsights.scss";

const KeyInsights = ({ keyInsightsData }) => (
  <div className="KeyInsights">
    <h2 className="KeyInsights__title">Key insights</h2>
    <div className="KeyInsights__cards">
      {keyInsightsData.map((card) => (
        <div className="KeyInsights__card">
          <Card title={card.title} number={card.number} percent={card.percent} />
          <p className="KeyInsights__card-description">{card.caption}</p>
        </div>
      ))}
    </div>
  </div>
);

KeyInsights.propTypes = {
  keyInsightsData: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      number: PropTypes.number.isRequired,
      percent: PropTypes.number.isRequired,
      caption: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default KeyInsights;
