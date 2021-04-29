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
import Arrow from "../Arrow";

describe("Arrow.js", () => {
  it("should render arrow", () => {
    const { container } = render(<Arrow />);
    const arrow = container.getElementsByClassName("Arrow")[0];
    expect(arrow.classList.contains("Arrow--dir-bottom")).toBe(true);
    expect(arrow.classList.contains("Arrow--placement-center")).toBe(true);
  });

  it("should render arrow with defined width", () => {
    const { container } = render(<Arrow width={10} />);
    const arrow = container.getElementsByClassName("Arrow")[0];
    expect(arrow.style.width).toBe("10rem");
  });

  it("should render disabled arrow", () => {
    const { container } = render(<Arrow isDisabled />);
    const arrow = container.getElementsByClassName("Arrow")[0];

    expect(arrow.classList.contains("Arrow--disabled")).toBe(true);
  });
});
