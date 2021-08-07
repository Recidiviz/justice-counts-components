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

import FlowDiagram from "./FlowDiagram";
import KeyInsights from "../KeyInsights";
import ErrorBoundary from "../shared/ErrorBoundary";
import Chart from "../Chart";
import Sources from "../Sources";
import { correctionsDataPropTypes } from "./propTypes";

const Corrections = ({ correctionsData, isAnnual }) => {
  const {
    populationsChartData,
    prisonAdmissionsChartData,
    paroleRevocationsChartData,
    probationRevocationsChartData,
    releasesChartData,
    flowData,
    keyInsightsData,
    flowDiagramLastDate,
    flowDiagramPrevDate,
    sourceData,
  } = correctionsData;

  console.log(flowData);

  return (
    <>
      <KeyInsights keyInsightsData={keyInsightsData} />
      <ErrorBoundary placeholder="Unable to render Flow Diagram. An unhandled error happened. More info could be found in the console.">
        <FlowDiagram
          data={flowData}
          lastDate={flowDiagramLastDate}
          prevDate={flowDiagramPrevDate}
        />
      </ErrorBoundary>
      <ErrorBoundary placeholder="Unable to render Populations Chart. An unhandled error happened. More info could be found in the console.">
        <Chart
          annual={isAnnual}
          chartData={populationsChartData}
          title="Populations"
          hint="By System"
        />
      </ErrorBoundary>
      <ErrorBoundary placeholder="Unable to render Admissions to Prison. An unhandled error happened. More info could be found in the console.">
        <Chart
          annual={isAnnual}
          chartData={prisonAdmissionsChartData}
          title="Admissions to Prison"
          hint="By Type"
        />
      </ErrorBoundary>
      <ErrorBoundary placeholder="Unable to render Post-Release Supervision Revocations chart. An unhandled error happened. More info could be found in the console.">
        <Chart
          annual={isAnnual}
          chartData={paroleRevocationsChartData}
          title="Post-Release Supervision Revocations"
          hint="By Type"
        />
      </ErrorBoundary>
      <ErrorBoundary placeholder="Unable to render Probation Revocations Chart. An unhandled error happened. More info could be found in the console.">
        <Chart
          annual={isAnnual}
          chartData={probationRevocationsChartData}
          title="Probation Revocations"
          hint="By Type"
        />
      </ErrorBoundary>
      <ErrorBoundary placeholder="Unable to render Releases Chart. An unhandled error happened. More info could be found in the console.">
        <Chart annual={isAnnual} chartData={releasesChartData} title="Releases" hint="By Type" />
      </ErrorBoundary>
      <Sources data={sourceData} />
    </>
  );
};

Corrections.propTypes = {
  correctionsData: correctionsDataPropTypes.isRequired,
  isAnnual: PropTypes.bool.isRequired,
};

export default Corrections;
