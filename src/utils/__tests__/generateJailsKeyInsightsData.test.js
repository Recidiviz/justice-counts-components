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
import generateJailsKeyInsightsData from "../generateJailsKeyInsightsData";
import {
  POPULATION_JAIL,
  PERCENTAGE_COVERED_COUNTY,
  INCARCERATION_RATE_JAIL,
} from "../../constants/metrics";

describe("generateJailsKeyInsightsData.js", () => {
  const mockData = {
    [INCARCERATION_RATE_JAIL]: [
      {
        value: 95,
        percentChange: 0.18,
        year: 2019,
        month: 11,
        comparedToYear: 2019,
        comparedToMonth: 11,
      },
    ],
    [PERCENTAGE_COVERED_COUNTY]: [
      {
        value: 0.1,
        percentChange: 0.15,
        year: 2020,
        month: 1,
        comparedToYear: 2019,
        comparedToMonth: 1,
      },
    ],
    [POPULATION_JAIL]: [
      {
        value: 100,
        percentChange: 0.1,
        year: 2020,
        month: 1,
        comparedToYear: 2019,
        comparedToMonth: 1,
      },
    ],
  };

  const { jailsKeyInsightsData } = generateJailsKeyInsightsData(mockData);

  it("should put isNumberPercent flag if metric value less than 1", () => {
    expect(jailsKeyInsightsData[1].isNumberPercent).toBe(true);
  });

  it("should produce card data", () => {
    expect(jailsKeyInsightsData[0]).toMatchObject({
      number: 95,
      percentChange: 18,
    });
    expect(jailsKeyInsightsData[1]).toMatchObject({
      number: 10,
      percentChange: 15,
    });
    expect(jailsKeyInsightsData[2]).toMatchObject({
      number: 100,
      percentChange: 10,
    });
  });
});
