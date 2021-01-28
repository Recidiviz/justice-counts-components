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
import toInt from "./toInt";
import sortByYearAndMonth from "./sortByYearAndMonth";

/**
 * Filters data by state, normalizes, groups by metric type and sorts by date
 * @param data {{
 *   state_code: string
 *   metric: string
 *   year: string,
 *   month: string,
 *   date_reported: string,
 *   value: number
 *   compared_to_year?: string
 *   compared_to_month?: string
 *   value_change?: number
 *   percentage_change?: number
 *   source_name: string
 *   source_url: string
 *   raw_source_categories: string[]
 * }[]}
 * @param stateCode {string}
 * @returns {{
 *  [metric]: {
 *    metric: string
 *    year: number
 *    month: number
 *    dateReported: string
 *    value: number
 *    comparedToYear: number | null,
 *    comparedToMonth: number | null
 *    valueChange: number | null
 *    percentChange: number | null
 *    sourceName: string
 *    sourceUrl: string
 *    sourceCategories: string[]
 *  }
 * }}
 */
const getNormalizedStateData = (data, stateCode) => {
  const normalizedData = data.reduce((acc, item) => {
    if (item.state_code === stateCode) {
      const normalizedItem = {
        metric: item.metric,
        year: toInt(item.year),
        month: toInt(item.month) - 1,
        dateReported: new Date(item.date_reported),
        value: item.value,
        comparedToYear: item.compared_to_year ? toInt(item.compared_to_year) : null,
        comparedToMonth: item.compared_to_month ? toInt(item.compared_to_month) - 1 : null,
        valueChange: typeof item.value_change === "number" ? item.value_change : null,
        percentChange: typeof item.percentage_change === "number" ? item.percentage_change : null,
        sourceName: item.source_name,
        sourceUrl: item.source_url,
        sourceCategories: item.raw_source_categories,
      };
      if (acc[normalizedItem.metric]) {
        acc[normalizedItem.metric].push(normalizedItem);
      } else {
        acc[normalizedItem.metric] = [normalizedItem];
      }
    }

    return acc;
  }, {});

  Object.values(normalizedData).forEach((metricData) => metricData.sort(sortByYearAndMonth));

  return normalizedData;
};

export default getNormalizedStateData;
