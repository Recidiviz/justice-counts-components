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
import isDifferentPercentageCovered from "../isDifferentPercentageCovered";

describe("isDifferentPercentageCovered.js", () => {
  const mockPopulationData = {
    countyCoverage: 9.245,
    populationCoverage: 25.5678,
  };
  const mockIncarcerationRateData = {
    countyCoverage: 19.098,
    populationCoverage: 45.9876,
  };

  it("should return true if data is too stale", () => {
    expect(isDifferentPercentageCovered(mockPopulationData, mockIncarcerationRateData)).toBe(
      "This value covers 9 percent of counties, representing about 26 percent of the state population."
    );
  });
});
