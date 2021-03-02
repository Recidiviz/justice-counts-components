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
import { chartDataPropTypes } from "../shared/Chart/propTypes";

const Jails = ({
  keyInsightsData,
  incarcerationRateChartData,
  incarcerationRateTopCountiesChartData,
}) => {
  return (
    <div className="Jails">
      <KeyInsights keyInsightsData={keyInsightsData} />
      <Chart
        hint="By Type"
        title="Jail Incarceration Rate"
        chartData={incarcerationRateChartData}
        switchCounties={<a href="/">(Switch counties)</a>}
      />
      <Chart
        hint="By Type"
        title="Jail Incarceration Rate (Top Counties)"
        chartData={incarcerationRateTopCountiesChartData}
      />
      <Sources data={[]} />
    </div>
  );
};

Jails.propTypes = {
  keyInsightsData: keyInsightsPropTypes.isRequired,
  incarcerationRateChartData: chartDataPropTypes.isRequired,
  incarcerationRateTopCountiesChartData: chartDataPropTypes.isRequired,
};

export default Jails;
