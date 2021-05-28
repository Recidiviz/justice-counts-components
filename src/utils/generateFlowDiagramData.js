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
import generateMeasurementTypeText from "./generateMeasurementTypeText";
import generateSourceText from "./generateSourceText";
import metricIsTooStale from "./metricIsTooStale";
import metricIsRestricted from "./metricIsRestricted";
import metricIsPartiallyAvailable from "./metricIsPartiallyAvailable";

/**
 * Prepares data for flow Diagram
 * @param data - normalized, grouped and sorted metric data (output of `getNormalizedStateData`)
 * @param compareData - normalized, grouped and sorted metric data of another data aggregation range (output of `getNormalizedStateData`)
 * @param stateName - name of the current state
 * @param isAnnual - boolean flag for indicating that data is annual
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
const generateFlowDiagramData = (data, compareData, stateName, isAnnual) => {
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
        if (compareData[metric]) {
          const compareLastItem = compareData[metric][compareData[metric].length - 1];

          acc.flowData[metric] = {
            title: metricToCardName[metric],
            isNotAvailable: true,
            partiallyAvailable: metricIsPartiallyAvailable(compareLastItem, stateName, isAnnual),
          };
        } else {
          acc.flowData[metric] = {
            itemStateName: stateName,
            title: metricToCardName[metric],
            isNotAvailable: true,
          };
        }
      } else {
        const compareLastItem =
          compareData[metric] && compareData[metric][compareData[metric].length - 1];
        const lastItem = data[metric][data[metric].length - 1];
        const { datePublished } = lastItem;

        acc.flowData[metric] = {
          isTooStale: false,
          itemStateName: stateName,
          title: metricToCardName[metric],
          number: lastItem.value,
          percentChange: lastItem.percentChange ? lastItem.percentChange * 100 : null,
          numberChange: lastItem.valueChange,
          sourceText: generateSourceText(lastItem.sourceName, lastItem.sourceCategories),
          sourceUrl: lastItem.sourceUrl,
          reportName: lastItem.reportName,
          measurementTypeText: generateMeasurementTypeText(lastItem.measurementType),
          lastUpdatedDate: datePublished
            ? `${months[datePublished.month]} ${datePublished.day}, ${datePublished.year}`
            : null,
          mostRecentDate: `${months[lastItem.month]} ${lastItem.year}`,
          comparedToDate: lastItem.percentChange
            ? `${months[lastItem.comparedToMonth]} ${lastItem.comparedToYear}`
            : null,
          item: lastItem,
          compareItem: compareLastItem,
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
    if (!item.isNotAvailable) {
      item.hint = generateHint(mostRecentYear, mostRecentMonth, item.item); // eslint-disable-line no-param-reassign
      item.isTooStale = metricIsTooStale(mostRecentYear, mostRecentMonth, item.item); // eslint-disable-line no-param-reassign
      item.warning = metricIsRestricted(item.item, item.compareItem); // eslint-disable-line no-param-reassign
    }
  });

  return {
    flowData,
    lastDate: `${months[mostRecentMonth]} ${mostRecentYear}`,
    comparedToDate: `${months[mostRecentMonth]} ${mostRecentYear - 1}`,
  };
};

export default generateFlowDiagramData;
