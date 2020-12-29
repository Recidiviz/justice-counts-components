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
import generateHint from "../generateHint";

describe("generateHint.js", () => {
  const mockMetricName = "RELEASES";

  it("should return null if the date is most recent and is compared to exactly one year before", () => {
    expect(
      generateHint(2020, 2, {
        metric: mockMetricName,
        year: 2020,
        month: 2,
        comparedToYear: 2019,
        comparedToMonth: 2,
        dateReported: new Date(),
      })
    ).toBe(null);
  });

  it("should return hint if the date is not most recent", () => {
    expect(
      generateHint(2020, 8, {
        metric: mockMetricName,
        year: 2020,
        month: 7,
        comparedToYear: 2019,
        comparedToMonth: 7,
        dateReported: new Date(2020, 8, 30),
      })
    ).toBe(
      "Releases to Parole was last reported on September 30, 2020 (% change relative to August 2019)."
    );
  });

  it("should return hint if compared date is not exactly one year before", () => {
    expect(
      generateHint(2020, 9, {
        metric: mockMetricName,
        year: 2020,
        month: 9,
        comparedToYear: 2019,
        comparedToMonth: 7,
        dateReported: new Date(2020, 9, 30),
      })
    ).toBe(
      "Releases to Parole was last reported on October 30, 2020 (% change relative to August 2019)."
    );
  });
});