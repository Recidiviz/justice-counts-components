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
import Switch from "../Switch";
import { ANNUAL, MONTHLY } from "../../MainPage/constants";

describe("Switch.js", () => {
  const mockFn = jest.fn();

  it("should render active button", () => {
    const { queryAllByText } = render(
      <Switch activeTab={MONTHLY} onTabChange={mockFn} panesWithData={[MONTHLY, ANNUAL]} />
    );

    expect(queryAllByText((_, element) => element.classList.contains("Switch__button--active")));
  });

  it("should not append suffix with data", () => {
    const { container } = render(
      <Switch activeTab={MONTHLY} onTabChange={mockFn} panesWithData={[MONTHLY, ANNUAL]} />
    );

    expect(container.querySelector("button:nth-child(1)").innerHTML).toBe("Monthly");
    expect(container.querySelector("button:nth-child(2)").innerHTML).toBe("Annual");
  });

  it("should append suffix with no data", () => {
    const { container } = render(
      <Switch activeTab={MONTHLY} onTabChange={mockFn} panesWithData={[MONTHLY]} />
    );

    expect(container.querySelector("button:nth-child(1)").innerHTML).toBe("Monthly");
    expect(container.querySelector("button:nth-child(2)").innerHTML).toBe("Annual (No Data)");
  });
});
