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
import isEmptyObj from "is-empty-obj";

import MainPage from "./components/MainPage";
import states from "./constants/states";
import getNormalizedStateData from "./utils/getNormalizedStateData";
import generateCorrectionsChartData from "./utils/generateCorrectionsChartData";
import generateFlowDiagramData from "./utils/generateFlowDiagramData";
import generateCorrectionsKeyInsightsData from "./utils/generateCorrectionsKeyInsightsData";
import generateJailsKeyInsightsData from "./utils/generateJailsKeyInsightsData";
import generateJailsChartData from "./utils/generateJailsChartData";
import generateSourceData from "./utils/generateSourceData";
import getNormalizedCountyData from "./utils/getNormalizedCountyData";
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
  INCARCERATION_RATE_JAIL,
} from "./constants/metrics";

const App = ({ stateCode, correctionsData, jailsData, countiesData }) => {
  const stateName = states[stateCode];
  const stateMetricData = getNormalizedStateData(correctionsData, stateCode);
  const jailsMetricData = getNormalizedStateData(jailsData, stateCode);
  const countyNamesData = getNormalizedCountyData(countiesData, stateCode);

  const isNoData = isEmptyObj(stateMetricData);

  const populationsChartData = generateCorrectionsChartData(
    stateMetricData,
    [POPULATION_PRISON, POPULATION_PAROLE, POPULATION_PROBATION],
    ["Prison Population", "Parole Population", "Probation Population"]
  );

  const prisonAdmissionsChartData = generateCorrectionsChartData(
    stateMetricData,
    [ADMISSIONS, ADMISSIONS_NEW_COMMITMENTS, ADMISSIONS_FROM_PAROLE, ADMISSIONS_FROM_PROBATION],
    [
      "Total Prison Admissions",
      "New Court Admissions",
      "Parole Revocations (Total)",
      "Probation Revocations (Total)",
    ]
  );

  const paroleRevocationsChartData = generateCorrectionsChartData(
    stateMetricData,
    [ADMISSIONS_FROM_PAROLE, ADMISSIONS_FROM_PAROLE_NEW_CRIME, ADMISSIONS_FROM_PAROLE_TECHNICAL],
    ["Total", "New Crime", "Technical Violation"]
  );

  const probationRevocationsChartData = generateCorrectionsChartData(
    stateMetricData,
    [
      ADMISSIONS_FROM_PROBATION,
      ADMISSIONS_FROM_PROBATION_NEW_CRIME,
      ADMISSIONS_FROM_PROBATION_TECHNICAL,
    ],
    ["Total", "New Crime", "Technical Violation"]
  );

  const releasesChartData = generateCorrectionsChartData(
    stateMetricData,
    [RELEASES_COMPLETED],
    ["Releases"]
  );

  const { flowData, lastDate, comparedToDate } = generateFlowDiagramData(stateMetricData);

  const correctionsKeyInsightsData = generateCorrectionsKeyInsightsData(flowData);

  const sourceData = generateSourceData(flowData, [
    populationsChartData.sourceData,
    prisonAdmissionsChartData.sourceData,
    paroleRevocationsChartData.sourceData,
    probationRevocationsChartData.sourceData,
    releasesChartData.sourceData,
  ]);

  const { jailsKeyInsightsData, countyCoverage } = generateJailsKeyInsightsData(jailsMetricData);

  const incarcerationRateChartData = generateJailsChartData(
    jailsMetricData,
    INCARCERATION_RATE_JAIL,
    ["Statewide", "US_CO_ARAPAHOE"],
    ["Statewide", "Arapahoe county"],
    countyCoverage
  );

  const incarcerationRateTopCountiesChartData = generateJailsChartData(
    jailsMetricData,
    INCARCERATION_RATE_JAIL,
    countyNamesData.slice(0, 5).map((county) => county.code),
    countyNamesData.slice(0, 5).map((county) => county.name)
  );

  return (
    <MainPage
      countySelectorData={countyNamesData}
      stateName={stateName}
      populationsChartData={populationsChartData}
      prisonAdmissionsChartData={prisonAdmissionsChartData}
      paroleRevocationsChartData={paroleRevocationsChartData}
      probationRevocationsChartData={probationRevocationsChartData}
      incarcerationRateChartData={incarcerationRateChartData}
      incarcerationRateTopCountiesChartData={incarcerationRateTopCountiesChartData}
      releasesChartData={releasesChartData}
      flowDiagramData={flowData}
      flowDiagramLastDate={lastDate}
      flowDiagramPrevDate={comparedToDate}
      correctionsKeyInsightsData={correctionsKeyInsightsData}
      jailsKeyInsightsData={jailsKeyInsightsData}
      sourceData={sourceData}
      isNoData={isNoData}
    />
  );
};

App.propTypes = {
  stateCode: PropTypes.string.isRequired,
  correctionsData: PropTypes.arrayOf(
    PropTypes.shape({
      state_code: PropTypes.string.isRequired,
      county_code: PropTypes.string,
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
  jailsData: PropTypes.arrayOf(
    PropTypes.shape({
      state_code: PropTypes.string.isRequired,
      county_code: PropTypes.string,
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
  countiesData: PropTypes.arrayOf(
    PropTypes.shape({
      state_code: PropTypes.string.isRequired,
      county_code: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      population: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default App;
