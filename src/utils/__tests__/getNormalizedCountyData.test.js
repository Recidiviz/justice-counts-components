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

import getNormalizedCountyData from "../getNormalizedCountyData";

describe("getNormalizedCountyData.test.js", () => {
  const mockCounty1 = "US_CO_DENVER";
  const mockCounty2 = "US_CO_ARAPAHOE";
  const mockCounty3 = "US_CO_ADAMS";
  const mockCountyName = "Mock county";
  const mockCountyName1 = "ZMock county";
  const mockStateCode1 = "US_CO";
  const mockStateCode2 = "US_MO";
  const mockData = [
    {
      state_code: mockStateCode1,
      county_code: mockCounty1,
      population: "87688",
      name: mockCountyName,
    },
    {
      state_code: mockStateCode1,
      county_code: mockCounty2,
      population: "876543",
      name: mockCountyName,
    },
    {
      state_code: mockStateCode1,
      county_code: mockCounty3,
      population: "12345678",
      name: mockCountyName1,
    },
  ];

  it("should filter by chosen state", () => {
    const normalizedCountyData = getNormalizedCountyData(
      [
        { state_code: mockStateCode1, county_code: mockCounty1 },
        { state_code: mockStateCode1, county_code: mockCounty2 },
        { state_code: mockStateCode2, county_code: mockCounty1 },
        { state_code: mockStateCode2, county_code: mockCounty2 },
        { state_code: mockStateCode2, county_code: mockCounty3 },
      ],
      mockStateCode1
    );
    expect(normalizedCountyData.length).toBe(2);
    expect(normalizedCountyData.some((county) => county.mockCounty3)).toBe(false);
  });

  it("should sort by alphabet (ascending)", () => {
    const normalizedCountyData = getNormalizedCountyData(mockData, mockStateCode1);

    expect(normalizedCountyData).toMatchObject([
      {
        name: mockCountyName,
      },
      {
        name: mockCountyName,
      },
      {
        name: mockCountyName1,
      },
    ]);
  });

  it("should normalize values", () => {
    const normalizedCountyData = getNormalizedCountyData(mockData, mockStateCode1);

    expect(normalizedCountyData).toMatchObject([
      {
        code: mockCounty1,
        population: 87688,
        name: mockCountyName,
      },
      {
        code: mockCounty2,
        population: 876543,
        name: mockCountyName,
      },
      {
        code: mockCounty3,
        population: 12345678,
        name: mockCountyName1,
      },
    ]);
  });
});
