import { ClinicalTrialSchema } from "../../utils/zodSchemas";
import ClinicalTrial from "../../domain/clinicalTrial";
import ClinicalTrialRepository from "./clinicalTrial.repository";
import clinicalTrialMocks from "./mocks.json";

const mockClinicalTrials = clinicalTrialMocks;

// Use zod to validate the data
// Then create a ClinicalTrial instance object
const mockData = mockClinicalTrials.map((trial) => {
  const validatedTrial = ClinicalTrialSchema.parse(trial);
  return new ClinicalTrial(
    validatedTrial.name,
    validatedTrial.country,
    new Date(validatedTrial.start_date),
    new Date(validatedTrial.end_date),
    validatedTrial.sponsor,
    validatedTrial.canceled,
    validatedTrial.study_type,
    validatedTrial.primary_purpose
  );
});

class MockClinicalTrialRepository implements ClinicalTrialRepository {
  async getAll(): Promise<ClinicalTrial[]> {
    return mockData;
  }

  async getBySponsor(sponsor: string): Promise<ClinicalTrial[]> {
    return mockData.filter(
      (trial) => trial.sponsor.toLowerCase() === sponsor.toLowerCase()
    );
  }

  async getByCountry(country: string): Promise<ClinicalTrial[]> {
    return mockData.filter(
      (trial) => trial.country.toUpperCase() === country.toUpperCase()
    );
  }
}

export { MockClinicalTrialRepository };
