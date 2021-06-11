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
 * Takes source name and source categories and produces formatted string.
 * @param sourceName {string}
 * @param sourceCategories {string[]}
 * @param sourceUrl {string}
 * @returns {string}
 */
const generateSourceText = (sourceName, sourceCategories, sourceUrl) => {
  if (sourceUrl) {
    if (sourceCategories.length) {
      return `Sourced from ${sourceName}'s public reports. Includes data for the following categories: ${sourceCategories.join(
        ", "
      )}`;
    }
    return `Sourced from ${sourceName}'s public reports`;
  }

  if (sourceCategories.length) {
    return `Sourced from data provided to the CSG Justice Center by ${sourceName}. Includes data for the following categories: ${sourceCategories.join(
      ", "
    )}`;
  }

  return `Sourced from data provided to the CSG Justice Center by ${sourceName}`;
};

export default generateSourceText;
