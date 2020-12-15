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
import generateChartData, { NO_HUMANIZED_VALUE, NO_METRIC_DATA } from "../generateChartData";
import {
  ADMISSIONS,
  metricToChartName,
  POPULATION_PAROLE,
  POPULATION_PRISON,
  RELEASES,
} from "../../constants/metrics";
import { METRICS_NOT_PROVIDED } from "../../constants/errors";
import logger from "../logger";

describe("generateChartData.js", () => {
  const warnSpy = jest.spyOn(logger, "warn");

  describe("should work with single metric", () => {
    const mockStateData = {
      [RELEASES]: [
        { year: 2020, month: 8, value: 1002 },
        { year: 2020, month: 9, value: 1001 },
        { year: 2020, month: 10, value: 1000 },
      ],
    };

    it("should convert data to chart.js format ", () => {
      expect(generateChartData(mockStateData, [RELEASES])).toStrictEqual({
        datasets: [
          {
            metric: RELEASES,
            label: metricToChartName[RELEASES],
            data: [1002, 1001, 1000],
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
        [RELEASES]: [
          { year: 2020, month: 8, value: 1002 },
          { year: 2020, month: 9, value: 1001 },
          { year: 2020, month: 10, value: 1000 },
        ],
        [ADMISSIONS]: [
          { year: 2020, month: 7, value: 705 },
          { year: 2020, month: 8, value: 700 },
          { year: 2020, month: 9, value: 703 },
        ],
      };

      expect(generateChartData(mockStateData, [RELEASES, ADMISSIONS])).toStrictEqual({
        datasets: [
          {
            metric: RELEASES,
            label: metricToChartName[RELEASES],
            data: [null, 1002, 1001, 1000],
          },
          {
            metric: ADMISSIONS,
            label: metricToChartName[ADMISSIONS],
            data: [705, 700, 703, null],
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

      expect(
        generateChartData(mockStateData, [POPULATION_PAROLE, POPULATION_PRISON])
      ).toStrictEqual({
        datasets: [
          {
            metric: POPULATION_PAROLE,
            label: metricToChartName[POPULATION_PAROLE],
            data: [1002, null, null, null, null, null, null, 1001, 1000],
          },
          {
            metric: POPULATION_PRISON,
            label: metricToChartName[POPULATION_PRISON],
            data: [null, 705, null, null, null, null, 700, 703, null],
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
        [RELEASES]: [
          { year: 2020, month: 8, value: 1002 },
          { year: 2020, month: 9, value: 1001 },
          { year: 2020, month: 10, value: 1000 },
        ],
      };

      expect(() => generateChartData(mockStateData, [])).toThrowError(METRICS_NOT_PROVIDED);
    });
  });

  it("should throw warning if metric data is not provided", () => {
    const metricName = "some metric";
    const mockStateData = {
      [metricName]: [{ year: 2020, month: 8, value: 1002 }],
    };
    generateChartData(mockStateData, [metricName]);

    expect(warnSpy).toBeCalledWith(NO_HUMANIZED_VALUE(metricName));
  });

  it("should throw warning if metric data is not provided", () => {
    const metricName = "some metric";
    const mockStateData = {
      anotherMetric: [{ year: 2020, month: 8, value: 1002 }],
    };
    generateChartData(mockStateData, [metricName]);

    expect(warnSpy).toBeCalledWith(NO_METRIC_DATA(metricName));
  });
});
