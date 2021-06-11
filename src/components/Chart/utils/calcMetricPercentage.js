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
import logger from "../../../utils/logger";

export const NO_DATA_ERROR = "Cannot generate percentage for empty metric.";

/**
 * Transforms data points array and returns percentage diff between first and last data points
 * @param data (number|null)[]
 * @returns {string}
 */
function calcMetricPercentage(data) {
  if (!data.length) {
    logger.error(NO_DATA_ERROR);

    return "N/A";
  }

  if (data.length === 1) {
    return "0%";
  }

  const filteredData = data.filter((item) => item);

  const ratio = filteredData[filteredData.length - 1] / filteredData[0];
  const diff = Math.round((ratio - 1) * 100);

  return `${diff > 0 ? "+" : ""}${diff}%`;
}

export default calcMetricPercentage;
