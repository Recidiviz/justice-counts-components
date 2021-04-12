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
import {
  ADMISSIONS_FROM_PAROLE,
  ADMISSIONS_FROM_PAROLE_TECHNICAL,
  ADMISSIONS_FROM_PROBATION,
  ADMISSIONS_FROM_PROBATION_TECHNICAL,
  POPULATION_PRISON,
} from "../constants/metrics";

const generateRevocationsCaption = (source) => (percentChange, numberChange) => {
  if (numberChange === 0) {
    return `There was no net change in number of people revoked from ${source} to prison during this time period.`;
  }

  if (numberChange === null) {
    return `There is no available net change in number of people revoked from ${source} to prison.`;
  }

  const isPositive = numberChange > 0;

  return `The number of people revoked from ${source} to prison ${
    isPositive ? "rose" : "fell"
  } by ${Math.abs(numberChange)} people, a ${Math.abs(Math.round(percentChange))} percent ${
    isPositive ? "increase" : "decline"
  }.`;
};

const generateTechnicalRevocationsCaption = (source) => (percentChange, numberChange) => {
  if (numberChange === 0) {
    return `There was no net change in revocations to prison for technical violations of ${source} during this time period.`;
  }

  if (numberChange === null) {
    return `There is no available net change in revocations to prison for technical violations of ${source}.`;
  }

  const isPositive = numberChange > 0;

  return `Revocations to prison for technical violations of ${source} ${
    isPositive ? "rose" : "fell"
  } by ${Math.abs(numberChange)} people, a ${Math.abs(Math.round(percentChange))} percent ${
    isPositive ? "increase" : "decline"
  }.`;
};

const getCaptionMap = {
  [POPULATION_PRISON]: (percentChange, numberChange) => {
    if (numberChange === 0) {
      return `There was no net change in prison population during this time period.`;
    }

    if (numberChange === null) {
      return `There is no available net change in prison population.`;
    }

    return `The prison population ${numberChange > 0 ? "rose" : "fell"} ${Math.abs(
      Math.round(percentChange)
    )} percent, ${numberChange > 0 ? "an increase" : "a decline"} of ${Math.abs(
      numberChange
    )} people.`;
  },
  [ADMISSIONS_FROM_PAROLE]: generateRevocationsCaption("parole"),
  [ADMISSIONS_FROM_PROBATION]: generateRevocationsCaption("probation"),
  [ADMISSIONS_FROM_PAROLE_TECHNICAL]: generateTechnicalRevocationsCaption("parole"),
  [ADMISSIONS_FROM_PROBATION_TECHNICAL]: generateTechnicalRevocationsCaption("probation"),
};

const generateKeyInsightsData = (flowData) =>
  [
    POPULATION_PRISON,
    ADMISSIONS_FROM_PAROLE,
    ADMISSIONS_FROM_PROBATION,
    ADMISSIONS_FROM_PAROLE_TECHNICAL,
    ADMISSIONS_FROM_PROBATION_TECHNICAL,
  ]
    .reduce((keyInsights, metric) => {
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
    }, [])
    .slice(0, 3);

export default generateKeyInsightsData;
