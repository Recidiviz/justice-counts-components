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
import Tabs from "../Tabs";
import { CORRECTIONS, JAILS } from "../constants";

describe("Tabs.js", () => {
  const mockFn = jest.fn();

  it("should render active button", () => {
    const { queryAllByText } = render(
      <Tabs
        activeTab={CORRECTIONS}
        onTabChange={mockFn}
        tabsWithData={[CORRECTIONS, JAILS]}
        isUnified={false}
      />
    );

    expect(queryAllByText((_, element) => element.classList.contains("MainPage__tab_active")));
  });

  it("should not append suffix with data", () => {
    const { container } = render(
      <Tabs
        activeTab={CORRECTIONS}
        onTabChange={mockFn}
        tabsWithData={[CORRECTIONS, JAILS]}
        isUnified={false}
      />
    );

    expect(container.querySelector("button:nth-child(1)").innerHTML).toBe("Corrections");
    expect(container.querySelector("button:nth-child(2)").innerHTML).toBe("Jails");
  });

  it("should append suffix for corrections with no data", () => {
    const { container } = render(
      <Tabs activeTab={CORRECTIONS} onTabChange={mockFn} tabsWithData={[JAILS]} isUnified={false} />
    );

    expect(container.querySelector("button:nth-child(1)").innerHTML).toBe("Corrections (No Data)");
    expect(container.querySelector("button:nth-child(2)").innerHTML).toBe("Jails");
  });

  it("should append suffix for jails with no data", () => {
    const { container } = render(
      <Tabs
        activeTab={CORRECTIONS}
        onTabChange={mockFn}
        tabsWithData={[CORRECTIONS]}
        isUnified={false}
      />
    );

    expect(container.querySelector("button:nth-child(1)").innerHTML).toBe("Corrections");
    expect(container.querySelector("button:nth-child(2)").innerHTML).toBe("Jails (No Data)");
  });

  it("should append suffix when unified", () => {
    const { container } = render(
      <Tabs
        activeTab={CORRECTIONS}
        onTabChange={mockFn}
        tabsWithData={[CORRECTIONS, JAILS]}
        isUnified
      />
    );

    expect(container.querySelector("button:nth-child(1)").innerHTML).toBe("Corrections");
    expect(container.querySelector("button:nth-child(2)").innerHTML).toBe("Jails (Not Applicable)");
  });

  it("should prefer unified suffix when also no data", () => {
    const { container } = render(
      <Tabs activeTab={CORRECTIONS} onTabChange={mockFn} tabsWithData={[CORRECTIONS]} isUnified />
    );

    expect(container.querySelector("button:nth-child(1)").innerHTML).toBe("Corrections");
    expect(container.querySelector("button:nth-child(2)").innerHTML).toBe("Jails (Not Applicable)");
  });
});
