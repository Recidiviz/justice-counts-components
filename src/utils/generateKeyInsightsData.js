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
  ADMISSIONS_REVOCATIONS_PAROLE,
  ADMISSIONS_REVOCATIONS_PROBATION,
  POPULATION_PRISON,
} from "../constants/metrics";

const generateKeyInsightsData = (flowData) => {
  const keyInsights = [];

  if (!flowData[POPULATION_PRISON].isNotAvailable) {
    const isPositive = flowData[POPULATION_PRISON].numberChange > 0;

    keyInsights.push({
      ...flowData[POPULATION_PRISON],
      caption: `The prison population ${isPositive ? "rose" : "fell"} ${Math.abs(
        flowData[POPULATION_PRISON].percent
      )}, ${isPositive ? "an increase" : "a decline"} of ${Math.abs(
        flowData[POPULATION_PRISON].numberChange
      )} people.`,
    });
  }

  if (!flowData[ADMISSIONS_REVOCATIONS_PAROLE].isNotAvailable) {
    const isPositive = flowData[ADMISSIONS_REVOCATIONS_PAROLE].numberChange > 0;

    keyInsights.push({
      ...flowData[ADMISSIONS_REVOCATIONS_PAROLE],
      caption: `The number of people revoked from parole to prison ${
        isPositive ? "rose" : "fell"
      } by ${Math.abs(flowData[ADMISSIONS_REVOCATIONS_PAROLE].numberChange)} people, a ${Math.abs(
        flowData[ADMISSIONS_REVOCATIONS_PAROLE].percent
      )} percent ${isPositive ? "increase" : "decline"}.`,
    });
  }

  if (!flowData[ADMISSIONS_REVOCATIONS_PROBATION].isNotAvailable) {
    const isPositive = flowData[ADMISSIONS_REVOCATIONS_PROBATION].numberChange > 0;

    keyInsights.push({
      ...flowData[ADMISSIONS_REVOCATIONS_PROBATION],
      caption: `The number of people revoked from probation to prison ${
        isPositive ? "rose" : "fell"
      } by ${Math.abs(
        flowData[ADMISSIONS_REVOCATIONS_PROBATION].numberChange
      )} people, a ${Math.abs(flowData[ADMISSIONS_REVOCATIONS_PROBATION].percent)} percent ${
        isPositive ? "increase" : "decline"
      }.`,
    });
  }

  return keyInsights;
};

export default generateKeyInsightsData;
