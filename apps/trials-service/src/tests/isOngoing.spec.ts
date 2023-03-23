import { ClinicalTrialSchema } from "../infrastructure/clinicalTrial/schemas";
import ClinicalTrial from "../domain/clinicalTrial";
import clinicalTrialMocks from "../infrastructure/clinicalTrial/mocks.json";
import isOngoing from "../utils/isOngoing";

const mockClinicalTrials = clinicalTrialMocks;
describe("isOngoing util", () => {
  //GIVEN
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

  it("should return true if the trial is ongoing", () => {
    //WHEN
    const isTrialOngoing = isOngoing(mockData[0]);
    //THEN
    expect(isTrialOngoing).toEqual(true);
  });

  it("should return false if the trial is ongoing", () => {
    //WHEN
    const isTrialOngoing = isOngoing(mockData[1]);
    //THEN
    expect(isTrialOngoing).toEqual(false);
  });
});
