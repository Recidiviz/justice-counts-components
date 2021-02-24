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
 *   countyCode: string
 *   compared_to_year?: string
 *   compared_to_month?: string
 *   value_change?: number
 *   percentage_change?: number
 *   source_name: string
 *   source_url: string
 *   report_name: string
 *   raw_source_categories: string[]
 * }[]}
 * @param stateCode {string}
 * @returns {{
 *  [metric]: {
 *    metric: string
 *    year: number
 *    month: number
 *    dateReported: { year: number, month: number, day: number }
 *    value: number
 *    countyCode: string | null
 *    comparedToYear: number | null,
 *    comparedToMonth: number | null
 *    valueChange: number | null
 *    percentChange: number | null
 *    sourceName: string
 *    sourceUrl: string
 *    reportName: string
 *    sourceCategories: string[]
 *  }
 * }}
 */
const getNormalizedStateData = (data, stateCode) => {
  const normalizedData = data.reduce((acc, item) => {
    if (item.state_code === stateCode) {
      const [yearReported, monthReported, dayReported] = item.date_reported
        ? item.date_reported.split("-")
        : [];

      const normalizedItem = {
        metric: item.metric,
        year: toInt(item.year),
        month: toInt(item.month) - 1,
        dateReported: {
          year: toInt(yearReported),
          month: toInt(monthReported - 1),
          day: toInt(dayReported),
        },
        value: toInt(item.value),
        countyCode: item.county_code,
        comparedToYear: item.compared_to_year ? toInt(item.compared_to_year) : null,
        comparedToMonth: item.compared_to_month ? toInt(item.compared_to_month) - 1 : null,
        sourceName: item.source_name,
        sourceUrl: item.source_url,
        reportName: item.report_name,
        sourceCategories: item.raw_source_categories,
        valueChange: Number.isNaN(Number(item.value_change)) ? null : Number(item.value_change),
        percentChange: Number.isNaN(Number(item.percentage_change))
          ? null
          : Number(item.percentage_change),
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
