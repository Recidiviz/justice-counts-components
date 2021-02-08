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
import generateChartData, { noMetricData } from "../generateChartData";
import {
  ADMISSIONS_NEW_COMMITMENTS,
  POPULATION_PAROLE,
  POPULATION_PRISON,
  RELEASES_COMPLETED,
} from "../../constants/metrics";
import { METRICS_NOT_PROVIDED } from "../../constants/errors";
import logger from "../logger";

describe("generateChartData.js", () => {
  const warnSpy = jest.spyOn(logger, "warn");

  describe("should work with single metric", () => {
    const mockStateData = {
      [RELEASES_COMPLETED]: [
        { year: 2020, month: 8, value: 1002 },
        { year: 2020, month: 9, value: 1001 },
        { year: 2020, month: 10, value: 1000 },
      ],
    };
    const mockMetricName = "Releases";

    it("should convert data to chart.js format ", () => {
      expect(
        generateChartData(mockStateData, [RELEASES_COMPLETED], [mockMetricName])
      ).toMatchObject({
        datasets: [
          {
            metric: RELEASES_COMPLETED,
            label: mockMetricName,
            data: [1002, 1001, 1000],
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
  });

  describe("should work with multiple metrics", () => {
    it(`should generate data starting from the earliest date, ending on the
     most recent filling the gaps with nulls`, () => {
      const mockStateData = {
        [RELEASES_COMPLETED]: [
          { year: 2020, month: 8, value: 1002 },
          { year: 2020, month: 9, value: 1001 },
          { year: 2020, month: 10, value: 1000 },
        ],
        [ADMISSIONS_NEW_COMMITMENTS]: [
          { year: 2020, month: 7, value: 705 },
          { year: 2020, month: 8, value: 700 },
          { year: 2020, month: 9, value: 703 },
        ],
      };
      const mockMetric1Name = "Releases";
      const mockMetric2Name = "Admissions";

      expect(
        generateChartData(
          mockStateData,
          [RELEASES_COMPLETED, ADMISSIONS_NEW_COMMITMENTS],
          [mockMetric1Name, mockMetric2Name]
        )
      ).toMatchObject({
        datasets: [
          {
            metric: RELEASES_COMPLETED,
            label: mockMetric1Name,
            data: [null, 1002, 1001, 1000],
            isNotAvailable: false,
          },
          {
            metric: ADMISSIONS_NEW_COMMITMENTS,
            label: mockMetric2Name,
            data: [705, 700, 703, null],
            isNotAvailable: false,
          },
        ],
        labels: [
          { year: 2020, month: 7 },
          { year: 2020, month: 8 },
          { year: 2020, month: 9 },
          { year: 2020, month: 10 },
        ],
      });
    });

    it("should work with different dates", () => {
      const mockStateData = {
        [POPULATION_PAROLE]: [
          { year: 2019, month: 7, value: 1002 },
          { year: 2020, month: 2, value: 1001 },
          { year: 2020, month: 3, value: 1000 },
        ],
        [POPULATION_PRISON]: [
          { year: 2019, month: 8, value: 705 },
          { year: 2020, month: 1, value: 700 },
          { year: 2020, month: 2, value: 703 },
        ],
      };
      const mockMetric1Name = "Population parole";
      const mockMetric2Name = "Population prison";

      expect(
        generateChartData(
          mockStateData,
          [POPULATION_PAROLE, POPULATION_PRISON],
          [mockMetric1Name, mockMetric2Name]
        )
      ).toMatchObject({
        datasets: [
          {
            metric: POPULATION_PAROLE,
            label: mockMetric1Name,
            data: [1002, null, null, null, null, null, null, 1001, 1000],
            isNotAvailable: false,
          },
          {
            metric: POPULATION_PRISON,
            label: mockMetric2Name,
            data: [null, 705, null, null, null, null, 700, 703, null],
            isNotAvailable: false,
          },
        ],
        labels: [
          { year: 2019, month: 7 },
          { year: 2019, month: 8 },
          { year: 2019, month: 9 },
          { year: 2019, month: 10 },
          { year: 2019, month: 11 },
          { year: 2020, month: 0 },
          { year: 2020, month: 1 },
          { year: 2020, month: 2 },
          { year: 2020, month: 3 },
        ],
      });
    });
  });

  describe("edge cases", () => {
    it("should throw error if metric array is empty", () => {
      const mockStateData = {
        [RELEASES_COMPLETED]: [
          { year: 2020, month: 8, value: 1002 },
          { year: 2020, month: 9, value: 1001 },
          { year: 2020, month: 10, value: 1000 },
        ],
      };

      expect(() => generateChartData(mockStateData, [])).toThrowError(METRICS_NOT_PROVIDED);
    });
  });

  it("should throw warning if metric data is not provided", () => {
    const mockMetricLabel = "Population parole";
    const metricName = "POPULATION_PAROLE";
    const mockStateData = {
      anotherMetric: [{ year: 2020, month: 8, value: 1002 }],
    };
    expect(generateChartData(mockStateData, [metricName], [mockMetricLabel])).toMatchObject({
      datasets: [
        {
          metric: metricName,
          label: mockMetricLabel,
          isNotAvailable: true,
          data: [],
        },
      ],
      labels: [],
    });

    expect(warnSpy).toBeCalledWith(noMetricData(metricName));
  });
});
