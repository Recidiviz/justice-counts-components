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
import cn from "classnames";

import KeyInsights from "../KeyInsights/KeyInsights";
import FlowDiagram from "../FlowDiagram";
import Chart from "../Chart";
import Sources from "../Sources";
import ErrorBoundary from "../shared/ErrorBoundary";

import { chartDataPropTypes } from "../Chart/propTypes";
import { flowDiagramDataPropTypes } from "../FlowDiagram/propTypes";
import { keyInsightsPropTypes } from "../KeyInsights/propTypes";
import { sourcePropTypes } from "../Sources/propTypes";

import "./MainPage.scss";

const MainPage = ({
  stateName,
  populationsChartData,
  prisonAdmissionsChartData,
  paroleRevocationsChartData,
  probationRevocationsChartData,
  releasesChartData,
  flowDiagramData,
  flowDiagramLastDate,
  flowDiagramPrevDate,
  keyInsightsData,
  sourceData,
  isNoData,
}) => (
  <section className="MainPage">
    <header className={cn("MainPage__header", { "MainPage__header--without-border": isNoData })}>
      <h1 className="MainPage__title">{stateName} data dashboard</h1>
      {isNoData ? (
        <p className="MainPage__description">
          No data was publicly available for this state. If you are a representative of this state
          and would like to contribute your data to this site, please{" "}
          <a
            target="_blank"
            rel="noreferrer"
            href="https://justicecounts.csgjusticecenter.org/stay-in-touch/"
            className="MainPage__contact-link"
          >
            contact us
          </a>
          .
        </p>
      ) : (
        <p className="MainPage__description">
          The following is a broad overview of the corrections system in {stateName}, representing
          the latest data available and indicating changes over the course of the prior year.
        </p>
      )}
    </header>
    {!isNoData && (
      <>
        <KeyInsights keyInsightsData={keyInsightsData} />
        <ErrorBoundary placeholder="Unable to render Flow Diagram. An unhandled error happened. More info could be found in the console.">
          <FlowDiagram
            data={flowDiagramData}
            lastDate={flowDiagramLastDate}
            prevDate={flowDiagramPrevDate}
          />
        </ErrorBoundary>
        <ErrorBoundary placeholder="Unable to render Populations Chart. An unhandled error happened. More info could be found in the console.">
          <Chart chartData={populationsChartData} title="Populations" hint="By System" />
        </ErrorBoundary>
        <ErrorBoundary placeholder="Unable to render Admissions to Prison. An unhandled error happened. More info could be found in the console.">
          <Chart
            chartData={prisonAdmissionsChartData}
            title="Admissions to Prison"
            hint="By Type"
          />
        </ErrorBoundary>
        <ErrorBoundary placeholder="Unable to render Parole Revocations chart. An unhandled error happened. More info could be found in the console.">
          <Chart chartData={paroleRevocationsChartData} title="Parole Revocations" hint="By Type" />
        </ErrorBoundary>
        <ErrorBoundary placeholder="Unable to render Probation Revocations Chart. An unhandled error happened. More info could be found in the console.">
          <Chart
            chartData={probationRevocationsChartData}
            title="Probation Revocations"
            hint="By Type"
          />
        </ErrorBoundary>
        <ErrorBoundary placeholder="Unable to render Releases Chart. An unhandled error happened. More info could be found in the console.">
          <Chart chartData={releasesChartData} title="Releases" hint="By Type" />
        </ErrorBoundary>
        <Sources data={sourceData} />
      </>
    )}
  </section>
);

MainPage.propTypes = {
  stateName: PropTypes.string.isRequired,
  populationsChartData: chartDataPropTypes.isRequired,
  prisonAdmissionsChartData: chartDataPropTypes.isRequired,
  paroleRevocationsChartData: chartDataPropTypes.isRequired,
  probationRevocationsChartData: chartDataPropTypes.isRequired,
  releasesChartData: chartDataPropTypes.isRequired,
  flowDiagramLastDate: PropTypes.string.isRequired,
  flowDiagramPrevDate: PropTypes.string.isRequired,
  flowDiagramData: flowDiagramDataPropTypes.isRequired,
  keyInsightsData: keyInsightsPropTypes.isRequired,
  sourceData: PropTypes.arrayOf(PropTypes.shape(sourcePropTypes)).isRequired,
  isNoData: PropTypes.bool.isRequired,
};

export default MainPage;
