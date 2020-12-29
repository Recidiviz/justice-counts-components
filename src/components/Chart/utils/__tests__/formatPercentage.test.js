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
import formatPercentage from "../formatPercentage";

describe("calcPercentage.js", () => {
  it("should calculate percentage from chart dataset", () => {
    expect(formatPercentage([100, null, 95, 120, 75, 80, 155])).toBe("+55%");
    expect(formatPercentage([100, 95, 90, 80, 75, 70])).toBe("-30%");
  });
});