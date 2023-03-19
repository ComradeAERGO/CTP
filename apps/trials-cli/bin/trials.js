#!/usr/bin/env node

const axios = require("axios");
const commander = require("commander");
const countries = require("../countries.json");

const BASE_URL = "http://localhost:3100/api/ongoing-trials";

const getOngoingTrials = async (country) => {
  const { default: chalk } = await import("chalk");

  try {
    const { data } = await axios.get(`${BASE_URL}/?country=${country}`);
    return data;
  } catch (error) {
    console.error(chalk.red("Error fetching ongoing trials:", error.message));
  }
};

const setPlural = (trials) => (trials.length > 1 ? "s" : "");

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
          if (value.length) {
            return true;
          } else {
            return "Please enter a valid country name.";
          }
        },
      },
    ];

    const { country } = await inquirer.prompt(questions);
    return country;
  };

  let country = commander.opts().country;

  if (!country) {
    country = await askForCountry();
  }

  try {
    const trials = await getOngoingTrials(country);
    console.log(
      chalk.green(
        `Found ${trials.length} clinical trial${setPlural(
          trials
        )} for country: ${country}`
      )
    );
    trials.forEach((trial) => console.log(chalk.magenta(trial.name)));
  } catch (error) {
    console.error(chalk.red("Error fetching clinical trials:", error.message));
  }
};

main();
