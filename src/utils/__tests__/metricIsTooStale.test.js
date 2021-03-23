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
import metricIsTooStale from "../metricIsTooStale";

describe("metricIsTooStale.js", () => {
  const mockMetric1 = {
    year: 2019,
    month: 2,
  };
  const mockMetric2 = {
    year: 2020,
    month: 2,
  };
  const mockMostRecentYear = 2020;
  const mockMostRecentMonth = 10;

  it("should return true if data is too stale", () => {
    expect(metricIsTooStale(mockMostRecentYear, mockMostRecentMonth, mockMetric1)).toBe(true);
    expect(metricIsTooStale(mockMostRecentYear, mockMostRecentMonth, mockMetric2)).toBe(false);
  });
});
