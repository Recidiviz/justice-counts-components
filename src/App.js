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
import CountySelector from "./components/Jails/CountySelector";
import ReportingCounties from "./components/Jails/ReportingCounties";
import generateTopCountiesByPopulation from "./utils/generateTopCountiesByPopulation";
import {
  ADMISSIONS_NEW_COMMITMENTS,
  ADMISSIONS_FROM_PAROLE,
  ADMISSIONS_FROM_PROBATION,
  POPULATION_PAROLE,
  POPULATION_PRISON,
  POPULATION_PROBATION,
  RELEASES,
  RELEASES_COMPLETED,
  RELEASES_TO_PAROLE,
  ADMISSIONS,
  ADMISSIONS_FROM_PAROLE_NEW_CRIME,
  ADMISSIONS_FROM_PAROLE_TECHNICAL,
  ADMISSIONS_FROM_PROBATION_TECHNICAL,
  ADMISSIONS_FROM_PROBATION_NEW_CRIME,
  INCARCERATION_RATE_JAIL,
} from "./constants/metrics";
import getIsUnified from "./utils/getIsUnified";
import getAdditionalDescription from "./utils/getAdditionalDescription";

const App = ({
  stateCode,
  correctionsMonthlyData,
  correctionsAnnualData,
  jailsData,
  countiesData,
}) => {
  const stateName = states[stateCode];
  const monthlyStateMetricData = getNormalizedStateData(correctionsMonthlyData, stateCode);
  const annualStateMetricData = getNormalizedStateData(correctionsAnnualData, stateCode);
  const jailsMetricData = getNormalizedStateData(jailsData, stateCode);
  const normalizedCountyData = getNormalizedCountyData(countiesData, stateCode, jailsData);
  const topCountiesByPopulation = generateTopCountiesByPopulation(countiesData, stateCode);

  const isNoData =
    isEmptyObj(monthlyStateMetricData) &&
    isEmptyObj(annualStateMetricData) &&
    isEmptyObj(jailsMetricData);

  const monthlyPopulationsChartData = generateCorrectionsChartData(
    monthlyStateMetricData,
    [POPULATION_PRISON, POPULATION_PAROLE, POPULATION_PROBATION],
    ["Prison Population", "Post-Release Supervision Population", "Probation Population"]
  );

  const monthlyPrisonAdmissionsChartData = generateCorrectionsChartData(
    monthlyStateMetricData,
    [ADMISSIONS, ADMISSIONS_NEW_COMMITMENTS, ADMISSIONS_FROM_PAROLE, ADMISSIONS_FROM_PROBATION],
    [
      "Total Prison Admissions",
      "New Prison Commitments",
      "Post-Release Supervision Revocations (Total)",
      "Probation Revocations (Total)",
    ]
  );

  const monthlyParoleRevocationsChartData = generateCorrectionsChartData(
    monthlyStateMetricData,
    [ADMISSIONS_FROM_PAROLE, ADMISSIONS_FROM_PAROLE_NEW_CRIME, ADMISSIONS_FROM_PAROLE_TECHNICAL],
    ["Total", "New Crime", "Technical Violation"]
  );

  const monthlyProbationRevocationsChartData = generateCorrectionsChartData(
    monthlyStateMetricData,
    [
      ADMISSIONS_FROM_PROBATION,
      ADMISSIONS_FROM_PROBATION_NEW_CRIME,
      ADMISSIONS_FROM_PROBATION_TECHNICAL,
    ],
    ["Total", "New Crime", "Technical Violation"]
  );

  const monthlyReleasesChartData = generateCorrectionsChartData(
    monthlyStateMetricData,
    [RELEASES, RELEASES_COMPLETED, RELEASES_TO_PAROLE],
    [
      "Total Prison Releases",
      "Releases to Community (without supervision)",
      "Releases to Post-Release Supervision",
    ]
  );

  const monthlyFlowData = generateFlowDiagramData(
    monthlyStateMetricData,
    annualStateMetricData,
    stateName,
    false
  );

  const monthlyKeyInsightsData = generateCorrectionsKeyInsightsData(monthlyFlowData.flowData);

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

  const annualPopulationsChartData = generateCorrectionsChartData(
    annualStateMetricData,
    [POPULATION_PRISON, POPULATION_PAROLE, POPULATION_PROBATION],
    ["Prison Population", "Post-Release Supervision Population", "Probation Population"],
    true
  );

  const annualPrisonAdmissionsChartData = generateCorrectionsChartData(
    annualStateMetricData,
    [ADMISSIONS, ADMISSIONS_NEW_COMMITMENTS, ADMISSIONS_FROM_PAROLE, ADMISSIONS_FROM_PROBATION],
    [
      "Total Prison Admissions",
      "New Prison Commitments",
      "Post-Release Supervision Revocations (Total)",
      "Probation Revocations (Total)",
    ],
    true
  );

  const annualParoleRevocationsChartData = generateCorrectionsChartData(
    annualStateMetricData,
    [ADMISSIONS_FROM_PAROLE, ADMISSIONS_FROM_PAROLE_NEW_CRIME, ADMISSIONS_FROM_PAROLE_TECHNICAL],
    ["Total", "New Crime", "Technical Violation"],
    true
  );

  const annualProbationRevocationsChartData = generateCorrectionsChartData(
    annualStateMetricData,
    [
      ADMISSIONS_FROM_PROBATION,
      ADMISSIONS_FROM_PROBATION_NEW_CRIME,
      ADMISSIONS_FROM_PROBATION_TECHNICAL,
    ],
    ["Total", "New Crime", "Technical Violation"],
    true
  );

  const annualReleasesChartData = generateCorrectionsChartData(
    annualStateMetricData,
    [RELEASES, RELEASES_COMPLETED, RELEASES_TO_PAROLE],
    [
      "Total Prison Releases",
      "Releases to Community (without supervision)",
      "Releases to Post-Release Supervision",
    ],
    true
  );

  const annualFlowData = generateFlowDiagramData(
    annualStateMetricData,
    monthlyStateMetricData,
    stateName,
    true
  );

  const annualKeyInsightsData = generateCorrectionsKeyInsightsData(annualFlowData.flowData);

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

  const { jailsKeyInsightsData, jailsLastUpdatedDate } = generateJailsKeyInsightsData(
    jailsMetricData,
    <ReportingCounties stateName={stateName} counties={normalizedCountyData} />
  );

  const { countySelectorComponent, selectorCountyCode, selectorCountyName } = CountySelector(
    normalizedCountyData,
    topCountiesByPopulation,
    stateName
  );

  const incarcerationRateChartData = generateJailsChartData(
    jailsMetricData,
    INCARCERATION_RATE_JAIL,
    ["Statewide", selectorCountyCode],
    ["Statewide Confinement Rate", selectorCountyName]
  );

  const incarcerationRateTopCountiesChartData = generateJailsChartData(
    jailsMetricData,
    INCARCERATION_RATE_JAIL,
    topCountiesByPopulation.map((county) => county.code),
    topCountiesByPopulation.map((county) => county.name)
  );

  const jailsSourceData = [
    {
      name: "Vera Institute of Justice",
      links: [
        {
          name: "Vera Jails Survey",
          src:
            "https://github.com/vera-institute/jail-population-data/blob/master/jail_population.csv",
        },
      ],
    },
    {
      name: "Bureau of Justice Statistics (BJS)",
      links: [
        {
          name: "Annual Survey of Jails",
          src: "https://www.icpsr.umich.edu/web/NACJD/studies/37392",
        },
      ],
    },
  ];

  const isUnified = getIsUnified(stateCode);
  const additionalDescription = getAdditionalDescription(stateCode);

  return (
    <MainPage
      stateName={stateName}
      monthlyCorrectionsData={monthlyCorrectionsData}
      annualCorrectionsData={annualCorrectionsData}
      countySelector={countySelectorComponent}
      incarcerationRateChartData={incarcerationRateChartData}
      incarcerationRateTopCountiesChartData={incarcerationRateTopCountiesChartData}
      jailsKeyInsightsData={jailsKeyInsightsData}
      jailsLastUpdatedDate={jailsLastUpdatedDate}
      correctionsLastUpdatedDate={monthlyFlowData.correctionsLastUpdatedDate}
      jailsSourceData={jailsSourceData}
      isNoData={isNoData}
      isUnified={isUnified}
      additionalDescription={additionalDescription}
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
      measurement_type: PropTypes.string,
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
      county_code: PropTypes.string,
      metric: PropTypes.string.isRequired,
      year: PropTypes.string.isRequired,
      month: PropTypes.string.isRequired,
      date_reported: PropTypes.string.isRequired,
      measurement_type: PropTypes.string,
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
