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
import FlowDiagram from "../FlowDiagram";
import {
  ADMISSIONS_NEW_COMMITMENTS,
  PROBATION_SENTENCES,
  ADMISSIONS_FROM_PAROLE,
  ADMISSIONS_FROM_PROBATION,
  POPULATION_PAROLE,
  POPULATION_PRISON,
  POPULATION_PROBATION,
  RELEASES_TO_PAROLE,
} from "../../../../constants/metrics";

describe("FlowDiagram.js", () => {
  const mockLastDate = "September 2020";
  const mockPrevDate = "October 2019";
  const mockData = {
    [ADMISSIONS_NEW_COMMITMENTS]: { title: "ADMISSIONS", isNotAvailable: false },
    [PROBATION_SENTENCES]: { title: "ADMISSIONS_NEW_COURT", isNotAvailable: false },
    [POPULATION_PRISON]: { title: "POPULATION_PRISON", isNotAvailable: false },
    [POPULATION_PROBATION]: { title: "POPULATION_PROBATION", isNotAvailable: false },
    [ADMISSIONS_FROM_PROBATION]: {
      title: "ADMISSIONS_FROM_PROBATION",
      isNotAvailable: false,
    },
    [RELEASES_TO_PAROLE]: { title: "RELEASES", isNotAvailable: false },
    [ADMISSIONS_FROM_PAROLE]: {
      title: "ADMISSIONS_FROM_PAROLE",
      isNotAvailable: false,
    },
    [POPULATION_PAROLE]: { title: "POPULATION_PAROLE", isNotAvailable: false },
  };

  it("should render flow diagram", () => {
    const { getByText } = render(
      <FlowDiagram lastDate={mockLastDate} prevDate={mockPrevDate} data={mockData} />
    );

    expect(getByText("September 2020")).toBeInTheDocument();
    expect(getByText("(% change compared to October 2019)")).toBeInTheDocument();
  });
});
