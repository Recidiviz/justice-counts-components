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
import generateHint from "./generateHint";
import months from "../constants/months";

/**
 * Prepares data for flow Diagram
 * @param data - normalized, grouped and sorted metric data (output of `getNormalizedStateData`)
 * @returns {{
 * lastDate: string,
 * comparedToDate: string,
 * flowData: {
 * [metric]: {
 *   title: string
 *   number?: number
 *   percent?: number
 *   isNotAvailable?: boolean
 * }
 * },
 * }}
 */
const generateFlowDiagramData = (data) => {
  const { flowData, mostRecentYear, mostRecentMonth } = [
    ADMISSIONS,
    ADMISSIONS_NEW_COURT,
    POPULATION_PROBATION,
    ADMISSIONS_REVOCATIONS_PROBATION,
    POPULATION_PRISON,
    POPULATION_PAROLE,
    ADMISSIONS_REVOCATIONS_PAROLE,
    RELEASES,
  ].reduce(
    (acc, metric) => {
      if (!data[metric]) {
        acc.flowData[metric] = {
          title: metricToCardName[metric],
          isNotAvailable: true,
        };
      } else {
        const lastItem = data[metric][data[metric].length - 1];
        acc.flowData[metric] = {
          title: metricToCardName[metric],
          number: lastItem.value,
          percent: lastItem.percentChange * 100,
          item: lastItem,
        };

        if (acc.mostRecentYear < lastItem.year) {
          acc.mostRecentYear = lastItem.year;
          acc.mostRecentMonth = lastItem.month;
        } else if (acc.mostRecentYear === lastItem.year) {
          acc.mostRecentMonth = Math.max(lastItem.month, acc.mostRecentMonth);
        }
      }

      return acc;
    },
    { flowData: {}, mostRecentYear: -Infinity, mostRecentMonth: -Infinity }
  );

  Object.values(flowData).forEach((item) => {
    const hint = item.isNotAvailable
      ? null
      : generateHint(mostRecentYear, mostRecentMonth, item.item);

    if (hint) {
      // eslint-disable-next-line no-param-reassign
      item.hint = hint;
    }
  });

  return {
    flowData,
    lastDate: `${months[mostRecentMonth]} ${mostRecentYear}`,
    comparedToDate: `${months[mostRecentMonth]} ${mostRecentYear - 1}`,
  };
};

export default generateFlowDiagramData;
