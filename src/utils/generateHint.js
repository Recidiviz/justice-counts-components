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
import months from "../constants/months";
import { metricToCardName } from "../constants/metrics";

/**
 * Generates flow card hint if current date is not the most recent or is compared
 * not to the exactly one year before
 * @param mostRecentYear - The most recent year in flow diagram
 * @param mostRecentMonth - The most recent month in flow diagram
 * @param metric - Metric name
 * @param year - Metric report year
 * @param month - Metric report month
 * @param comparedToYear - The year metric report compared to
 * @param comparedToMonth - The month metric report compared to
 * @param dateReported - Exact date when metric was reported
 * @returns {string|null}
 */
const generateHint = (
  mostRecentYear,
  mostRecentMonth,
  { metric, year, month, comparedToYear, comparedToMonth, dateReported }
) => {
  if (
    mostRecentYear === year &&
    mostRecentMonth === month &&
    year === comparedToYear + 1 &&
    month === comparedToMonth
  ) {
    return null;
  }

  const formattedReportedDate = `${
    months[dateReported.getMonth()]
  } ${dateReported.getDate()}, ${dateReported.getFullYear()}`;

  let hint = `${metricToCardName[metric]} was last reported on ${formattedReportedDate}`;

  if (comparedToMonth && comparedToYear) {
    hint += ` (% change relative to ${months[comparedToMonth]} ${comparedToYear})`;
  }

  return `${hint}.`;
};

export default generateHint;
