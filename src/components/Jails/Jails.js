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
import PropTypes from "prop-types";

import KeyInsights from "../shared/KeyInsights";
import Chart from "../shared/Chart";
import Sources from "../shared/Sources";
import { keyInsightsPropTypes } from "../shared/KeyInsights/propTypes";
import { chartDataPropTypes } from "../shared/Chart/propTypes";
import { sourcePropTypes } from "../shared/Sources/propTypes";
import { JAILS } from "../MainPage/constants";

const Jails = ({
  keyInsightsData,
  countySelector,
  incarcerationRateChartData,
  incarcerationRateTopCountiesChartData,
  sourceData,
}) => {
  return (
    <div className="Jails">
      <KeyInsights keyInsightsData={keyInsightsData} />
      <Chart
        hint=""
        title="Statewide vs County Incarceration Rates"
        chartData={incarcerationRateChartData}
        countySelector={countySelector}
      />
      <Chart
        hint="By County"
        title="Incarceration Rates for Most Populous Counties"
        chartData={incarcerationRateTopCountiesChartData}
      />
      <Sources tab={JAILS} data={sourceData} />
    </div>
  );
};

Jails.defaultProps = {
  countySelector: null,
};

Jails.propTypes = {
  keyInsightsData: keyInsightsPropTypes.isRequired,
  countySelector: PropTypes.node,
  incarcerationRateChartData: chartDataPropTypes.isRequired,
  incarcerationRateTopCountiesChartData: chartDataPropTypes.isRequired,
  sourceData: PropTypes.arrayOf(PropTypes.shape(sourcePropTypes)).isRequired,
};

export default Jails;
