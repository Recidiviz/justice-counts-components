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
  const mockMetricName = "RELEASES_TO_PAROLE";

  it("should return null if the date is most recent and is compared to exactly one year before", () => {
    expect(
      generateHint(2020, 2, {
        metric: mockMetricName,
        year: 2020,
        month: 2,
        comparedToYear: 2019,
        comparedToMonth: 2,
        dateReported: { year: 2020, month: 3, day: 30 },
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
        dateReported: { year: 2020, month: 8, day: 30 },
      })
    ).toBe(
      "This icon indicates that the dates that correspond with this metric are not aligned with the primary date range (August 2019 --> September 2020)."
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
        dateReported: { year: 2020, month: 9, day: 30 },
      })
    ).toBe(
      "This icon indicates that the dates that correspond with this metric are not aligned with the primary date range (August 2019 --> October 2020)."
    );
  });

  it("should return hint if compared date is not exactly one year before and month is zero", () => {
    expect(
      generateHint(2020, 9, {
        metric: mockMetricName,
        year: 2020,
        month: 9,
        comparedToYear: 2019,
        comparedToMonth: 0,
        dateReported: { year: 2020, month: 9, day: 30 },
      })
    ).toBe(
      "This icon indicates that the dates that correspond with this metric are not aligned with the primary date range (January 2019 --> October 2020)."
    );
  });

  it("should return null if compared date is null", () => {
    expect(
      generateHint(2020, 9, {
        metric: mockMetricName,
        year: 2020,
        month: 9,
        comparedToYear: null,
        comparedToMonth: null,
        dateReported: { year: 2020, month: 9, day: 30 },
      })
    ).toBe(null);
  });
});
