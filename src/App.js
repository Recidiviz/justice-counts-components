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
import isEmptyObj from "is-empty-obj";

import MainPage from "./components/MainPage";
import states from "./constants/states";
import getNormalizedStateData from "./utils/getNormalizedStateData";
import generateChartData from "./utils/generateChartData";
import generateFlowDiagramData from "./utils/generateFlowDiagramData";
import generateKeyInsightsData from "./utils/generateKeyInsightsData";
import generateSourceData from "./utils/generateSourceData";
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

const App = ({ stateCode, correctionsMonthlyData, correctionsAnnualData }) => {
  const stateName = states[stateCode];
  const monthlyStateMetricData = getNormalizedStateData(correctionsMonthlyData, stateCode);
  const annualStateMetricData = getNormalizedStateData(correctionsAnnualData, stateCode);

  const isNoData = isEmptyObj(monthlyStateMetricData) && isEmptyObj(annualStateMetricData);

  const monthlyPopulationsChartData = generateChartData(
    monthlyStateMetricData,
    [POPULATION_PRISON, POPULATION_PAROLE, POPULATION_PROBATION],
    ["Prison Population", "Parole Population", "Probation Population"]
  );

  const monthlyPrisonAdmissionsChartData = generateChartData(
    monthlyStateMetricData,
    [ADMISSIONS, ADMISSIONS_NEW_COMMITMENTS, ADMISSIONS_FROM_PAROLE, ADMISSIONS_FROM_PROBATION],
    [
      "Total Prison Admissions",
      "New Prison Commitments",
      "Parole Revocations (Total)",
      "Probation Revocations (Total)",
    ]
  );

  const monthlyParoleRevocationsChartData = generateChartData(
    monthlyStateMetricData,
    [ADMISSIONS_FROM_PAROLE, ADMISSIONS_FROM_PAROLE_NEW_CRIME, ADMISSIONS_FROM_PAROLE_TECHNICAL],
    ["Total", "New Crime", "Technical Violation"]
  );

  const monthlyProbationRevocationsChartData = generateChartData(
    monthlyStateMetricData,
    [
      ADMISSIONS_FROM_PROBATION,
      ADMISSIONS_FROM_PROBATION_NEW_CRIME,
      ADMISSIONS_FROM_PROBATION_TECHNICAL,
    ],
    ["Total", "New Crime", "Technical Violation"]
  );

  const monthlyReleasesChartData = generateChartData(
    monthlyStateMetricData,
    [RELEASES_COMPLETED],
    ["Releases"]
  );

  const monthlyFlowData = generateFlowDiagramData(monthlyStateMetricData);

  const monthlyKeyInsightsData = generateKeyInsightsData(monthlyFlowData.flowData);

  const monthlySourceData = generateSourceData(monthlyFlowData.flowData, [
    monthlyPopulationsChartData.sourceData,
    monthlyPrisonAdmissionsChartData.sourceData,
    monthlyParoleRevocationsChartData.sourceData,
    monthlyProbationRevocationsChartData.sourceData,
    monthlyReleasesChartData.sourceData,
  ]);

  const monthlyCorrectionsData = {
    populationsChartData: monthlyPopulationsChartData,
    prisonAdmissionsChartData: monthlyPrisonAdmissionsChartData,
    paroleRevocationsChartData: monthlyParoleRevocationsChartData,
    probationRevocationsChartData: monthlyProbationRevocationsChartData,
    releasesChartData: monthlyReleasesChartData,
    flowData: monthlyFlowData.flowData,
    keyInsightsData: monthlyKeyInsightsData,
    flowDiagramLastDate: monthlyFlowData.lastDate,
    flowDiagramPrevDate: monthlyFlowData.comparedToDate,
    sourceData: monthlySourceData,
  };

  const annualPopulationsChartData = generateChartData(
    annualStateMetricData,
    [POPULATION_PRISON, POPULATION_PAROLE, POPULATION_PROBATION],
    ["Prison Population", "Parole Population", "Probation Population"],
    true
  );

  const annualPrisonAdmissionsChartData = generateChartData(
    annualStateMetricData,
    [ADMISSIONS, ADMISSIONS_NEW_COMMITMENTS, ADMISSIONS_FROM_PAROLE, ADMISSIONS_FROM_PROBATION],
    [
      "Total Prison Admissions",
      "New Prison Commitments",
      "Parole Revocations (Total)",
      "Probation Revocations (Total)",
    ],
    true
  );

  const annualParoleRevocationsChartData = generateChartData(
    annualStateMetricData,
    [ADMISSIONS_FROM_PAROLE, ADMISSIONS_FROM_PAROLE_NEW_CRIME, ADMISSIONS_FROM_PAROLE_TECHNICAL],
    ["Total", "New Crime", "Technical Violation"],
    true
  );

  const annualProbationRevocationsChartData = generateChartData(
    annualStateMetricData,
    [
      ADMISSIONS_FROM_PROBATION,
      ADMISSIONS_FROM_PROBATION_NEW_CRIME,
      ADMISSIONS_FROM_PROBATION_TECHNICAL,
    ],
    ["Total", "New Crime", "Technical Violation"],
    true
  );

  const annualReleasesChartData = generateChartData(
    annualStateMetricData,
    [RELEASES_COMPLETED],
    ["Releases"],
    true
  );

  const annualFlowData = generateFlowDiagramData(annualStateMetricData);

  const annualKeyInsightsData = generateKeyInsightsData(annualFlowData.flowData);

  const annualSourceData = generateSourceData(annualFlowData.flowData, [
    annualPopulationsChartData.sourceData,
    annualPrisonAdmissionsChartData.sourceData,
    annualParoleRevocationsChartData.sourceData,
    annualProbationRevocationsChartData.sourceData,
    annualReleasesChartData.sourceData,
  ]);

  const annualCorrectionsData = {
    populationsChartData: annualPopulationsChartData,
    prisonAdmissionsChartData: annualPrisonAdmissionsChartData,
    paroleRevocationsChartData: annualParoleRevocationsChartData,
    probationRevocationsChartData: annualProbationRevocationsChartData,
    releasesChartData: annualReleasesChartData,
    flowData: annualFlowData.flowData,
    keyInsightsData: annualKeyInsightsData,
    flowDiagramLastDate: annualFlowData.lastDate,
    flowDiagramPrevDate: annualFlowData.comparedToDate,
    sourceData: annualSourceData,
  };

  return (
    <MainPage
      stateName={stateName}
      monthlyCorrectionsData={monthlyCorrectionsData}
      annualCorrectionsData={annualCorrectionsData}
      isNoData={isNoData}
    />
  );
};

App.propTypes = {
  stateCode: PropTypes.string.isRequired,
  correctionsMonthlyData: PropTypes.arrayOf(
    PropTypes.shape({
      state_code: PropTypes.string.isRequired,
      metric: PropTypes.string.isRequired,
      year: PropTypes.string.isRequired,
      month: PropTypes.string.isRequired,
      date_reported: PropTypes.string.isRequired,
      value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
      compared_to_year: PropTypes.string,
      compared_to_month: PropTypes.string,
      value_change: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
      percentage_change: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    })
  ).isRequired,
  correctionsAnnualData: PropTypes.arrayOf(
    PropTypes.shape({
      state_code: PropTypes.string.isRequired,
      metric: PropTypes.string.isRequired,
      year: PropTypes.string.isRequired,
      month: PropTypes.string.isRequired,
      date_reported: PropTypes.string.isRequired,
      value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
      compared_to_year: PropTypes.string,
      compared_to_month: PropTypes.string,
      value_change: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
      percentage_change: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    })
  ).isRequired,
};

export default App;
