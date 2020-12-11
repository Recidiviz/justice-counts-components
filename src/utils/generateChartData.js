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

const generateChartData = (data, metrics, period = 60) => {
  const datasets = metrics.map((metric) => ({
    metric,
    label: metricToChartName[metric],
    data: [],
  }));
  const labels = [];

  const { latestYear, latestMonth } = metrics.reduce(
    (acc, metric) => {
      const { year, month } = data[metric][data[metric].length - 1];

      if (year > acc.latestYear) return { latestYear: year, latestMonth: month };
      if (month > acc.latestMonth) return { latestYear: year, latestMonth: month };

      return acc;
    },
    { latestYear: -Infinity, latestMonth: -Infinity }
  );

  const dates = Array.from({ length: period }).map((_, i) => {
    const latestTotalMonths = latestYear * 12 + latestMonth;
    const totalMonths = latestTotalMonths - period + i + 1;

    return {
      year: Math.floor(totalMonths / 12),
      month: totalMonths % 12,
    };
  });

  dates.forEach(({ year, month }) => {
    datasets.forEach((dataset) => {
      dataset.data.push(
        data[dataset.metric].find((item) => item.year === year && item.month === month)?.value ||
          null
      );
    });
    labels.push({ year, month });
  });

  return { datasets, labels };
};

export default generateChartData;
