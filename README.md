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

The main app component should receive 2 required properties: `data` and `stateCode`.

`stateCode` controls which state we should be visualizing data for, in a format of `US_XX`, e.g. `US_CO` or `US_PA`.

`data` is an array of metric data points, in the format described below.

For now, the `data.json` file is used to provide data to the app components. It lives in `src/data.json` but could be moved around trivially, or pulled from a CDN or an API, for different deployment styles.

An _example_ of a valid `data.json` file can be found in [`data.json`](src/data.json).

`data.json` contains a JSON array where each object has the following fields:

- `state_code` - state code, e.g. `US_CO`
- `metric` - metric name, e.g. `RELEASES`
- `year` - year, e.g. `2020`
- `month` - month (01-12), e.g. `02` or `2` (leading zero is not required)
- `date_reported` - Date when the metric was reported, e.g. `2019-12-31`
- `value` - Value of the metric, e.g. `500`
- `compared_to_year` - The year of the comparison data point, which is the most recent data point to compare against for trend analysis, no less than one year before this current data point, e.g. `2019`
- `compared_to_month` - The month of the comparison data point, which is the most recent data point to compare against for trend analysis, no less than one year before this current data point, e.g. `04`
- `value_change` - Metric value change between `compared_to_year/month` and `year/month`, e.g. `-20`
- `percentage_change` - Metric value change between `compared_to_year/month` and `year/month` in percents, e.g. `-0.12`
- `source_name` - Name of the data source provider
- `source_url` - URL of the data source provider
- `report_name` - Human-friendly report name
- `raw_source_categories` - Categories of data provided by the data source
