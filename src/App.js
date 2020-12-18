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
import {
  ADMISSIONS,
  ADMISSIONS_NEW_COURT,
  ADMISSIONS_REVOCATIONS_PAROLE,
  ADMISSIONS_REVOCATIONS_PROBATION,
  POPULATION_PAROLE,
  POPULATION_PRISON,
  POPULATION_PROBATION,
  RELEASES,
} from "./constants/metrics";
import generateFlowDiagramData from "./utils/generateFlowDiagramData";

const App = ({ state, data }) => {
  const stateName = states[state];
  const stateMetricData = getNormalizedStateData(data, state);

  const populationsChartData = generateChartData(stateMetricData, [
    POPULATION_PRISON,
    POPULATION_PAROLE,
    POPULATION_PROBATION,
  ]);

  const prisonAdmissionsChartData = generateChartData(stateMetricData, [
    ADMISSIONS,
    ADMISSIONS_NEW_COURT,
    ADMISSIONS_REVOCATIONS_PAROLE,
    ADMISSIONS_REVOCATIONS_PROBATION,
  ]);

  const releasesChartData = generateChartData(stateMetricData, [RELEASES]);

  const flowDiagramData = generateFlowDiagramData(stateMetricData);

  return (
    <MainPage
      stateName={stateName}
      populationsChartData={populationsChartData}
      prisonAdmissionsChartData={prisonAdmissionsChartData}
      releasesChartData={releasesChartData}
      flowDiagramData={flowDiagramData}
    />
  );
};

App.propTypes = {
  state: PropTypes.string.isRequired,
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
