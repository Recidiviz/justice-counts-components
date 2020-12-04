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
import React, { memo } from "react";
import PropTypes from "prop-types";

import Card from "../components/Card";
import formatNumber from "../utils/formatNumber";
import formatPercent from "../utils/formatPercent";

import "./KeyInsights.scss";

const KeyInsights = ({
  prisonPopulation,
  prisonPopulationPercent,
  revocations,
  revocationsPercent,
  technicalRevocations,
  technicalRevocationsPercent,
}) => (
  <div className="KeyInsights">
    <h2 className="KeyInsights__title">Key insights</h2>
    <div className="KeyInsights__cards">
      <div className="KeyInsights__card">
        <Card
          title="Prison Population"
          number={prisonPopulation}
          percent={prisonPopulationPercent}
        />
        <p className="KeyInsights__card-description">
          The prison population {formatPercent(prisonPopulationPercent, true)}, a decline of{" "}
          {formatNumber(prisonPopulation, true)} people.
        </p>
      </div>
      <div className="KeyInsights__card">
        <Card title="Parole Revocations" number={revocations} percent={revocationsPercent} />
        <p className="KeyInsights__card-description">
          The number of people revoked from parole to prison fell by{" "}
          {formatNumber(revocations, true)} people, {formatPercent(revocationsPercent)}.
        </p>
      </div>
      <div className="KeyInsights__card">
        <Card
          title="Parole Revocations (Technical)"
          number={technicalRevocations}
          percent={technicalRevocationsPercent}
        />
        <p className="KeyInsights__card-description">
          Revocations to prison for technical violations of parole declined by{" "}
          {formatNumber(technicalRevocations, true)} people,{" "}
          {formatPercent(technicalRevocationsPercent)}.
        </p>
      </div>
    </div>
  </div>
);

KeyInsights.propTypes = {
  prisonPopulation: PropTypes.number.isRequired,
  prisonPopulationPercent: PropTypes.number.isRequired,
  revocations: PropTypes.number.isRequired,
  revocationsPercent: PropTypes.number.isRequired,
  technicalRevocations: PropTypes.number.isRequired,
  technicalRevocationsPercent: PropTypes.number.isRequired,
};

export default memo(KeyInsights);
