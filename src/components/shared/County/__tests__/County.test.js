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
import County from "../County";

describe("County.js", () => {
  const mockCounty = "some county";
  const mockOnClick = jest.fn();

  it("should render standard county", () => {
    const { getByText, container } = render(
      <County
        name={mockCounty}
        population={10019}
        isSelected="another county"
        isNoData={false}
        onClick={mockOnClick}
      />
    );

    expect(getByText(mockCounty)).toBeInTheDocument();
    expect(getByText("(10,019 people)")).toBeInTheDocument();
    expect(container.querySelector(".County--selected")).toBeNull();
  });

  it("should render selected county", () => {
    const { container } = render(
      <County
        name={mockCounty}
        population={10019}
        isSelected={mockCounty}
        isNoData={false}
        onClick={mockOnClick}
      />
    );

    expect(container.querySelector(".County--selected")).toBeInTheDocument();
  });

  it("should render not available county", () => {
    const { container } = render(
      <County
        name={mockCounty}
        population={10019}
        isSelected={mockCounty}
        isNoData
        onClick={mockOnClick}
      />
    );

    expect(container.querySelector(".County--not-available")).toBeInTheDocument();
  });
});
