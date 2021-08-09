# Justice Counts - React Components

[![Build Status](https://travis-ci.com/Recidiviz/justice-counts-components.svg?branch=main)](https://travis-ci.com/Recidiviz/justice-counts-components)

[![Coverage Status](https://coveralls.io/repos/github/Recidiviz/justice-counts-components/badge.svg?branch=main)](https://coveralls.io/github/Recidiviz/justice-counts-components?branch=main)

A set of React components powering a web app for exploring centralized, standardized metrics on the performance of justice systems across the United States

## Contents

1. [Development](#development)
1. [Input Data Format](#input-data-format)

## Development

### Getting set up

1. Grab the source:

   `git clone git@github.com:Recidiviz/justice-counts-components.git`

1. Install Yarn package manager:

   `brew install yarn`

   For alternative Yarn installation options, see [Yarn Installation](https://yarnpkg.com/en/docs/install).

1. Install dependencies:

   `yarn install`

That's it! We suggest installing a linting package for your preferred code editor that hooks into [eslint](#eslint), such as [linter-eslint](https://atom.io/packages/linter-eslint) for Atom.

### Testing and linting

To run tests wired up through react-scripts:

`yarn test --coverage`

Running tests this way will also write code coverage statistics to stdout and the `coverage` directory, which are reported to Coveralls.

To run linting:

`yarn lint`

Linting is done with a combination of `eslint` and `Prettier`. `react-scripts` runs some minimal linting by default as part of its build process; errors on those linting rules would cause build scripts to fail, but errors in the broader [configuration](https://github.com/Recidiviz/supervision-success-component/.eslintrc.json) should not.

To have eslint and Prettier fix violations automatically, run:

`yarn lint --fix`

### Running the app locally

A yarn script is available for starting the development server. The entire app is a React frontend that is served out of port `3000`. This will also automatically open a browser to localhost on the appropriate port, pointing to the frontend.

`yarn start`

The development server will remain active until you either close your terminal or shut down the entire setup at once using `CTRL+c`.

### Creating a build

To generate a build of the frontend that is suitable for deploys, run: `yarn build`.

Each time this is run, the `/build` directory will be wiped clean.

## Input Data Format

The main app component should receive a number of required properties. This includes the `stateCode` to visualize data for,
in a format of `US_XX`, e.g. `US_CO` or `US_PA`. It also includes several collections of data points.

These include (state-level) corrections metrics, in both annual and monthly forms, (county-level) jails metrics,
and static data providing the list of counties in a given state. These collections of data should live in
different flat files under [`/src/data`](src/data). They can be moved around trivially, or pulled instead from a
CDN or an API, for different deployment styles. Example versions of all of these files are currently inside of
the repository, but they should be replaced for live use cases.

The following sub-sections define these data collections.

### Corrections (Monthly)
Found in [`/src/data/corrections_monthly.json`](src/data/corrections_monthly.json).

Read into `App.js` where it is provided `correctionsMonthlyData`, this file contains an array of metric data points.

The file is in JSON Lines format, with different json objects separated by newlines. Each object contains a data point
corresponding to a metric aggregated at the monthly level, matching the spec below:

- `state_code` - state code, e.g. `US_CO`
- `metric` - metric name, e.g. `RELEASES`
- `year` - year, e.g. `2020`
- `month` - month (01-12), e.g. `02` or `2` (leading zero is not required)
- `date_reported` - Date when the metric was reported, e.g. `2019-12-31`
- `data_published` - Date when the metric was published, e.g. `2020-01-15`
- `value` - Value of the metric, e.g. `500`
- `measurement_type` - The type of measurement that produced this metric, e.g. an `INSTANT` (an absolute value at a particular instant in time) or a `DELTA` (a change from a previous value for this same metric)
- `source_name` - Name of the data source provider
- `source_url` - URL of the data source provider
- `report_name` - Human-friendly, readable report name where the metric was published
- `raw_source_categories` - Categories of data provided by the data source, an array of strings
- If this data point is not the first in its series and can be compared to earlier data points:
  - `compared_to_year` - The year of the comparison data point, which is the most recent data point to compare against for trend analysis, no less than one year before this current data point, e.g. `2019`
  - `compared_to_month` - The month of the comparison data point, which is the most recent data point to compare against for trend analysis, no less than one year before this current data point, e.g. `04`
  - `value_change` - Metric value change between `compared_to_year/month` and `year/month`, e.g. `-20`
  - `percentage_change` - Metric value change between `compared_to_year/month` and `year/month` in percentage, e.g. `-0.12`

### Corrections (Annual)
Found in [`/src/data/corrections_annual.json`](src/data/corrections_annual.json).

Read into `App.js` where it is provided as `correctionsAnnualData`, this file contains an array of metric data points.

The file is in JSON Lines format, with different json objects separated by newlines. Each object contains a data point
aggregated at the annual level. The spec is identical to the above spec for monthly-aggregated corrections data.

The difference is in how the metrics are prepared on the backend:
* If a metric is "natively" annual, use the metric as is. The date associated with the metric should be the last month in the range of aggregation.
* If a metric is monthly, aggregate 12 months of monthly data according to a pre-established date range (as long as there is data available for all the months). In order to promote consistency with other metrics on the page, this range should align with the majority of the metrics on the page; the date associated should also be the last month in the range of aggregation.
* If none of the metrics are reported annually in the original reports, the pre-established date range should align with the most recently reported data.
* For any population counts (Prison, Probation, Parole), use the population from the last month in the date range of interest.

### Jails

Found in [`/src/data/jails_data.json`](src/data/jails_data.json).

Read into `App.js` where it is provided as `jailsData`, this file contains an array of metric data points.

The file is in JSON Lines format, with different json objects separated by newlines. Each object contains a data point
corresponding to a metric matching the spec below:

- `state_code` - state code, e.g. `US_CO`
- `county_code` - county code, e.g. `US_CO_ARAPAHOE`
  - If not county code is provided, then this metric represents an aggregation from county level up to state level. Any metric that does not have a `county_code` should have the following fields instead:
    - `percentage_covered_county` - percentage of counties in the state that this report is aggregated from (i.e. number of represented counties / number of total counties)
    - `percentage_covered_population` - percentage of state population that this report is aggregated from (i.e. total size of population summed up from represented counties / total state population)
- `metric` - metric name, e.g. `POPULATION_JAIL`
- `year` - year, e.g. `2020`
- `month` - month (01-12), e.g. `02` or `2` (leading zero is not required)
- `date_reported` - Date when the metric was reported, e.g. `2019-12-31`
- `data_published` - Date when the metric was published, e.g. `2020-01-15`
- `value` - Value of the metric, e.g. `500` or `50.7`

### Counties

Found in [`/src/data/counties_data.json`](src/data/counties_data.json).

Read into `App.js` where it is provided as `countiesData`, this file contains an array of objects.

The file is in JSON Lines format, with different json objects separated by newlines. Each object represents a
particular county in the United States, across all states, matching the spec below:
- `state_code` - state code, e.g. `US_CO`
- `county_code` - county code, e.g. `US_CO_ARAPAHOE`
- `name` - a human-friendly, readable county name, e.g. `Arapahoe County`
- `population` - the total population of the county (_not_ the total _incarcerated_ or otherwise justice-impacted population of the county)
