
# Clinical Trials Project

💈Welcome to the CTP Monorepo💈

This repository is composed of two apps :
- `trials-service` Which is the service that exposes a resource of clinical trials
- `trials-cli` - A command line interface that offers a convenient UX to access the clinical trials resources

We are using using [turborepo](https://turbo.build/repo/docs) to build the whole project

## API Reference

#### Filter the trials by sponsor

```http
  GET /api/ongoing-trials?sponsor=${sponsor}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `sponsor` | `string` | sponsor to filter the trials.     |

#### Filter the trials by country

```http
  GET /api/ongoing-trials?country=${country}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `country` | `string` | country to filter trials.         |




## Installation

Install the project with yarn

```bash
  yarn install
```

## Running Tests

To run tests, run the following command

```bash
  turbo test
```

