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
import sortByAlphabet from "./sortByAlphabet";
import toInt from "./toInt";

/**
 * Filters data by state, normalizes, groups and sorts by population
 * @param countyData {{
 *   state_code: string
 *   county_code: string
 *   name: string,
 *   population: string,
 * }[]}
 * @param stateCode {string}
 * @param metricData - raw metric data
 * @returns {{
 *   code: string
 *   name: string
 *   population: number
 * }[]}
 */

const getNormalizedCountyData = (countyData, stateCode, metricData) => {
  const normalizedData = countyData.reduce((acc, county) => {
    if (county.state_code === stateCode) {
      acc.push({
        code: county.county_code,
        name: county.name,
        population: toInt(county.population),
        isNoData:
          metricData &&
          !metricData.some(
            (metric) => metric.state_code === stateCode && metric.county_code === county.county_code
          ),
      });
    }

    return acc;
  }, []);

  normalizedData.sort(sortByAlphabet);

  return normalizedData;
};

export default getNormalizedCountyData;
