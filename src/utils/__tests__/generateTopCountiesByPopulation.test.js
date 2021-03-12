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

import generateTopCountiesByPopulation from "../generateTopCountiesByPopulation";

describe("generateTopCountiesByPopulation.test.js", () => {
  const mockStateCode = "US_CO";
  const mockData = [
    {
      state_code: "US_CO",
      county_code: "US_CO_MONTROSE",
      name: "Montrose County",
      population: "154210",
    },
    {
      state_code: "US_CO",
      county_code: "US_CO_LARIMER",
      name: "Larimer County",
      population: "154210",
    },
    {
      state_code: "US_CO",
      county_code: "US_CO_JEFFERSON",
      name: "Jefferson County",
      population: "582881",
    },
    {
      state_code: "US_CO",
      county_code: "US_CO_MESA",
      name: "Mesa County",
      population: "154210",
    },
  ];

  it("should sort by population first & alphabet second", () => {
    const topCountiesByPopulation = generateTopCountiesByPopulation(mockData, mockStateCode);

    expect(topCountiesByPopulation).toMatchObject([
      {
        code: "US_CO_JEFFERSON",
        population: 582881,
      },
      {
        code: "US_CO_LARIMER",
        population: 154210,
      },
      {
        code: "US_CO_MESA",
        population: 154210,
      },
      {
        code: "US_CO_MONTROSE",
        population: 154210,
      },
    ]);
  });
});
