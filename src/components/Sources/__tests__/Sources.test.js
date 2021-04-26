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
import Sources from "../Sources";

describe("Sources.js", () => {
  const mockSourceData = [
    {
      name: "Mock source name 1",
      links: [
        {
          name: "Mock source report name 1",
          src: "Mock source url 1",
        },
      ],
    },
    {
      name: "Mock source name 2",
      links: [
        {
          name: "Mock source report name 2",
          src: "Mock source url 2",
        },
      ],
    },
  ];

  const mockEmptySourceData = [];

  it("should render sources section if data is provided", () => {
    const { container } = render(
      <>
        <Sources data={mockSourceData} />
      </>
    );

    expect(container.querySelector(".Sources__data")).toBeInTheDocument();
  });

  it("should render not available placeholder if data is empty", () => {
    const { container } = render(
      <>
        <Sources data={mockEmptySourceData} />
      </>
    );

    expect(container.querySelector(".Sources__no-data")).toBeInTheDocument();
  });
});
