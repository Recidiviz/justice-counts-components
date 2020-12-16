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
import React from "react";
import { render } from "@testing-library/react";

import App from "../App";
import MainPage from "../components/MainPage";
import getNormalizedStateData from "../utils/getNormalizedStateData";
import generateChartData from "../utils/generateChartData";

jest.mock("../components/MainPage");
jest.mock("../utils/getNormalizedStateData");
jest.mock("../utils/generateChartData");
describe("App.js", () => {
  const mockState = "US_CO";
  const mockData = [];
  const mockNormalizedData = "some_normalized_data";
  const mockChartData = "some_chart_data";

  beforeEach(() => {
    MainPage.mockReturnValue(null);
    getNormalizedStateData.mockReturnValue(mockNormalizedData);
    generateChartData.mockReturnValue(mockChartData);
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should provide corresponding state name", () => {
    render(<App data={mockData} state={mockState} />);

    expect(MainPage).toHaveBeenCalledTimes(1);
    expect(MainPage.mock.calls[0][0].stateName).toBe("Colorado");
    expect(MainPage.mock.calls[0][0].populationsChartData).toBe(mockChartData);
    expect(MainPage.mock.calls[0][0].prisonAdmissionsChartData).toBe(mockChartData);
    expect(MainPage.mock.calls[0][0].releasesChartData).toBe(mockChartData);
  });
});
