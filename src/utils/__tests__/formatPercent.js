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
import formatPercent from "../formatPercent";

describe("formatPercent.js", () => {
  it("should return positive change string in active voice", () => {
    expect(formatPercent(12.23)).toBe("a 12 percent increase");
    expect(formatPercent(0.49)).toBe("a ~0 percent increase");
  });

  it("should return negative change string in active voice", () => {
    expect(formatPercent(-12.51)).toBe("a 13 percent decline");
    expect(formatPercent(-0.49)).toBe("a ~0 percent decline");
  });
  it("should return positive change string in passive voice", () => {
    expect(formatPercent(12.4, true)).toBe("increased 12 percent");
    expect(formatPercent(101.01, true)).toBe("increased 101 percent");
  });

  it("should return negative change string in passive voice", () => {
    expect(formatPercent(-12.23, true)).toBe("declined 12 percent");
    expect(formatPercent(-1.0001, true)).toBe("declined 1 percent");
  });
});
