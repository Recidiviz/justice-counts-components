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
import { render, screen } from "@testing-library/react";
import Card from "../Card";

describe("Card.js", () => {
  it("should render standard card", () => {
    const { getByText, container } = render(
      <Card title="Some title" number={12} percentChange={10} />
    );

    expect(getByText("Some title")).toBeInTheDocument();
    expect(getByText("(+10%)")).toBeInTheDocument();
    expect(container.querySelector(".Card__warning")).toBeNull();
  });

  it("should render negative percent change", () => {
    const { getByText } = render(<Card title="Some title" number={12} percentChange={-10} />);

    expect(getByText("(-10%)")).toBeInTheDocument();
  });

  it("should render warning is hint is provided", () => {
    const { container } = render(
      <Card title="Some title" number={15} percentChange={-20} hint="Some warning" />
    );

    expect(container.querySelector(".Card__warning")).toBeInTheDocument();
  });

  it("should render not available card if isNotAvailable flag is set", () => {
    const { container } = render(
      <Card title="Some title" number={15} percentChange={-20} isNotAvailable />
    );

    expect(container.querySelector(".Card__not-available-text")).toBeInTheDocument();
  });

  it("should render not available card if isTooStale flag is set", () => {
    const { container } = render(
      <Card title="Some title" number={15} percentChange={-20} isTooStale />
    );

    expect(container.querySelector(".Card__not-available-text")).toBeInTheDocument();
  });

  it("should display (--%) if percent change is null", () => {
    render(<Card title="Some title" number={15} percentChange={null} />);

    expect(screen.queryByText("(--%)")).toBeInTheDocument();
  });

  it("should display comparisons if percent change is 0", () => {
    render(
      <Card title="Some title" number={15} percentChange={0} comparedToDate="November 2020" />
    );

    expect(screen.queryByText("(0%)")).toBeInTheDocument();
    expect(screen.queryByText("(compared to November 2020)")).toBeInTheDocument();
  });

  it("should render card date range section", () => {
    const { container } = render(
      <Card title="Some title" number={15} percentChange={-20} mostRecentDate="September 2020" />
    );

    expect(container.querySelector(".Card__date-range")).toBeInTheDocument();
  });
});
