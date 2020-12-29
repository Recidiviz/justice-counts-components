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
import generateFlowDiagramData from "../generateFlowDiagramData";
import generateHint from "../generateHint";
import {
  ADMISSIONS,
  ADMISSIONS_NEW_COURT,
  ADMISSIONS_REVOCATIONS_PAROLE,
  ADMISSIONS_REVOCATIONS_PROBATION,
  POPULATION_PAROLE,
  POPULATION_PRISON,
  POPULATION_PROBATION,
  RELEASES,
} from "../../constants/metrics";

jest.mock("../generateHint");
describe("generateFlowDiagramData.js", () => {
  const mockData = {
    [ADMISSIONS]: [
      {
        value: 100,
        percentChange: 0.1,
        year: 2020,
        month: 1,
        comparedToYear: 2019,
        comparedToMonth: 1,
      },
    ],
    [RELEASES]: [
      {
        value: 110,
        percentChange: 0.15,
        year: 2020,
        month: 1,
        comparedToYear: 2019,
        comparedToMonth: 1,
      },
    ],
    [POPULATION_PROBATION]: [
      {
        value: 95,
        percentChange: 0.18,
        year: 2019,
        month: 11,
        comparedToYear: 2019,
        comparedToMonth: 11,
      },
    ],
  };
  const mockHint = "some hint";

  generateHint.mockImplementation((a, b, item) => {
    if (
      item.year !== 2020 ||
      item.month !== 1 ||
      item.comparedToYear !== 2019 ||
      item.comparedToMonth !== 1
    ) {
      return mockHint;
    }
    return null;
  });

  const flowDiagramData = generateFlowDiagramData(mockData);

  it("should return most recent year", () => {
    expect(flowDiagramData.lastDate).toBe("February 2020");
    expect(flowDiagramData.comparedToDate).toBe("February 2019");
  });

  it("should put isNotAvailable flag is no metric data provided", () => {
    expect(flowDiagramData.flowData[ADMISSIONS_NEW_COURT].isNotAvailable).toBe(true);
    expect(flowDiagramData.flowData[ADMISSIONS_REVOCATIONS_PROBATION].isNotAvailable).toBe(true);
    expect(flowDiagramData.flowData[POPULATION_PRISON].isNotAvailable).toBe(true);
    expect(flowDiagramData.flowData[POPULATION_PAROLE].isNotAvailable).toBe(true);
    expect(flowDiagramData.flowData[ADMISSIONS_REVOCATIONS_PAROLE].isNotAvailable).toBe(true);
  });

  it("should produce flow diagram card data", () => {
    expect(flowDiagramData.flowData[ADMISSIONS]).toMatchObject({ number: 100, percent: 10 });
    expect(flowDiagramData.flowData[RELEASES]).toMatchObject({ number: 110, percent: 15 });
  });

  it("should add hint if data is not most recent or compared not to strictly year before", () => {
    expect(flowDiagramData.flowData[POPULATION_PROBATION]).toMatchObject({
      number: 95,
      percent: 18,
      hint: mockHint,
    });
  });
});