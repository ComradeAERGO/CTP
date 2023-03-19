#!/usr/bin/env node

const axios = require("axios");
const commander = require("commander");
const countries = require("../countries.json");

const BASE_URL = "http://localhost:3100/api/ongoing-trials";

const getOngoingTrials = async (country) => {
  const { default: chalk } = await import("chalk");

  countries.forEach((country) => console.log(chalk.magenta(country.name)));

  try {
    const response = await axios.get(`${BASE_URL}/?country=${country}`);
    console.log(chalk.green(JSON.stringify(response.data, null, 2)));
    return response.data;
  } catch (error) {
    console.error(chalk.red("Error fetching ongoing trials:", error.message));
  }
};

commander
  .option("-c, --country <country>", "Country to filter clinical trials")
  .parse(process.argv);

const main = async () => {
  const { default: inquirer } = await import("inquirer");
  const { default: chalk } = await import("chalk");

  const askForCountry = async () => {
    const questions = [
      {
        type: "list",
        name: "country",
        message: "Please enter the country name:",
        choices: countries.reduce(
          (acc, country) => [
            ...acc,
            {
              name: country.name,
              value: country.code,
            },
          ],
          []
        ),
        validate: function (value) {
          console.log(value);
          if (value.length) {
            return true;
          } else {
            return "Please enter a valid country name.";
          }
        },
      },
    ];

    const answers = await inquirer.prompt(questions);
    console.log(answers);
    return answers.country;
  };

  let country = commander.opts().country;

  if (!country) {
    country = await askForCountry();
  }

  try {
    const trials = await getOngoingTrials(country);
    console.log(
      chalk.green(
        `Found ${trials.length} clinical trials for country: ${country}`
      )
    );
    console.log(trials);
  } catch (error) {
    console.error(chalk.red("Error fetching clinical trials:", error.message));
  }
};

main();
