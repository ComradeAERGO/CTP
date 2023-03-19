const axios = require("axios");

const BASE_URL = "http://localhost:3100/api/ongoing-trials";

const getOngoingTrials = async (sponsor) => {
  const { default: chalk } = await import("chalk");

  try {
    const response = await axios.get(`${BASE_URL}/${sponsor}`);
    console.log(chalk.green(JSON.stringify(response.data, null, 2)));
    return response.data;
  } catch (error) {
    console.error(chalk.red("Error fetching ongoing trials:", error.message));
  }
};

module.exports = {
  getOngoingTrials,
};
