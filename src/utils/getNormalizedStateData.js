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
import toInt from "./toInt";
import sortByYearAndMonth from "./sortByYearAndMonth";
import getNormalizedDate from "./getNormalizedDate";

/**
 * Filters data by state, normalizes, groups by metric type and sorts by date
 * @param data {{
 *   state_code: string
 *   metric: string
 *   year: string,
 *   month: string,
 *   date_reported: string,
 *   date_published: string,
 *   value: number
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
 *    datePublished: { year: number, month: number, day: number }
 *    value: number
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
      const reportedDate = getNormalizedDate(item.date_reported);
      const publishedDate = item.date_published && getNormalizedDate(item.date_published);

      const normalizedItem = {
        metric: item.metric,
        year: toInt(item.year),
        month: toInt(item.month) - 1,
        dateReported: reportedDate,
        datePublished: publishedDate,
        value: toInt(item.value),
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
