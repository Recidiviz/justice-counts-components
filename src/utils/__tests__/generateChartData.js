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
import generateChartData from "../generateChartData";
import { RELEASES } from "../../constants/metrics";

describe("generateChartData.js", () => {
  it("should create chart data for 60 months before last reported date", () => {
    const mockStateData = {
      [RELEASES]: [
        { year: 2020, month: 4, value: 900 },
        { year: 2020, month: 6, value: 1004 },
        { year: 2020, month: 7, value: 1003 },
        { year: 2020, month: 8, value: 1002 },
        { year: 2020, month: 9, value: 1001 },
        { year: 2020, month: 10, value: 1000 },
      ],
    };
    expect(generateChartData(mockStateData, [RELEASES])).toStrictEqual({
      datasets: [
        {
          metric: "RELEASES",
          label: "Releases",
          // prettier-ignore
          data: [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, 
            900, 
            null, 
            1004, 
            1003, 
            1002, 
            1001, 
            1000,
          ],
        },
      ],
      labels: [
        { year: 2015, month: 11 },
        { year: 2016, month: 0 },
        { year: 2016, month: 1 },
        { year: 2016, month: 2 },
        { year: 2016, month: 3 },
        { year: 2016, month: 4 },
        { year: 2016, month: 5 },
        { year: 2016, month: 6 },
        { year: 2016, month: 7 },
        { year: 2016, month: 8 },
        { year: 2016, month: 9 },
        { year: 2016, month: 10 },
        { year: 2016, month: 11 },
        { year: 2017, month: 0 },
        { year: 2017, month: 1 },
        { year: 2017, month: 2 },
        { year: 2017, month: 3 },
        { year: 2017, month: 4 },
        { year: 2017, month: 5 },
        { year: 2017, month: 6 },
        { year: 2017, month: 7 },
        { year: 2017, month: 8 },
        { year: 2017, month: 9 },
        { year: 2017, month: 10 },
        { year: 2017, month: 11 },
        { year: 2018, month: 0 },
        { year: 2018, month: 1 },
        { year: 2018, month: 2 },
        { year: 2018, month: 3 },
        { year: 2018, month: 4 },
        { year: 2018, month: 5 },
        { year: 2018, month: 6 },
        { year: 2018, month: 7 },
        { year: 2018, month: 8 },
        { year: 2018, month: 9 },
        { year: 2018, month: 10 },
        { year: 2018, month: 11 },
        { year: 2019, month: 0 },
        { year: 2019, month: 1 },
        { year: 2019, month: 2 },
        { year: 2019, month: 3 },
        { year: 2019, month: 4 },
        { year: 2019, month: 5 },
        { year: 2019, month: 6 },
        { year: 2019, month: 7 },
        { year: 2019, month: 8 },
        { year: 2019, month: 9 },
        { year: 2019, month: 10 },
        { year: 2019, month: 11 },
        { year: 2020, month: 0 },
        { year: 2020, month: 1 },
        { year: 2020, month: 2 },
        { year: 2020, month: 3 },
        { year: 2020, month: 4 },
        { year: 2020, month: 5 },
        { year: 2020, month: 6 },
        { year: 2020, month: 7 },
        { year: 2020, month: 8 },
        { year: 2020, month: 9 },
        { year: 2020, month: 10 },
      ],
    });
  });
});
