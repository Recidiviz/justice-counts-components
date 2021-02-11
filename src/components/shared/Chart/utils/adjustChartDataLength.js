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
/**
 * Takes an array of chart data and fills/cuts it to target length
 * @param data
 * @param targetLength
 */
const adjustChartDataLength = (data, targetLength) => {
  const { year: startYear, month: startMonth } = data.labels[0] || {
    year: new Date().getFullYear(),
    month: new Date().getMonth(),
  };
  const totalStartMonths = startYear * 12 + startMonth;
  const lengthDiff = targetLength - data.labels.length;

  return {
    datasets: data.datasets.map((dataset) => ({
      ...dataset,
      data: Array.from({ length: lengthDiff }).fill(null).concat(dataset.data.slice(-targetLength)),
    })),
    labels: Array.from({ length: lengthDiff })
      .map((_, i) => ({
        year: Math.floor((totalStartMonths - lengthDiff + i) / 12),
        month: (totalStartMonths - lengthDiff + i) % 12,
      }))
      .concat(data.labels.slice(-targetLength)),
  };
};

export default adjustChartDataLength;
