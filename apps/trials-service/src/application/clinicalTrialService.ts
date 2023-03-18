import ClinicalTrial from "../domain/clinicalTrial";
import ClinicalTrialRepository from "../infrastructure/clinicalTrial/clinicalTrial.repository";

class ClinicalTrialService {
  private clinicalTrialRepository: ClinicalTrialRepository;

  constructor(clinicalTrialRepository: ClinicalTrialRepository) {
    this.clinicalTrialRepository = clinicalTrialRepository;
  }

  async getOngoingTrialsBySponsor(sponsor: string): Promise<ClinicalTrial[]> {
    const trials = await this.clinicalTrialRepository.getBySponsor(sponsor);
    const currentDate = new Date();

    return trials.filter((trial) => {
      const isStarted = trial.startDate <= currentDate;
      const isNotEnded = trial.endDate >= currentDate;
      const isNotCanceled = !trial.canceled;

      return isStarted && isNotEnded && isNotCanceled;
    });
  }
}

export default ClinicalTrialService;
