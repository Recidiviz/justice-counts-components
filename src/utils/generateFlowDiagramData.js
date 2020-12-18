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
import {
  ADMISSIONS,
  ADMISSIONS_NEW_COURT,
  ADMISSIONS_REVOCATIONS_PAROLE,
  ADMISSIONS_REVOCATIONS_PROBATION,
  metricToCardName,
  POPULATION_PAROLE,
  POPULATION_PRISON,
  POPULATION_PROBATION,
  RELEASES,
} from "../constants/metrics";

const generateFlowDiagramData = (data) => {
  return [
    ADMISSIONS,
    ADMISSIONS_NEW_COURT,
    POPULATION_PROBATION,
    ADMISSIONS_REVOCATIONS_PROBATION,
    POPULATION_PRISON,
    POPULATION_PAROLE,
    ADMISSIONS_REVOCATIONS_PAROLE,
    RELEASES,
  ].reduce((acc, metric) => {
    if (!data[metric]) {
      acc[metric] = {
        title: metricToCardName[metric],
        isNotAvailable: true,
      };
    } else {
      acc[metric] = {
        title: metricToCardName[metric],
        number: data[metric].value,
        percent: data[metric].percentChange,
      };
    }
    return acc;
  }, {});
};

export default generateFlowDiagramData;
