
# Clinical Trials Project

💈Welcome to the CTP Monorepo💈

This repository is composed of two apps :
- `trials-service` Which is the service that exposes a resource of clinical trials
- `trials-cli` - A command line interface that offers a convenient UX to access the clinical trials resources

We are using using [turborepo](https://turbo.build/repo/docs) to build the whole project

## Installation

Clone the repository

```bash
  git clone git@github.com:ComradeAERGO/CTP.git
  cd CTP
```

Add the .env file to the root of the `trials-service` project
Use the password to your redislab instance (or ask the maintainer for a password)

```bash
  cp .env.example .env
```

Then install the dependencies for both of the repos, just launch yarn from the root of the project

```bash
  yarn 
```

To setup the cli app, go the `trials-cli` folder and link the package

```bash
  cd apps/trials-cli
  npm link
```

You can now use the cli app from anywhere on your machine, simply run `trials`

```bash
  trials
```
## Running Tests

To run the tests, run the following command

```bash
  turbo test
```

## Running the trials-service app

Run the following command and the server will start on `http://localhost:3100`
```bash
  turbo dev
```

## Tech Stack

For the trials-service app
- `typescript` as the base language
- `express` as the main server framework
- `redis` for caching
- `jest` for testing
- `dotenv` to handle .env file
- `nodemon` to watch for changes
- `turborepo` to handle the monorepo
- `prettier` for code formatting

## Architecture

Please find hereafter a diagram of the architecture of the trials-service app

![Architecture Diagram](https://aerg.infura-ipfs.io/ipfs/Qmd7R4ZvQU1jDrti2cXg68cYrKgspN2U26Yk3jw5EVto4f)

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


## Limitations

### Trials-service

#### Deployment
- The service is not yet deployed, this project is therefore agnostic to the deployment environment and the CI pipeline.
- If we wanted to work into a cloud environment like Google Cloud Platform, we would have several options for the trials-service app:
  - Deploy directly into Google App Engine to reduce the required amount of manual configuration
  - Containerize into a docker container through docker-compose and deploy it to GCP Cloud Run
- Both options would enable us to scale the service horizontally and vertically, and to monitor it through GCP's monitoring and logging tools.
- Of course, other major cloud providers like AWS and Azure also offers similar capabilities.

#### Type validation
- Usage of zod for type validation is currently limited to the infrastructure layer, when parsing data coming in from the JSON mocks. Since the mocks are immutable, it doesn't provide a lot of value. However, when plugged in to external data source, it would actually provide runtime type safety from potentially corruptible data source.

### Trials-cli
- Regarding the distribution of the trials-cli app, one of the most convenient options would be to bundle it into an npm package, publish it into a private repository, and install it globally using npm on the targeted machines.

