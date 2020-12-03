import mockDataPoints from "./mockDataPoints";

// prettier-ignore
const mockLabels = ["9/19", "10/19", "11/19", "12/19", "1/20", "2/20", "3/20", "4/20", "5/20", "6/20", "7/20", "8/20", "9/20"];

export const mockPopulationChartData = {
  datasets: [
    { label: "Prison Population", data: mockDataPoints(400, 800, 13) },
    { label: "Probation Population", data: mockDataPoints(320, 500, 13) },
    { label: "Parole Population", data: mockDataPoints(350, 50, 13) },
  ],
  labels: mockLabels,
};

export const mockPrisonAdmissionsChartData = {
  datasets: [
    { label: "Total Prison Admissions", data: mockDataPoints(200, 500, 13) },
    { label: "New Court Admissions", data: mockDataPoints(100, 180, 13) },
    { label: "Parole Revocations", data: mockDataPoints(300, 500, 13) },
    { label: "Probation Revocations", data: mockDataPoints(20, 120, 13) },
  ],
  labels: mockLabels,
};

export const mockReleasesChartData = {
  datasets: [{ label: "Releases", data: mockDataPoints(200, 800, 13) }],
  labels: mockLabels,
};
