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
import getLastUpdatedDate from "../getLastUpdatedDate";

describe("getLastUpdatedDate.js", () => {
  const mockData = {
    metric1: [
      {
        datePublished: { month: 10, day: 11, year: 2020 },
      },
      {
        datePublished: { month: 11, day: 11, year: 2020 },
      },
    ],
    metric2: [
      {
        datePublished: { month: 7, day: 11, year: 2021 },
      },
      {
        datePublished: { month: 8, day: 11, year: 2021 },
      },
    ],
    metric3: [
      {
        datePublished: { month: 11, day: 10, year: 2018 },
      },
    ],
  };

  it("should return latest & processed published date", () => {
    expect(getLastUpdatedDate(mockData)).toBe("September 11, 2021");
  });
});
