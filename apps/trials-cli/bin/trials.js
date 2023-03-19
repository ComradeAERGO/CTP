#!/usr/bin/env node

const { getOngoingTrials } = require("../src/index");
const commander = require("commander");

commander
  .option("-s, --sponsor <sponsor>", "Sponsor name to filter clinical trials")
  .parse(process.argv);

const main = async () => {
  const { default: inquirer } = await import("inquirer");
  const { default: chalk } = await import("chalk");

  const askForSponsor = async () => {
    const questions = [
      {
        type: "input",
        name: "sponsor",
        message: "Please enter the sponsor name:",
        validate: function (value) {
          if (value.length) {
            return true;
          } else {
            return "Please enter a valid sponsor name.";
          }
        },
      },
    ];

    const answers = await inquirer.prompt(questions);
    return answers.sponsor;
  };

  let sponsor = commander.opts().sponsor;

  if (!sponsor) {
    sponsor = await askForSponsor();
  }

  try {
    const trials = await getOngoingTrials(sponsor);
    console.log(
      chalk.green(
        `Found ${trials.length} clinical trials for sponsor: ${sponsor}`
      )
    );
    console.log(trials);
  } catch (error) {
    console.error(chalk.red("Error fetching clinical trials:", error.message));
  }
};

main();
