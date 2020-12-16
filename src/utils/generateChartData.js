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
import { metricToChartName } from "../constants/metrics";
import { METRICS_NOT_PROVIDED } from "../constants/errors";
import logger from "./logger";

export const noHumanizedValue = (metric) =>
  `${metric} missing humanized chart name. Fallback to metric name.`;

export const noMetricData = (metric) =>
  `${metric} doesn't appear in source files. Chart data is not generated.`;

/**
 * Transforms normalized data to chart.js format.
 * @param data - normalized data (see @returns of getNormalizedStateData)
 * @param metrics {string[]} - metric names for which we generate chart data
 * @returns {{datasets: {
 * metric: string
 * label: string
 * data: (number|null)[]
 * }[], labels: string[]}}
 *
 * ({
 *   METRIC_NAME: [
 *   {year: 2020, month: 0, value: 100},
 *   {year: 2020, month: 1, value: 105},
 *   {year: 2020, month: 2, value: 107},
 *   {year: 2020, month: 4, value: 109},
 *   ]
 *   ANOTHER_METRIC: [
 *   {year: 2019, month: 11, value: 50},
 *   {year: 2020, month: 0, value: 52},
 *   {year: 2020, month: 1, value: 54},
 *   {year: 2020, month: 2, value: 56},
 *   ]
 *   EXTRA_METRIC: [...]
 * }, [METRIC_NAME, ANOTHER_METRIC]) => {
 *   datasets: [
 *     {
 *       metric: METRIC_NAME,
 *       label: HUMANIZED_METRIC_NAME,
 *       data: [null, 100, 105, 107, null, 109]
 *     },
 *     {
 *       metric: ANOTHER_METRIC,
 *       label: HUMANIZED_METRIC_NAME,
 *       data: [50, 52, 54, 56, null, null]
 *     }
 *   ],
 *   labels: [
 *     {year: 2019, month: 11},
 *     {year: 2020, month: 0},
 *     {year: 2020, month: 1},
 *     {year: 2020, month: 2},
 *     {year: 2020, month: 3},
 *     {year: 2020, month: 4},
 *   ]
 * }
 */
const generateChartData = (data, metrics) => {
  if (!metrics.length) {
    throw new Error(METRICS_NOT_PROVIDED);
  }

  const datasets = metrics.reduce((acc, metric) => {
    if (!metricToChartName[metric]) {
      logger.warn(noHumanizedValue(metric));
    }

    if (!data[metric]) {
      logger.warn(noMetricData(metric));
    } else {
      acc.push({
        metric,
        label: metricToChartName[metric] || metric,
        data: [],
      });
    }

    return acc;
  }, []);

  const labels = [];

  const periods = datasets.reduce(
    (acc, { metric }) => {
      const { year: startYear, month: startMonth } = data[metric][0];
      const { year: endYear, month: endMonth } = data[metric][data[metric].length - 1];

      if (startYear < acc.startYear) {
        acc.startYear = startYear;
        acc.startMonth = startMonth;
      } else if (startYear === acc.startYear) {
        acc.startMonth = Math.min(acc.startMonth, startMonth);
      }

      if (endYear > acc.endYear) {
        acc.endYear = endYear;
        acc.endMonth = endMonth;
      } else if (endYear === acc.endYear) {
        acc.endMonth = Math.max(acc.endMonth, endMonth);
      }

      return acc;
    },
    { startYear: Infinity, startMonth: Infinity, endYear: -Infinity, endMonth: -Infinity }
  );
  const { startYear, startMonth, endYear, endMonth } = periods;

  let i = startYear * 12 + startMonth;
  const lastMonth = endYear * 12 + endMonth;

  while (i <= lastMonth) {
    const year = Math.floor(i / 12);
    const month = i % 12;

    labels.push({ year, month });
    datasets.forEach((dataset) => {
      dataset.data.push(
        data[dataset.metric].find((item) => item.year === year && item.month === month)?.value ||
          null
      );
    });

    i += 1;
  }

  return { datasets, labels };
};

export default generateChartData;
