import axios from "axios";
import chalk from "chalk";

const BASE_URL = "http://localhost:3100/api/ongoing-trials";

export const getOngoingTrials = async (country: string) => {
  try {
    const { data } = await axios.get(`${BASE_URL}/?country=${country}`);
    return data;
  } catch (error: any) {
    console.error(chalk.red("Error fetching ongoing trials:", error.message));
  }
};
