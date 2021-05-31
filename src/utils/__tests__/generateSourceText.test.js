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
import generateSourceText from "../generateSourceText";

describe("generateSourceText.js", () => {
  const mockSourceName = "Mock source name";
  const mockSourceCategories = ["Mock source category 1", "Mock source category 1"];
  const mockSourceUrl = "Mock source url";

  const sourceText = generateSourceText(mockSourceName, mockSourceCategories, mockSourceUrl);

  it("should produce source text with multiple categories", () => {
    expect(sourceText).toBe(
      `Sourced from ${mockSourceName}'s public reports. Includes data for the following categories: ${mockSourceCategories.join(
        ", "
      )}`
    );
  });

  const sourceText1 = generateSourceText(mockSourceName, [], mockSourceUrl);

  it("should produce source text without categories if there is no categories", () => {
    expect(sourceText1).toBe(`Sourced from ${mockSourceName}'s public reports`);
  });

  const sourceText2 = generateSourceText(mockSourceName, [], "");

  it("should produce CSG source text", () => {
    expect(sourceText2).toBe(
      `Sourced from data provided to the CSG Justice Center by ${mockSourceName}`
    );
  });
});
