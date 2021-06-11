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
import sortByYearAndMonth from "../sortByYearAndMonth";

describe("sortByYearAndMonth.js", () => {
  const mockData = [
    {
      year: 2018,
      month: 3,
    },
    {
      year: 2019,
      month: 1,
    },
    {
      year: 2017,
      month: 8,
    },
    {
      year: 2021,
      month: 1,
    },
    {
      year: 2019,
      month: 4,
    },
  ];

  it("should sort data by year and month ascending", () => {
    expect(mockData.sort(sortByYearAndMonth)).toMatchObject([
      {
        year: 2017,
        month: 8,
      },
      {
        year: 2018,
        month: 3,
      },
      {
        year: 2019,
        month: 1,
      },
      {
        year: 2019,
        month: 4,
      },
      {
        year: 2021,
        month: 1,
      },
    ]);
  });
});
