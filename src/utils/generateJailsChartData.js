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
import { METRICS_NOT_PROVIDED } from "../constants/errors";
import logger from "./logger";
import chartPeriods from "./chartPeriods";

export const noMetricData = (metric) =>
  `${metric} doesn't appear in source files. Chart data is not generated.`;

/**
 * Transforms normalized data to chart.js format.
 * @param data - normalized data (see @returns of getNormalizedStateData)
 * @param metric - metric name for which we generate chart data
 * @param counties {string[]} - counties for which we generate chart data
 * @param countyLabels {string[]} - humanized county names
 * @param countyCoverage - percentage of counties in the state reporting data
 * @returns {{
 *   datasets: {
 *     metric: string
 *     county: string
 *     countyCoverage: string
 *     isNotAvailable: boolean
 *     isStatewide: boolean
 *     label: string
 *     data: (number|null)[]
 *   }[],
 *   labels: string[],
 * }}
 */

const generateJailsChartData = (data, metric, counties, countyLabels = []) => {
  if (!metric.length) {
    throw new Error(METRICS_NOT_PROVIDED);
  }

  const datasets = counties.reduce((acc, county, index) => {
    if (!data[metric]) {
      logger.warn(noMetricData(metric));
    }

    acc.push({
      metric,
      county,
      label: countyLabels[index],
      isNotAvailable: !data[metric],
      isStatewide: county === "Statewide",
      data: [],
      countyCoverageData: [],
    });

    return acc;
  }, []);

  const labels = [];

  const { firstMonth, lastMonth } = chartPeriods(data, datasets);
  let i = firstMonth;

  while (i <= lastMonth) {
    const year = Math.floor(i / 12);
    const month = i % 12;

    labels.push({ year, month });
    datasets.forEach((dataset) => {
      if (!dataset.isNotAvailable) {
        const dataPoint = data[dataset.metric].find((item) =>
          dataset.isStatewide
            ? item.year === year && item.month === month && item.countyCode === undefined
            : item.year === year && item.month === month && item.countyCode === dataset.county
        );
        if (dataPoint) {
          dataset.data.push(dataPoint.value);
          if (dataset.isStatewide) {
            dataset.countyCoverageData.push(dataPoint.countyCoverage * 100);
            if (dataPoint.populationCoverage < 0.1) {
              dataset.data.pop();
              dataset.data.push(null);
            }
          }
        } else {
          dataset.data.push(null);
        }
      }
    });
    console.log(datasets);

    i += 1;
  }

  return { datasets, labels };
};

export default generateJailsChartData;
