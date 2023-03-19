
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

## Limitations

- The service is not yet deployed

## Tech Stack

- `typescript` as the base language
- `express` as the main server framework
- `redis` for caching
- `jest` for testing
- `dotenv` to handle .env file
- `nodemon` to watch for changes
- `turborepo` to handle the monorepo
- `prettier` for code formatting
- 
## Architecture

At the root of the project lies the monorepo config files as well as the apps folder.
Two projects are contained under the app folder:
- `trials-service`
- `trials-cli`

The `trials-service` app was built with the intent of following Hexagonal architecture patterns, in an attempt to try to keep its parts as loosely coupled as possible.

As a whole, the trials-service app is a simple server that exposes a resource of clinical trials. It is composed of several parts:
- `domain` - The domain layer
- `application` - The application layer, which contains the business logic
- `infrastructure` - The infrastructure layer, which contains the implementation of the business logic
- `api` - The api layer, which contains the express server and the controllers for the exposed routes
- `tests` - The tests folder, which contains a few unit tests
- `utils` - The utils folder, which contains shared utility methods
