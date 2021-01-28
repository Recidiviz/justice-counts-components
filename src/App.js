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

import MainPage from "./components/MainPage";
import states from "./constants/states";
import getNormalizedStateData from "./utils/getNormalizedStateData";
import generateChartData from "./utils/generateChartData";
import generateFlowDiagramData from "./utils/generateFlowDiagramData";
import {
  ADMISSIONS_NEW_COMMITMENTS,
  ADMISSIONS_FROM_PAROLE,
  ADMISSIONS_FROM_PROBATION,
  POPULATION_PAROLE,
  POPULATION_PRISON,
  POPULATION_PROBATION,
  RELEASES_COMPLETED,
  ADMISSIONS,
  ADMISSIONS_FROM_PAROLE_NEW_CRIME,
  ADMISSIONS_FROM_PAROLE_TECHNICAL,
  ADMISSIONS_FROM_PROBATION_TECHNICAL,
  ADMISSIONS_FROM_PROBATION_NEW_CRIME,
} from "./constants/metrics";
import generateKeyInsightsData from "./utils/generateKeyInsightsData";
import generateSourceData from "./utils/generateSourceData";

const App = ({ stateCode, data }) => {
  const stateName = states[stateCode];
  const stateMetricData = getNormalizedStateData(data, stateCode);

  const populationsChartData = generateChartData(
    stateMetricData,
    [POPULATION_PRISON, POPULATION_PAROLE, POPULATION_PROBATION],
    ["Prison Population", "Parole Population", "Probation Population"]
  );

  const prisonAdmissionsChartData = generateChartData(
    stateMetricData,
    [ADMISSIONS, ADMISSIONS_NEW_COMMITMENTS, ADMISSIONS_FROM_PAROLE, ADMISSIONS_FROM_PROBATION],
    [
      "Total Prison Admissions",
      "New Court Admissions",
      "Parole Revocations (Total)",
      "Probation Revocations (Total)",
    ]
  );

  const paroleRevocationsChartData = generateChartData(
    stateMetricData,
    [ADMISSIONS_FROM_PAROLE, ADMISSIONS_FROM_PAROLE_NEW_CRIME, ADMISSIONS_FROM_PAROLE_TECHNICAL],
    ["Total", "New Crime", "Technical Violation"]
  );

  const probationRevocationsChartData = generateChartData(
    stateMetricData,
    [
      ADMISSIONS_FROM_PROBATION,
      ADMISSIONS_FROM_PROBATION_NEW_CRIME,
      ADMISSIONS_FROM_PROBATION_TECHNICAL,
    ],
    ["Total", "New Crime", "Technical Violation"]
  );

  const releasesChartData = generateChartData(stateMetricData, [RELEASES_COMPLETED], ["Releases"]);

  const { flowData, lastDate, comparedToDate } = generateFlowDiagramData(stateMetricData);

  const keyInsightsData = generateKeyInsightsData(flowData);

  const sourceData = generateSourceData(flowData);

  return (
    <MainPage
      stateName={stateName}
      populationsChartData={populationsChartData}
      prisonAdmissionsChartData={prisonAdmissionsChartData}
      paroleRevocationsChartData={paroleRevocationsChartData}
      probationRevocationsChartData={probationRevocationsChartData}
      releasesChartData={releasesChartData}
      flowDiagramData={flowData}
      flowDiagramLastDate={lastDate}
      flowDiagramPrevDate={comparedToDate}
      keyInsightsData={keyInsightsData}
      sourceData={sourceData}
    />
  );
};

App.propTypes = {
  stateCode: PropTypes.string.isRequired,
  data: PropTypes.arrayOf(
    PropTypes.shape({
      state_code: PropTypes.string.isRequired,
      metric: PropTypes.string.isRequired,
      year: PropTypes.string.isRequired,
      month: PropTypes.string.isRequired,
      date_reported: PropTypes.string.isRequired,
      value: PropTypes.number.isRequired,
      compared_to_year: PropTypes.string,
      compared_to_month: PropTypes.string,
      value_change: PropTypes.number,
      percentage_change: PropTypes.number,
    })
  ).isRequired,
};

export default App;
