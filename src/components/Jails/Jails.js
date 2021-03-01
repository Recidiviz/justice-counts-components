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
import KeyInsights from "../shared/KeyInsights";
import Chart from "../shared/Chart";
import Sources from "../shared/Sources";
import { keyInsightsPropTypes } from "../shared/KeyInsights/propTypes";

const Jails = ({ keyInsightsData }) => {
  return (
    <div className="Jails">
      <KeyInsights keyInsightsData={keyInsightsData} />
      <Chart
        hint="By Type (January 2020 - January 2021)"
        title="Jail Incarceration Rate"
        chartData={{ datasets: [], labels: [] }}
      />
      <Chart
        hint="By Type (January 2019–January 2020)"
        title="Jail Incarceration Rate (Top Counties)"
        chartData={{ datasets: [], labels: [] }}
      />
      <Sources data={[]} />
    </div>
  );
};

Jails.propTypes = {
  keyInsightsData: keyInsightsPropTypes.isRequired,
};

export default Jails;
