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

import KeyInsights from "../KeyInsights/KeyInsights";
import FlowDiagram from "../FlowDiagram";
import Chart from "../Chart";

import { chartDataPropTypes } from "../../propTypes";

import "./MainPage.scss";

const MainPage = ({
  stateName,
  populationsChartData,
  prisonAdmissionsChartData,
  releasesChartData,
}) => (
  <section className="MainPage">
    <header className="MainPage__header">
      <h1 className="MainPage__title">{stateName} data dashboard</h1>
      <p className="MainPage__description">
        The following is a broad overview of the corrections system in {stateName}, representing the
        up-to-date data and changes compared to last year (September 2019 to September 2020). Two
        additional sections containing crime and jail indicators will be added at a later date.
      </p>
    </header>
    <KeyInsights
      prisonPopulation={-1}
      prisonPopulationPercent={-1}
      revocations={-1}
      revocationsPercent={-1}
      technicalRevocations={-1}
      technicalRevocationsPercent={-1}
    />
    <FlowDiagram lastDate="September 2020" prevDate="September 2019" />
    <Chart chartData={populationsChartData} title="Populations" hint="By System" />
    <Chart chartData={prisonAdmissionsChartData} title="Prison Admissions" hint="By Type" />
    <Chart chartData={releasesChartData} title="Releases" hint="By Type" />
  </section>
);

MainPage.propTypes = {
  stateName: PropTypes.string.isRequired,
  populationsChartData: chartDataPropTypes.isRequired,
  prisonAdmissionsChartData: chartDataPropTypes.isRequired,
  releasesChartData: chartDataPropTypes.isRequired,
};

export default MainPage;
