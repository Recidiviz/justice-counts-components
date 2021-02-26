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

import MainPage from "../MainPage";
import Corrections from "../../Corrections";

jest.mock("../../Corrections");
describe("MainPage.js", () => {
  const mockStateName = "Alabama";

  beforeEach(() => {
    Corrections.mockReturnValue(null);
  });

  it("should render MainPage with specified state name", () => {
    const { container } = render(
      <MainPage
        stateName={mockStateName}
        flowDiagramLastDate="September 2019"
        flowDiagramPrevDate="October 2018"
        flowDiagramData={{}}
        populationsChartData={{}}
        prisonAdmissionsChartData={{}}
        paroleRevocationsChartData={{}}
        probationRevocationsChartData={{}}
        sourceData={[]}
        releasesChartData={{}}
        correctionsKeyInsightsData={[]}
        jailsKeyInsightsData={[]}
      />
    );

    expect(container.querySelector(".MainPage__title").innerHTML).toBe("Alabama data dashboard");
  });
});
