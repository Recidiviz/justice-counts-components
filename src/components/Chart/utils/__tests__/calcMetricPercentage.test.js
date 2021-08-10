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
import calcMetricPercentage, { NO_DATA_ERROR } from "../calcMetricPercentage";
import logger from "../../../../utils/logger";

describe("calcPercentage.js", () => {
  const logErrorSpy = jest.spyOn(logger, "error");

  it("should calculate percentage from chart dataset", () => {
    expect(calcMetricPercentage([100, null, 95, 120, 75, 80, 155])).toBe("+55%");
    expect(calcMetricPercentage([100, 95, 90, 80, 75, 70])).toBe("-30%");
  });

  it("should throw error to console when data array is empty", () => {
    expect(calcMetricPercentage([])).toBe("N/A");
    expect(logErrorSpy).toBeCalledWith(NO_DATA_ERROR);
  });

  it("should work when array consists of the only data point", () => {
    expect(calcMetricPercentage([1])).toBe("0%");
  });

  it("should handle decreases to zero", () => {
    expect(calcMetricPercentage([1, 0])).toBe("-100%");
  });

  it("should handle increases from zero", () => {
    expect(calcMetricPercentage([0, 1])).toBe("N/A");
  });
});
