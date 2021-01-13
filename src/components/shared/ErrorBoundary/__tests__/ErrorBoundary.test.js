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
import ErrorBoundary from "../ErrorBoundary";
import logger from "../../../../utils/logger";

describe("ErrorBoundary.js", () => {
  const mockError = new Error("some error");
  const componentId = "component-id";
  const mockPlaceholder = "placeholder";
  const logErrorSpy = jest.spyOn(logger, "error");

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render placeholder component if children component throws an error", () => {
    const ComponentWithError = () => {
      throw mockError;
    };

    const { getByText } = render(
      <ErrorBoundary placeholder={mockPlaceholder}>
        <ComponentWithError />
      </ErrorBoundary>
    );

    expect(getByText(mockPlaceholder)).toBeInTheDocument();
    expect(logErrorSpy.mock.calls[0][0]).toEqual(mockError);
  });

  it("should render children component if no errors were thrown", () => {
    const ComponentWithoutError = () => {
      return <div data-testid={componentId} />;
    };

    const { getByTestId } = render(
      <ErrorBoundary placeholder={mockPlaceholder}>
        <ComponentWithoutError />
      </ErrorBoundary>
    );

    expect(getByTestId(componentId)).toBeInTheDocument();
    expect(logErrorSpy).not.toHaveBeenCalled();
  });
});
