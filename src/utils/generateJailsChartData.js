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
import { COUNTIES_NOT_PROVIDED } from "../constants/errors";
import formatNumber from "./formatNumber";
import logger from "./logger";

export const noMetricData = (metric) =>
  `${metric} doesn't appear in source files. Chart data is not generated.`;

/**
 * Transforms normalized data to chart.js format.
 * @param data - normalized data (see @returns of getNormalizedStateData)
 * @param metric - metric name for which we generate chart data
 * @param counties {string[]} - counties for which we generate chart data
 * @param countyLabels {string[]} - humanized county names
 * @param coveredCounty - counties reporting percent
 * @returns {{
 * datasets: {
 *   metric: string
 *   county: string
 *   coveredCounty: string
 *   isNotAvailable: boolean
 *   isStatewide: boolean
 *   label: string
 *   data: (number|null)[]
 * }[],
 * labels: string[],
 * }}
 */

const generateJailsChartData = (data, metric, counties, countyLabels = [], coveredCounty) => {
  if (!counties.length) {
    throw new Error(COUNTIES_NOT_PROVIDED);
  }

  const datasets = counties.reduce((acc, county, index) => {
    if (!data[metric]) {
      logger.warn(noMetricData(metric));
    }

    acc.push({
      metric,
      county,
      coveredCounty: coveredCounty ? `(${formatNumber(coveredCounty)}% counties reporting)` : null,
      label: countyLabels[index],
      isNotAvailable: !data[metric],
      isStatewide: county === "Statewide",
      data: [],
    });

    return acc;
  }, []);

  const labels = [];

  const periods = datasets.reduce(
    (acc, { isNotAvailable }) => {
      if (isNotAvailable) {
        return acc;
      }
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
      if (!dataset.isNotAvailable) {
        const dataPoint = data[dataset.metric].find((item) =>
          dataset.isStatewide
            ? item.year === year && item.month === month
            : item.year === year && item.month === month && item.countyCode === dataset.county
        );
        if (dataPoint) {
          dataset.data.push(dataPoint.value);
        } else {
          dataset.data.push(null);
        }
      }
    });

    i += 1;
  }

  return { datasets, labels };
};

export default generateJailsChartData;
