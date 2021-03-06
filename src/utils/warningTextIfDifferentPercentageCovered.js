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
import formatNumber from "./formatNumber";

/**
 * Returns warning if covered percentage is different for jails metrics
 * @param populationData - normalized population data
 * @param incarcerationRateData - normalized incarceration rate data
 */

const warningTextIfDifferentPercentageCovered = (populationData, incarcerationRateData) => {
  if (
    formatNumber(populationData.countyCoverage) !==
      formatNumber(incarcerationRateData.countyCoverage) ||
    formatNumber(populationData.populationCoverage) !==
      formatNumber(incarcerationRateData.populationCoverage)
  )
    return `This value covers ${formatNumber(
      populationData.countyCoverage
    )} percent of counties, representing about ${formatNumber(
      populationData.populationCoverage
    )} percent of the state population.`;

  return null;
};

export default warningTextIfDifferentPercentageCovered;
