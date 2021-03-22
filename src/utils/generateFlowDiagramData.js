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
import {
  ADMISSIONS_NEW_COMMITMENTS,
  ADMISSIONS_FROM_PAROLE_TECHNICAL,
  ADMISSIONS_FROM_PROBATION_TECHNICAL,
  PROBATION_SENTENCES,
  ADMISSIONS_FROM_PAROLE,
  ADMISSIONS_FROM_PROBATION,
  metricToCardName,
  POPULATION_PAROLE,
  POPULATION_PRISON,
  POPULATION_PROBATION,
  RELEASES_TO_PAROLE,
} from "../constants/metrics";
import generateHint from "./generateHint";
import months from "../constants/months";
import generateSourceText from "./generateSourceText";

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
 *   percentChange?: number
 *   numberChange?: number
 *   isNotAvailable?: boolean
 * }
 * },
 * }}
 */
const generateFlowDiagramData = (data) => {
  const { flowData, mostRecentYear, mostRecentMonth } = [
    ADMISSIONS_NEW_COMMITMENTS,
    PROBATION_SENTENCES,
    POPULATION_PROBATION,
    ADMISSIONS_FROM_PROBATION,
    POPULATION_PRISON,
    POPULATION_PAROLE,
    ADMISSIONS_FROM_PAROLE,
    RELEASES_TO_PAROLE,
    ADMISSIONS_FROM_PAROLE_TECHNICAL,
    ADMISSIONS_FROM_PROBATION_TECHNICAL,
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
          percentChange: lastItem.percentChange ? lastItem.percentChange * 100 : null,
          numberChange: lastItem.valueChange,
          sourceText: generateSourceText(lastItem.sourceName, lastItem.sourceCategories),
          sourceUrl: lastItem.sourceUrl,
          reportName: lastItem.reportName,
          lastDate: `${months[lastItem.month]} ${lastItem.year}`,
          comparedToDate: lastItem.percentChange
            ? `${months[lastItem.comparedToMonth]} ${lastItem.comparedToYear}`
            : null,
          item: lastItem,
          isTooStale: false,
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

  Object.values(flowData).forEach((metric) => {
    const hint = metric.isNotAvailable
      ? null
      : generateHint(mostRecentYear, mostRecentMonth, metric.item);

    if (hint) {
      // eslint-disable-next-line no-param-reassign
      metric.hint = hint;
    }

    const { item } = metric;

    const isTooStale = metric.isNotAvailable
      ? null
      : item.month < mostRecentMonth && item.year <= mostRecentYear - 1;

    if (isTooStale) {
      // eslint-disable-next-line no-param-reassign
      metric.isTooStale = isTooStale;
    }
  });

  return {
    flowData,
    lastDate: `${months[mostRecentMonth]} ${mostRecentYear}`,
    comparedToDate: `${months[mostRecentMonth]} ${mostRecentYear - 1}`,
  };
};

export default generateFlowDiagramData;
