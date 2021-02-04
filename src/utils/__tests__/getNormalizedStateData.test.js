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

import getNormalizedStateData from "../getNormalizedStateData";

describe("getNormalizedStateData.test.js", () => {
  const mockMetric1 = "Releases";
  const mockMetric2 = "Admissions";
  const mockMetric3 = "Revocations";
  const mockStateCode1 = "US_CO";
  const mockStateCode2 = "US_MO";

  it("should filter by chosen state", () => {
    const normalizedStateData = getNormalizedStateData(
      [
        { state_code: mockStateCode1, metric: mockMetric1 },
        { state_code: mockStateCode1, metric: mockMetric2 },
        { state_code: mockStateCode2, metric: mockMetric1 },
        { state_code: mockStateCode2, metric: mockMetric2 },
        { state_code: mockStateCode2, metric: mockMetric3 },
      ],
      mockStateCode1
    );
    expect(normalizedStateData[mockMetric1].length).toBe(1);
    expect(normalizedStateData[mockMetric2].length).toBe(1);
    expect(Object.prototype.hasOwnProperty.call(normalizedStateData, mockMetric3)).toBe(false);
  });

  it("should group by metric", () => {
    const normalizedStateData = getNormalizedStateData(
      [
        { state_code: mockStateCode1, metric: mockMetric1, value: 100 },
        { state_code: mockStateCode1, metric: mockMetric2, value: 101 },
        { state_code: mockStateCode1, metric: mockMetric2, value: 105 },
        { state_code: mockStateCode1, metric: mockMetric2, value: 108 },
      ],
      mockStateCode1
    );

    expect(normalizedStateData).toMatchObject({
      [mockMetric1]: [{ metric: mockMetric1, value: 100 }],
      [mockMetric2]: [
        { metric: mockMetric2, value: 101 },
        { metric: mockMetric2, value: 105 },
        { metric: mockMetric2, value: 108 },
      ],
    });
  });

  it("should normalize values", () => {
    const normalizedStateData = getNormalizedStateData(
      [
        {
          state_code: mockStateCode1,
          metric: mockMetric2,
          value: 105,
          year: "2020",
          month: "11",
          date_reported: "2020-11-30",
          compared_to_year: "2019",
          compared_to_month: "11",
          value_change: 0,
          percentage_change: 0,
        },
        {
          state_code: mockStateCode1,
          metric: mockMetric2,
          value: 108,
          year: "2020",
          month: "12",
          date_reported: "2020-11-30",
          compared_to_year: "2019",
          compared_to_month: "12",
          value_change: 10,
          percentage_change: 1,
        },
        {
          state_code: mockStateCode1,
          metric: mockMetric2,
          value: 110,
          year: "2021",
          month: "1",
          date_reported: "2020-11-30",
        },
      ],
      mockStateCode1
    );

    expect(normalizedStateData).toMatchObject({
      [mockMetric2]: [
        {
          metric: mockMetric2,
          value: 105,
          year: 2020,
          month: 10,
          dateReported: new Date("2020-11-30"),
          comparedToYear: 2019,
          comparedToMonth: 10,
          valueChange: 0,
          percentChange: 0,
        },
        {
          metric: mockMetric2,
          value: 108,
          year: 2020,
          month: 11,
          dateReported: new Date("2020-11-30"),
          comparedToYear: 2019,
          comparedToMonth: 11,
          valueChange: 10,
          percentChange: 1,
        },
        {
          metric: mockMetric2,
          value: 110,
          year: 2021,
          month: 0,
          dateReported: new Date("2020-11-30"),
          comparedToYear: null,
          comparedToMonth: null,
          valueChange: null,
          percentChange: null,
        },
      ],
    });
  });

  it("should sort by year and month (ascending)", () => {
    const normalizedStateData = getNormalizedStateData(
      [
        {
          state_code: mockStateCode1,
          metric: mockMetric2,
          value: 105,
          year: "2020",
          month: "10",
          date_reported: "2020-10-30",
        },
        {
          state_code: mockStateCode1,
          metric: mockMetric2,
          value: 108,
          year: "2020",
          month: "11",
          date_reported: "2020-11-30",
        },
        {
          state_code: mockStateCode1,
          metric: mockMetric2,
          value: 110,
          year: "2019",
          month: "11",
          date_reported: "2019-11-30",
        },
        {
          state_code: mockStateCode1,
          metric: mockMetric2,
          value: 110,
          year: "2019",
          month: "1",
          date_reported: "2019-01-30",
        },
      ],
      mockStateCode1
    );

    expect(normalizedStateData).toMatchObject({
      [mockMetric2]: [
        { year: 2019, month: 0 },
        { year: 2019, month: 10 },
        { year: 2020, month: 9 },
        { year: 2020, month: 10 },
      ],
    });
  });
});
