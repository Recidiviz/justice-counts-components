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
import generateKeyInsightsData from "../generateKeyInsightsData";

describe("generateKeyInsightsData.js", () => {
  it("should produce card data", () => {
    const mockData = {
      ADMISSIONS_NEW_COMMITMENTS: {
        title: "Prison Sentences",
        number: 337,
        percentChange: -20,
        numberChange: -84,
      },
      ADMISSIONS_FROM_PROBATION: {
        title: "Probation Revocations",
        number: 23,
        percentChange: -31,
        numberChange: -10,
      },
      POPULATION_PRISON: {
        title: "Prison Population",
        number: 1223,
        percentChange: -31,
        numberChange: -10,
      },
      ADMISSIONS_FROM_PAROLE: {
        title: "Parole Revocations",
        number: 137,
        percentChange: -20,
        numberChange: -84,
      },
      ADMISSIONS_FROM_PAROLE_TECHNICAL: {
        title: "Parole Revocations (Technical)",
        number: 69,
        percentChange: -37.83783784,
        numberChange: -42,
      },
      ADMISSIONS_FROM_PROBATION_TECHNICAL: {
        title: "Probation Revocations (Technical)",
        number: 2,
        percentChange: -90.47619048,
        numberChange: -19,
      },
    };

    const keyInsightsData = generateKeyInsightsData(mockData);

    expect(keyInsightsData[0]).toMatchObject({
      title: "Prison Population",
      number: 1223,
      percentChange: -31,
    });
    expect(keyInsightsData[1]).toMatchObject({
      title: "Parole Revocations",
      number: 137,
      percentChange: -20,
    });
    expect(keyInsightsData[2]).toMatchObject({
      title: "Probation Revocations",
      number: 23,
      percentChange: -31,
    });
  });

  it("should produce zero cases card captions", () => {
    const zeroMockData = {
      ADMISSIONS_NEW_COMMITMENTS: {
        title: "Prison Sentences",
        number: 337,
        percentChange: -20,
        numberChange: -84,
      },
      ADMISSIONS_FROM_PROBATION: {
        title: "Probation Revocations",
        number: 23,
        percentChange: 0,
        numberChange: 0,
      },
      POPULATION_PRISON: {
        title: "Prison Population",
        number: 1223,
        percentChange: 0,
        numberChange: 0,
      },
      ADMISSIONS_FROM_PAROLE: {
        title: "Parole Revocations",
        number: 137,
        percentChange: 0,
        numberChange: 0,
      },
      ADMISSIONS_FROM_PAROLE_TECHNICAL: {
        title: "Parole Revocations (Technical)",
        number: 69,
        percentChange: -37.83783784,
        numberChange: -42,
      },
      ADMISSIONS_FROM_PROBATION_TECHNICAL: {
        title: "Probation Revocations (Technical)",
        number: 2,
        percentChange: -90.47619048,
        numberChange: -19,
      },
    };

    const zeroKeyInsightsData = generateKeyInsightsData(zeroMockData);

    expect(zeroKeyInsightsData[0]).toMatchObject({
      title: "Prison Population",
      number: 1223,
      percentChange: 0,
      caption: "There was no net change in prison population during this time period.",
    });
    expect(zeroKeyInsightsData[1]).toMatchObject({
      title: "Parole Revocations",
      number: 137,
      percentChange: 0,
      caption:
        "There was no net change in number of people revoked from parole to prison during this time period.",
    });
    expect(zeroKeyInsightsData[2]).toMatchObject({
      title: "Probation Revocations",
      number: 23,
      percentChange: 0,
      caption:
        "There was no net change in number of people revoked from probation to prison during this time period.",
    });
  });

  it("should produce null cases card captions", () => {
    const nullMockData = {
      ADMISSIONS_NEW_COMMITMENTS: {
        title: "Prison Sentences",
        number: 337,
        percentChange: -20,
        numberChange: -84,
      },
      ADMISSIONS_FROM_PROBATION: {
        title: "Probation Revocations",
        number: 23,
        percentChange: null,
        numberChange: null,
      },
      POPULATION_PRISON: {
        title: "Prison Population",
        number: 1223,
        percentChange: null,
        numberChange: null,
      },
      ADMISSIONS_FROM_PAROLE: {
        title: "Parole Revocations",
        number: 137,
        percentChange: null,
        numberChange: null,
      },
      ADMISSIONS_FROM_PAROLE_TECHNICAL: {
        title: "Parole Revocations (Technical)",
        number: 69,
        percentChange: -37.83783784,
        numberChange: -42,
      },
      ADMISSIONS_FROM_PROBATION_TECHNICAL: {
        title: "Probation Revocations (Technical)",
        number: 2,
        percentChange: -90.47619048,
        numberChange: -19,
      },
    };

    const nullKeyInsightsData = generateKeyInsightsData(nullMockData);

    expect(nullKeyInsightsData[0]).toMatchObject({
      title: "Prison Population",
      number: 1223,
      percentChange: null,
      caption: "There is no available net change in prison population.",
    });
    expect(nullKeyInsightsData[1]).toMatchObject({
      title: "Parole Revocations",
      number: 137,
      percentChange: null,
      caption:
        "There is no available net change in number of people revoked from parole to prison.",
    });
    expect(nullKeyInsightsData[2]).toMatchObject({
      title: "Probation Revocations",
      number: 23,
      percentChange: null,
      caption:
        "There is no available net change in number of people revoked from probation to prison.",
    });
  });
});