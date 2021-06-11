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
import generateSourceData from "../generateSourceData";

describe("generateSourceData.js", () => {
  const mockFlowData = {
    MOCK_METRIC1: {
      item: {
        sourceName: "Mock source name 1",
        sourceUrl: "Mock source url 1",
        reportName: "Mock source report name 1",
      },
    },
    MOCK_METRIC2: {
      item: {
        sourceName: "Mock source name 2",
        sourceUrl: "Mock source url 2",
        reportName: "Mock source report name 2",
      },
    },
  };

  const mockChartSourceData1 = {
    "Mock source name 3": {
      "Mock source url 3": "Mock source report name 3",
    },
    "Mock source name 4": {
      "Mock source url 4": "Mock source report name 4",
    },
  };

  const mockChartSourceData2 = {
    "Mock source name 5": {
      "Mock source url 5": "Mock source report name 5",
    },
  };

  it("should normalize, merge and process data ", () => {
    expect(
      generateSourceData(mockFlowData, [mockChartSourceData1, mockChartSourceData2])
    ).toMatchObject([
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
      {
        name: "Mock source name 3",
        links: [
          {
            name: "Mock source report name 3",
            src: "Mock source url 3",
          },
        ],
      },
      {
        name: "Mock source name 4",
        links: [
          {
            name: "Mock source report name 4",
            src: "Mock source url 4",
          },
        ],
      },
      {
        name: "Mock source name 5",
        links: [
          {
            name: "Mock source report name 5",
            src: "Mock source url 5",
          },
        ],
      },
    ]);
  });
});
