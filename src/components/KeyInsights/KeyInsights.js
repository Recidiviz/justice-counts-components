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

import Card from "../shared/Card";
import { keyInsightsPropTypes } from "./propTypes";

import "./KeyInsights.scss";

const KeyInsights = ({ keyInsightsData }) => (
  <div className="KeyInsights">
    <h2 className="KeyInsights__title">Key Insights</h2>
    <div className="KeyInsights__cards">
      {keyInsightsData.map((card) => (
        <div key={card.title} className="KeyInsights__card">
          <Card {...card} />
          <p className="KeyInsights__card-description">
            {card.caption} {card.reportingCountiesModal}
          </p>
        </div>
      ))}
    </div>
  </div>
);

KeyInsights.propTypes = {
  keyInsightsData: keyInsightsPropTypes.isRequired,
};

export default KeyInsights;
