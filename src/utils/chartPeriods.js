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

/**
 * Transforms normalized data to chart.js format.
 * @param data - normalized data (see @returns of getNormalizedStateData)
 * @param datasets - sets of data for charts
 * @returns {{
 * firstMonth: number,
 * lastMonth: number,
 * }}
 */

const chartPeriods = (data, datasets) => {
  const periods = datasets.reduce(
    (acc, { isNotAvailable, metric }) => {
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

  const firstMonth = startYear * 12 + startMonth;
  const lastMonth = endYear * 12 + endMonth;

  return {
    firstMonth,
    lastMonth,
  };
};

export default chartPeriods;
