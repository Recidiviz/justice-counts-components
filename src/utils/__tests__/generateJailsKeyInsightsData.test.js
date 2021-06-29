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
  describe("should work with different months", () => {
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

  describe("should limit based on incarceration rate", () => {
    const mockData = {
      [INCARCERATION_RATE_JAIL]: [
        // Low coverage - Previous year
        {
          year: 2020,
          month: 2,
          value: 95,
          countyCoverage: 0.04,
          populationCoverage: 0.04,
          percentChange: 0.18,
          comparedToYear: 2020,
          comparedToMonth: 2,
        },
        // High coverage
        {
          year: 2021,
          month: 2,
          value: 100,
          countyCoverage: 0.4,
          populationCoverage: 0.4,
          percentChange: 0.18,
          comparedToYear: 2020,
          comparedToMonth: 2,
        },
        // Low coverage - Most recent month
        {
          year: 2021,
          month: 3,
          value: 105,
          countyCoverage: 0.07,
          populationCoverage: 0.07,
          percentChange: 0.18,
          comparedToYear: 2020,
          comparedToMonth: 3,
        },
      ],
      [PERCENTAGE_COVERED_COUNTY]: [
        {
          year: 2021,
          month: 2,
          value: 0.4,
          percentChange: 0.15,
          comparedToYear: 2019,
          comparedToMonth: 1,
        },
        {
          year: 2021,
          month: 3,
          value: 0.07,
          percentChange: 0.15,
          comparedToYear: 2019,
          comparedToMonth: 1,
        },
      ],
      [POPULATION_JAIL]: [
        {
          year: 2021,
          month: 2,
          value: 1800,
          percentChange: 0.1,
          comparedToYear: 2019,
          comparedToMonth: 1,
        },
        {
          year: 2021,
          month: 3,
          value: 100,
          percentChange: 0.1,
          comparedToYear: 2019,
          comparedToMonth: 1,
        },
      ],
    };

    const { jailsKeyInsightsData } = generateJailsKeyInsightsData(mockData);

    it("should produce card data", () => {
      expect(jailsKeyInsightsData.length).toBe(3);
    });

    it("produced data should be correct", () => {
      expect(jailsKeyInsightsData[0]).toMatchObject({
        title: "Jail Confinement Rate (per 100k)",
        number: 100,
        isNumberPercent: false,
        mostRecentDate: "March 2021",
      });
      expect(jailsKeyInsightsData[1]).toMatchObject({
        title: "Counties Represented",
        number: 40,
        isNumberPercent: true,
        mostRecentDate: "March 2021",
      });
      expect(jailsKeyInsightsData[2]).toMatchObject({
        title: "Jail Population (counties represented only)",
        number: 1800,
        isNumberPercent: false,
        mostRecentDate: "March 2021",
      });
    });
  });

  describe("should limit based on incarceration rate of correct month", () => {
    const mockData = {
      [INCARCERATION_RATE_JAIL]: [
        // High coverage
        {
          year: 2021,
          month: 1,
          value: 105,
          countyCoverage: 0.5,
          populationCoverage: 0.5,
          percentChange: 0.18,
          comparedToYear: 2020,
          comparedToMonth: 1,
        },
        // Low coverage - prior year
        {
          year: 2021,
          month: 1,
          value: 95,
          countyCode: "US_XX_FOO",
          countyCoverage: 0.05,
          populationCoverage: 0.05,
          percentChange: 0.18,
          comparedToYear: 2020,
          comparedToMonth: 1,
        },
      ],
      [PERCENTAGE_COVERED_COUNTY]: [
        {
          year: 2021,
          month: 1,
          value: 0.5,
          percentChange: 0.15,
          comparedToYear: 2019,
          comparedToMonth: 1,
        },
      ],
      [POPULATION_JAIL]: [
        {
          year: 2021,
          month: 1,
          value: 2000,
          percentChange: 0.1,
          comparedToYear: 2019,
          comparedToMonth: 1,
        },
      ],
    };

    const { jailsKeyInsightsData } = generateJailsKeyInsightsData(mockData);

    it("should produce card data", () => {
      expect(jailsKeyInsightsData.length).toBe(3);
    });

    it("produced data should be correct", () => {
      expect(jailsKeyInsightsData[0]).toMatchObject({
        title: "Jail Confinement Rate (per 100k)",
        number: 105,
        isNumberPercent: false,
        mostRecentDate: "February 2021",
      });
      expect(jailsKeyInsightsData[1]).toMatchObject({
        title: "Counties Represented",
        number: 50,
        isNumberPercent: true,
        mostRecentDate: "February 2021",
      });
      expect(jailsKeyInsightsData[2]).toMatchObject({
        title: "Jail Population (counties represented only)",
        number: 2000,
        isNumberPercent: false,
        mostRecentDate: "February 2021",
      });
    });
  });
});
