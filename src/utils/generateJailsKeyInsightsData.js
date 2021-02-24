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
import {
  POPULATION_JAIL,
  PERCENTAGE_COVERED_COUNTY,
  PERCENTAGE_COVERED_POPULATION,
  INCARCERATION_RATE_JAIL,
  metricToCardName,
} from "../constants/metrics";

/**
 * @param data - normalized, grouped and sorted metric data (output of `getNormalizedStateData`)
 * @returns {{
 * flowData: {
 * [metric]: {
 *   title: string
 *   number?: number
 *   countyCode?: string
 *   percentChange?: number
 *   numberChange?: number
 *   isNotAvailable?: boolean
 * }
 * },
 * }}
 */

const generateCountiesCaption = () => (number) => {
  return `Currently, about ${number} percent of counties report their jail populations on at least a monthly basis, representing about YY percent of the state population.`;
};

const generatePopulationCaption = () => (percentChange, numberChange) => {
  if (numberChange === 0) {
    return `There was no net change in jail population during this time period.`;
  }

  return `The jail population ${numberChange > 0 ? "rose" : "fell"} by ${Math.abs(
    Math.round(percentChange)
  )} percent in the past year, a ${numberChange > 0 ? "increase" : "decline"} of ${Math.abs(
    numberChange
  )} people.`;
};

const generateIncarcerationCaption = () => (percentChange, numberChange) => {
  if (numberChange === 0) {
    return `There was no net change in incarceration rate during this time period.`;
  }

  return `The incarceration rate for those in jail ${
    numberChange > 0 ? "rose" : "fell"
  } by ${Math.abs(Math.round(percentChange))} percent in the past year.`;
};

const getCaptionMap = {
  [INCARCERATION_RATE_JAIL]: generateIncarcerationCaption(),
  [PERCENTAGE_COVERED_COUNTY]: generateCountiesCaption(),
  [POPULATION_JAIL]: generatePopulationCaption(),
};

const generateJailsKeyInsightsData = (data) => {
  const { flowData } = [
    POPULATION_JAIL,
    PERCENTAGE_COVERED_COUNTY,
    PERCENTAGE_COVERED_POPULATION,
    INCARCERATION_RATE_JAIL,
  ].reduce(
    (acc, metric) => {
      if (!data[metric]) {
        acc.flowData[metric] = {
          title: metricToCardName[metric],
          isNotAvailable: true,
        };
      } else {
        const generalData = data[metric].filter((item) => item.countyCode === undefined);
        const lastItem = generalData[generalData.length - 1];
        acc.flowData[metric] = {
          title: metricToCardName[metric],
          number: metric === PERCENTAGE_COVERED_COUNTY ? lastItem.value * 100 : lastItem.value,
          percentChange: lastItem.percentChange * 100,
          numberChange: lastItem.valueChange,
          item: lastItem,
        };
      }

      return acc;
    },
    { flowData: {} }
  );

  return [INCARCERATION_RATE_JAIL, PERCENTAGE_COVERED_COUNTY, POPULATION_JAIL].reduce(
    (keyInsights, metric) => {
      if (!flowData[metric].isNotAvailable) {
        keyInsights.push({
          ...flowData[metric],
          caption: getCaptionMap[metric](
            flowData[metric].percentChange,
            flowData[metric].numberChange
          ),
        });
      }

      return keyInsights;
    },
    []
  );
};

export default generateJailsKeyInsightsData;
