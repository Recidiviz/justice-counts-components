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
import userEvent from "@testing-library/user-event";
import PeriodPicker from "../PeriodPicker";

describe("PeriodPicker.js", () => {
  const mockPeriods = [
    { value: 60, label: "5 years" },
    { value: 12, label: "1 year" },
    { value: 30, label: "All Time" },
  ];
  const mockPeriod = 12;
  const mockOnChange = jest.fn();

  it("period picker flow tests", () => {
    const mockOutsideId = "click-outside-test";
    const { container, getByTestId } = render(
      <>
        <PeriodPicker periods={mockPeriods} onChange={mockOnChange} period={mockPeriod} />
        <div data-testid={mockOutsideId} />
      </>
    );

    const select = container.querySelector(".PeriodPicker__selected-value");

    // initial value should be rendered, dropdown should be closed
    expect(select.innerHTML).toBe("1 year");
    expect(container.querySelector(".PeriodPicker__options")).toBe(null);

    // should open dropdown with all the options without chosen
    userEvent.click(select);
    expect(container.querySelector(".PeriodPicker__options")).not.toBeNull();
    expect(container.querySelectorAll(".PeriodPicker__option").length).toBe(2);

    // should close the dropdown on click outside the component
    userEvent.click(getByTestId(mockOutsideId));
    expect(container.querySelector(".PeriodPicker__options")).toBe(null);

    // should call onChange and close dropdown when option is clicked
    userEvent.click(select);
    userEvent.click(container.querySelector(".PeriodPicker__option"));
    expect(mockOnChange).toBeCalled();
    expect(container.querySelector(".PeriodPicker__options")).toBe(null);
  });
});
