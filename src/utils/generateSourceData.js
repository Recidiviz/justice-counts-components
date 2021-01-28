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
const generateSourceData = (flowData) => {
  const sourceDataMap = Object.values(flowData).reduce((acc, { isNotAvailable, item }) => {
    if (isNotAvailable) {
      return acc;
    }

    if (!acc[item.sourceName]) {
      acc[item.sourceName] = new Set([item.sourceUrl]);
    } else {
      acc[item.sourceName].add(item.sourceUrl);
    }

    return acc;
  }, {});

  return Object.entries(sourceDataMap).reduce((acc, [name, links]) => {
    acc.push({ name, links: Array.from(links) });

    return acc;
  }, []);
};

export default generateSourceData;
