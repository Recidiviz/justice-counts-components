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
import metricIsRestricted from "../metricIsRestricted";

describe("metricIsRestricted.js", () => {
  const mockMetric1 = {
    year: 2019,
    month: 2,
  };
  const mockMetric2 = {
    year: 2020,
    month: 2,
  };

  it("should return hint if metric is artificially restricted", () => {
    expect(metricIsRestricted(mockMetric1, mockMetric2)).toBe(
      "Data is restricted to older reports in order to match the other reports shown; however, more recent data is available (as of March 2020)."
    );
  });
});
