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

import MainPage from "../MainPage";
import Corrections from "../../Corrections";
import { CORRECTIONS, JAILS, LS_SWITCH_KEY, LS_TAB_KEY, MONTHLY } from "../constants";

jest.mock("../../Corrections");
describe("MainPage.js", () => {
  const mockStateName = "Alabama";
  const mockCorrectionsData = {
    flowDiagramLastDate: "September 2019",
    flowDiagramPrevDate: "October 2018",
    flowData: {},
    populationsChartData: {},
    prisonAdmissionsChartData: {},
    paroleRevocationsChartData: {},
    probationRevocationsChartData: {},
    sourceData: [],
    releasesChartData: {},
    keyInsightsData: [],
  };

  beforeEach(() => {
    Corrections.mockReturnValue(null);
  });

  it("should render MainPage with specified state name", () => {
    const { container } = render(
      <MainPage
        stateName={mockStateName}
        monthlyCorrectionsData={mockCorrectionsData}
        annualCorrectionsData={mockCorrectionsData}
        jailsKeyInsightsData={[]}
        incarcerationRateChartData={{}}
        incarcerationRateTopCountiesChartData={{}}
        jailsSourceData={[]}
        isUnified={false}
        hasAnnualCorrectionsData
        hasMonthlyCorrectionsData
        hasJailsData
      />
    );

    expect(container.querySelector(".MainPage__title").innerHTML).toBe("Alabama data dashboard");
  });

  it("should always render corrections if unified", () => {
    localStorage.setItem(LS_TAB_KEY, JAILS);
    const { container } = render(
      <MainPage
        stateName={mockStateName}
        monthlyCorrectionsData={mockCorrectionsData}
        annualCorrectionsData={mockCorrectionsData}
        jailsKeyInsightsData={[]}
        incarcerationRateChartData={{}}
        incarcerationRateTopCountiesChartData={{}}
        jailsSourceData={[]}
        isUnified
        hasAnnualCorrectionsData
        hasMonthlyCorrectionsData
        hasJailsData
      />
    );

    expect(container.querySelector(".MainPage__tab_active").innerHTML).toBe("Corrections");
  });

  const mockJailChartData = {
    datasets: [],
    labels: [],
  };

  it("should always render jails if not unified", () => {
    localStorage.setItem(LS_TAB_KEY, JAILS);
    const { container } = render(
      <MainPage
        stateName={mockStateName}
        monthlyCorrectionsData={mockCorrectionsData}
        annualCorrectionsData={mockCorrectionsData}
        jailsKeyInsightsData={[]}
        incarcerationRateChartData={mockJailChartData}
        incarcerationRateTopCountiesChartData={mockJailChartData}
        jailsSourceData={[]}
        isUnified={false}
        hasAnnualCorrectionsData
        hasMonthlyCorrectionsData
        hasJailsData
      />
    );

    expect(container.querySelector(".MainPage__tab_active").innerHTML).toBe("Jails");
  });

  it("should render monthly if available", () => {
    localStorage.setItem(LS_TAB_KEY, CORRECTIONS);
    localStorage.setItem(LS_SWITCH_KEY, MONTHLY);
    const { container } = render(
      <MainPage
        stateName={mockStateName}
        monthlyCorrectionsData={mockCorrectionsData}
        annualCorrectionsData={mockCorrectionsData}
        jailsKeyInsightsData={[]}
        incarcerationRateChartData={mockJailChartData}
        incarcerationRateTopCountiesChartData={mockJailChartData}
        jailsSourceData={[]}
        isUnified={false}
        hasAnnualCorrectionsData
        hasMonthlyCorrectionsData
        hasJailsData
      />
    );

    expect(container.querySelector(".Switch__button--active").innerHTML).toBe("Monthly");
  });

  it("should not render monthly if not available", () => {
    localStorage.setItem(LS_TAB_KEY, CORRECTIONS);
    localStorage.setItem(LS_SWITCH_KEY, MONTHLY);
    const { container } = render(
      <MainPage
        stateName={mockStateName}
        monthlyCorrectionsData={mockCorrectionsData}
        annualCorrectionsData={mockCorrectionsData}
        jailsKeyInsightsData={[]}
        incarcerationRateChartData={mockJailChartData}
        incarcerationRateTopCountiesChartData={mockJailChartData}
        jailsSourceData={[]}
        isUnified={false}
        hasAnnualCorrectionsData
        hasMonthlyCorrectionsData={false}
        hasJailsData
      />
    );

    expect(container.querySelector(".Switch__button--active").innerHTML).toBe("Annual");
  });
});
