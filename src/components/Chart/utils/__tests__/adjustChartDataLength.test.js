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
import adjustChartDataLength from "../adjustChartDataLength";

describe("processToLength.js", () => {
  describe("when data items count less than target count", () => {
    const { labels, datasets } = adjustChartDataLength(
      {
        datasets: [
          { label: "One", data: [null, null, 300] },
          { label: "Two", data: [100, 201, 304] },
        ],
        labels: [
          { year: 2020, month: 7 },
          { year: 2020, month: 8 },
          { year: 2020, month: 9 },
        ],
      },
      5
    );

    it("should fill labels with dates", () => {
      expect(labels).toStrictEqual([
        { year: 2020, month: 5 },
        { year: 2020, month: 6 },
        { year: 2020, month: 7 },
        { year: 2020, month: 8 },
        { year: 2020, month: 9 },
      ]);
    });

    it("should fill datasets with nulls", () => {
      expect(datasets).toStrictEqual([
        { label: "One", data: [null, null, null, null, 300] },
        { label: "Two", data: [null, null, 100, 201, 304] },
      ]);
    });
  });

  describe("when data items count more than target count", () => {
    const { labels, datasets } = adjustChartDataLength(
      {
        datasets: [
          { label: "One", data: [100, null, null, 300] },
          { label: "Two", data: [44, 100, 201, 304] },
        ],
        labels: [
          { year: 2020, month: 6 },
          { year: 2020, month: 7 },
          { year: 2020, month: 8 },
          { year: 2020, month: 9 },
        ],
      },
      2
    );

    it("should cut labels (the most recent should stay)", () => {
      expect(labels).toStrictEqual([
        { year: 2020, month: 8 },
        { year: 2020, month: 9 },
      ]);
    });

    it("should cut datasets", () => {
      expect(datasets).toStrictEqual([
        { label: "One", data: [null, 300] },
        { label: "Two", data: [201, 304] },
      ]);
    });
  });
});
