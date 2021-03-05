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
import generateJailsChartData, { noMetricData } from "../generateJailsChartData";
import { INCARCERATION_RATE_JAIL } from "../../constants/metrics";
import { COUNTIES_NOT_PROVIDED } from "../../constants/errors";
import logger from "../logger";

describe("generateJailsChartData.js", () => {
  const warnSpy = jest.spyOn(logger, "warn");

  const mockCountyCodes = ["US_CO_DENVER", "US_CO_ARAPAHOE"];
  const mockCountyNames = ["Denver county", "Arapahoe county"];

  describe("should work with single metric & single county", () => {
    const mockJailsData = {
      [INCARCERATION_RATE_JAIL]: [
        { year: 2020, month: 9, value: 102, countyCode: mockCountyCodes[0] },
        { year: 2020, month: 10, value: 104, countyCode: mockCountyCodes[0] },
      ],
    };

    it("should convert data to chart.js format ", () => {
      expect(
        generateJailsChartData(
          mockJailsData,
          INCARCERATION_RATE_JAIL,
          [mockCountyCodes[0]],
          [mockCountyNames[0]]
        )
      ).toMatchObject({
        datasets: [
          {
            metric: INCARCERATION_RATE_JAIL,
            county: mockCountyCodes[0],
            label: mockCountyNames[0],
            data: [102, 104],
            isNotAvailable: false,
          },
        ],
        labels: [
          { year: 2020, month: 9 },
          { year: 2020, month: 10 },
        ],
      });
    });
  });

  describe("should work with multiple counties", () => {
    it(`should generate data starting from the earliest date, ending on the
     most recent filling the gaps with nulls`, () => {
      const mockJailsData = {
        [INCARCERATION_RATE_JAIL]: [
          { year: 2020, month: 8, value: 102, countyCode: mockCountyCodes[0] },
          { year: 2020, month: 9, value: 103, countyCode: mockCountyCodes[1] },
          { year: 2020, month: 10, value: 104, countyCode: mockCountyCodes[0] },
        ],
      };

      expect(
        generateJailsChartData(
          mockJailsData,
          INCARCERATION_RATE_JAIL,
          mockCountyCodes,
          mockCountyNames
        )
      ).toMatchObject({
        datasets: [
          {
            metric: INCARCERATION_RATE_JAIL,
            county: mockCountyCodes[0],
            label: mockCountyNames[0],
            data: [102, null, 104],
            isNotAvailable: false,
          },
          {
            metric: INCARCERATION_RATE_JAIL,
            county: mockCountyCodes[1],
            label: mockCountyNames[1],
            data: [null, 103, null],
            isNotAvailable: false,
          },
        ],
        labels: [
          { year: 2020, month: 8 },
          { year: 2020, month: 9 },
          { year: 2020, month: 10 },
        ],
      });
    });

    it("should work with different dates", () => {
      const mockJailsData = {
        [INCARCERATION_RATE_JAIL]: [
          { year: 2019, month: 9, value: 105, countyCode: mockCountyCodes[1] },
          { year: 2019, month: 10, value: 106, countyCode: mockCountyCodes[0] },
          { year: 2020, month: 1, value: 107, countyCode: mockCountyCodes[1] },
          { year: 2020, month: 2, value: 102, countyCode: mockCountyCodes[0] },
          { year: 2020, month: 3, value: 103, countyCode: mockCountyCodes[1] },
          { year: 2020, month: 4, value: 104, countyCode: mockCountyCodes[0] },
        ],
      };

      expect(
        generateJailsChartData(
          mockJailsData,
          INCARCERATION_RATE_JAIL,
          mockCountyCodes,
          mockCountyNames
        )
      ).toMatchObject({
        datasets: [
          {
            metric: INCARCERATION_RATE_JAIL,
            county: mockCountyCodes[0],
            label: mockCountyNames[0],
            data: [null, 106, null, null, null, 102, null, 104],
            isNotAvailable: false,
          },
          {
            metric: INCARCERATION_RATE_JAIL,
            county: mockCountyCodes[1],
            label: mockCountyNames[1],
            data: [105, null, null, null, 107, null, 103, null],
            isNotAvailable: false,
          },
        ],
        labels: [
          { year: 2019, month: 9 },
          { year: 2019, month: 10 },
          { year: 2019, month: 11 },
          { year: 2020, month: 0 },
          { year: 2020, month: 1 },
          { year: 2020, month: 2 },
          { year: 2020, month: 3 },
          { year: 2020, month: 4 },
        ],
      });
    });
  });

  describe("should work with additional data", () => {
    const mockJailsData = {
      [INCARCERATION_RATE_JAIL]: [
        { year: 2020, month: 8, value: 102 },
        { year: 2020, month: 9, value: 103 },
        { year: 2020, month: 10, value: 104 },
      ],
    };
    const mockStatewide = "Statewide";
    const mockCountyCoverage = 10;

    it("should put isStatewide flag if county set as Statewide", () => {
      expect(
        generateJailsChartData(
          mockJailsData,
          INCARCERATION_RATE_JAIL,
          [mockStatewide],
          [mockStatewide]
        )
      ).toMatchObject({
        datasets: [
          {
            metric: INCARCERATION_RATE_JAIL,
            county: mockStatewide,
            label: mockStatewide,
            data: [102, 103, 104],
            isNotAvailable: false,
            isStatewide: true,
          },
        ],
        labels: [
          { year: 2020, month: 8 },
          { year: 2020, month: 9 },
          { year: 2020, month: 10 },
        ],
      });
    });

    it("should put countyCoverage caption if countyCoverage value is provided", () => {
      expect(
        generateJailsChartData(
          mockJailsData,
          INCARCERATION_RATE_JAIL,
          [mockStatewide],
          [mockStatewide],
          mockCountyCoverage
        )
      ).toMatchObject({
        datasets: [
          {
            metric: INCARCERATION_RATE_JAIL,
            county: mockStatewide,
            label: mockStatewide,
            data: [102, 103, 104],
            isNotAvailable: false,
            isStatewide: true,
            countyCoverage: `(${mockCountyCoverage}% counties reporting)`,
          },
        ],
        labels: [
          { year: 2020, month: 8 },
          { year: 2020, month: 9 },
          { year: 2020, month: 10 },
        ],
      });
    });
  });

  describe("edge cases", () => {
    it("should throw error if counties array is empty", () => {
      const mockStateData = {
        [INCARCERATION_RATE_JAIL]: [
          { year: 2020, month: 8, value: 1002 },
          { year: 2020, month: 9, value: 1001 },
          { year: 2020, month: 10, value: 1000 },
        ],
      };

      expect(() => generateJailsChartData(mockStateData, INCARCERATION_RATE_JAIL, [])).toThrowError(
        COUNTIES_NOT_PROVIDED
      );
    });
  });

  it("should throw warning if metric data is not provided", () => {
    const metricName = "INCARCERATION_RATE_JAIL";
    const anotherMetric = "INCARCERATION_RATE_NOVALID";
    const mockStateData = {
      [anotherMetric]: [{ year: 2020, month: 8, value: 1002 }],
    };
    expect(
      generateJailsChartData(mockStateData, metricName, [mockCountyCodes[0]], [mockCountyNames[0]])
    ).toMatchObject({
      datasets: [
        {
          metric: metricName,
          label: mockCountyNames[0],
          isNotAvailable: true,
          data: [],
        },
      ],
      labels: [],
    });

    expect(warnSpy).toBeCalledWith(noMetricData(metricName));
  });
});
