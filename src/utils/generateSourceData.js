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
import { merge } from "merge";

/**
 * Generates source links array from flowData.
 * @param flowData - data used for flowData render
 * @param chartSourceData - prepared source data from charts
 * @returns {{
 *   name: string
 *   links: {
 *     name: string
 *     src: string
 *   }[]
 * }[]}
 */
const generateSourceData = (flowData, chartSourceData) => {
  const flowDiagramSourceDataMap = Object.values(flowData).reduce(
    (acc, { isNotAvailable, item }) => {
      if (isNotAvailable) {
        return acc;
      }

      if (!acc[item.sourceName]) {
        acc[item.sourceName] = { [item.sourceUrl]: item.reportName };
      } else {
        acc[item.sourceName][item.sourceUrl] = item.reportName;
      }

      return acc;
    },
    {}
  );

  const sourceDataMap = merge(flowDiagramSourceDataMap, ...chartSourceData);

  return Object.entries(sourceDataMap).reduce((acc, [sourceName, links]) => {
    acc.push({
      name: sourceName,
      links: Object.entries(links).map(([linkSrc, linkName]) => ({
        name: linkName,
        src: linkSrc,
      })),
    });

    return acc;
  }, []);
};

export default generateSourceData;
