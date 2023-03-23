#!/usr/bin/env node
import { program } from "commander";
import chalk from "chalk";
import inquirer from "inquirer";
import countries from "./countries.json" assert { type: "json" };
import { getOngoingTrials } from "./trials.controller.js";
import { setPlural } from "./trials.utils.js";
program
    .option("-c, --country <country>", "Country to filter clinical trials")
    .parse(process.argv);
const main = async () => {
    const askForCountry = async () => {
        const questions = [
            {
                type: "list",
                name: "country",
                message: "Please enter the country name:",
                choices: countries.reduce((acc, country) => [
                    ...acc,
                    {
                        name: country.name,
                        value: { name: country.name, code: country.code },
                    },
                ], []),
                validate: (value) => {
                    if (value.length) {
                        return true;
                    }
                    else {
                        return "Please enter a valid country name.";
                    }
                },
            },
        ];
        const { country } = await inquirer.prompt(questions);
        return country;
    };
    let country = program.opts().country;
    if (!country) {
        country = await askForCountry();
    }
    try {
        const trials = await getOngoingTrials(country.code);
        console.log(chalk.green(`Found ${trials.length} clinical trial${setPlural(trials)} for country: ${country.name}`));
        trials.forEach((trial) => console.log(chalk.magenta(`${trial.name}, ${country.name}`)));
    }
    catch (error) {
        console.error(chalk.red("Error fetching clinical trials:", error.message));
    }
};
main();
