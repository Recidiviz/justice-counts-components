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
import React from "react";
import { render } from "@testing-library/react";

import App from "../App";
import MainPage from "../components/MainPage";
import getNormalizedStateData from "../utils/getNormalizedStateData";
import generateCorrectionsChartData from "../utils/generateCorrectionsChartData";
import generateJailsChartData from "../utils/generateJailsChartData";
import states from "../constants/states";
import CountySelector from "../components/Jails/CountySelector";
import generateTopCountiesByPopulation from "../utils/generateTopCountiesByPopulation";
import getNormalizedCountyData from "../utils/getNormalizedCountyData";

jest.mock("../components/MainPage");
jest.mock("../utils/getNormalizedStateData");
jest.mock("../utils/getNormalizedCountyData");
jest.mock("../utils/generateTopCountiesByPopulation");
jest.mock("../utils/generateCorrectionsChartData");
jest.mock("../utils/generateJailsChartData");
jest.mock("../components/Jails/CountySelector");
describe("App.js", () => {
  const mockStateCode = "US_CO";
  const mockData = [];
  const mockNormalizedData = "some_normalized_data";
  const mockChartData = "some_chart_data";

  beforeEach(() => {
    MainPage.mockReturnValue(null);
    CountySelector.mockReturnValue(mockNormalizedData);
    getNormalizedStateData.mockReturnValue(mockNormalizedData);
    generateCorrectionsChartData.mockReturnValue(mockChartData);
    generateJailsChartData.mockReturnValue(mockChartData);
    getNormalizedCountyData.mockReturnValue(mockData);
    generateTopCountiesByPopulation.mockReturnValue(mockData);
    jest.clearAllMocks();
  });

  it("should provide corresponding state name and data", () => {
    render(
      <App
        correctionsMonthlyData={mockData}
        correctionsAnnualData={mockData}
        jailsData={mockData}
        countiesData={mockData}
        stateCode={mockStateCode}
      />
    );

    expect(MainPage).toHaveBeenCalledTimes(1);
    expect(MainPage.mock.calls[0][0].stateName).toBe(states[mockStateCode]);
    expect(MainPage.mock.calls[0][0].monthlyCorrectionsData.populationsChartData).toBe(
      mockChartData
    );
    expect(MainPage.mock.calls[0][0].monthlyCorrectionsData.prisonAdmissionsChartData).toBe(
      mockChartData
    );
    expect(MainPage.mock.calls[0][0].monthlyCorrectionsData.releasesChartData).toBe(mockChartData);
    expect(MainPage.mock.calls[0][0].incarcerationRateChartData).toBe(mockChartData);
    expect(MainPage.mock.calls[0][0].incarcerationRateTopCountiesChartData).toBe(mockChartData);
  });
});
