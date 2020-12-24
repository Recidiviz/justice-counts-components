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

import FlowDiagram from "../FlowDiagram";
import Chart from "../Chart";

import { chartDataPropTypes } from "../Chart/propTypes";

import "./MainPage.scss";

const MainPage = ({
  stateName,
  populationsChartData,
  prisonAdmissionsChartData,
  releasesChartData,
  flowDiagramData,
  flowDiagramLastDate,
  flowDiagramPrevDate,
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
    <FlowDiagram
      data={flowDiagramData}
      lastDate={flowDiagramLastDate}
      prevDate={flowDiagramPrevDate}
    />
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
  flowDiagramLastDate: PropTypes.string.isRequired,
  flowDiagramPrevDate: PropTypes.string.isRequired,
  flowDiagramData: PropTypes.shape({
    title: PropTypes.string.isRequired,
    isNotAvailable: PropTypes.bool,
    number: PropTypes.number,
    percent: PropTypes.number,
  }).isRequired,
};

export default MainPage;
