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
import KeyInsights from "../KeyInsights";

describe("KeyInsights.js", () => {
  const mockKeyInsightsData = [
    {
      caption: "mock caption text",
      number: 1234,
    },
  ];

  const mockEmptyKeyInsightsData = [];

  it("should render Key Insights section", () => {
    const { getByText } = render(<KeyInsights keyInsightsData={mockKeyInsightsData} />);

    expect(getByText("1,234")).toBeInTheDocument();
    expect(getByText("mock caption text")).toBeInTheDocument();
  });

  it("should not render Key Insights cards if there is no data", () => {
    const { container } = render(<KeyInsights keyInsightsData={mockEmptyKeyInsightsData} />);

    expect(container.querySelector(".KeyInsights__card")).toBeNull();
  });
});
