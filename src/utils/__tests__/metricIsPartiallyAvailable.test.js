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
import metricIsPartiallyAvailable from "../metricIsPartiallyAvailable";

describe("metricIsPartiallyAvailable.js", () => {
  const mockMetric1 = {
    year: 2019,
    month: 2,
  };
  const mockStateName = "Colorado";
  const isAnnual = true;
  const isNotAnnual = false;

  it("should return hint if metric is partially available in monthly range", () => {
    expect(metricIsPartiallyAvailable(mockMetric1, mockStateName, isAnnual)).toBe(
      "Annual data is not available from Colorado; however, monthly data is available (as of March 2019)."
    );
  });

  it("should return hint if metric is partially available in annual range", () => {
    expect(metricIsPartiallyAvailable(mockMetric1, mockStateName, isNotAnnual)).toBe(
      "Monthly data is not available from Colorado; however, annual data is available (as of March 2019)."
    );
  });
});
