import ClinicalTrialService from "../application/clinicalTrialService";
import { MockClinicalTrialRepository } from "../infrastructure/clinicalTrial/mocks.adapter";

describe("ClinicalTrialService", () => {
  const clinicalTrialRepository = new MockClinicalTrialRepository();
  const clinicalTrialService = new ClinicalTrialService(
    clinicalTrialRepository
  );

  describe("getOngoingTrialsBySponsor", () => {
    it("should return ongoing trials for the given sponsor", async () => {
      // GIVEN
      const sponsor = "Sanofi";

      // WHEN
      const ongoingTrials =
        await clinicalTrialService.getOngoingTrialsBySponsor(sponsor);

      // THEN
      expect(ongoingTrials).toHaveLength(1);
      ongoingTrials.forEach((trial) => {
        expect(trial.sponsor).toEqual(sponsor);
        expect(trial.startDate).toBeInstanceOf(Date);
        expect(trial.endDate).toBeInstanceOf(Date);
        expect(trial.canceled).toBe(false);

        const currentDate = new Date();
        expect(trial.startDate <= currentDate).toEqual(true);
        expect(trial.endDate >= currentDate).toEqual(true);
      });
    });
  });

  describe("getOngoingTrialsByCountry", () => {
    it("should return ongoing trials for the given country", async () => {
      // GIVEN
      const country = "FR";

      // WHEN
      const ongoingTrials =
        await clinicalTrialService.getOngoingTrialsByCountry(country);

      // THEN
      expect(ongoingTrials).toHaveLength(1);
      ongoingTrials.forEach((trial) => {
        expect(trial.country).toEqual(country);
        expect(trial.startDate).toBeInstanceOf(Date);
        expect(trial.endDate).toBeInstanceOf(Date);
        expect(trial.canceled).toBe(false);

        const currentDate = new Date();
        expect(trial.startDate <= currentDate).toEqual(true);
        expect(trial.endDate >= currentDate).toEqual(true);
      });
    });
  });
});
