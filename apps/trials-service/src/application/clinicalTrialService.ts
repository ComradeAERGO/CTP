import ClinicalTrialRepository from "../infrastructure/clinicalTrial/clinicalTrial.repository";
import isOngoing from "../utils/isOngoing";
import ClinicalTrial from "../domain/clinicalTrial";

class ClinicalTrialService {
  private clinicalTrialRepository: ClinicalTrialRepository;

  constructor(clinicalTrialRepository: ClinicalTrialRepository) {
    this.clinicalTrialRepository = clinicalTrialRepository;
  }

  async getOngoingTrialsBySponsor(sponsor: string): Promise<ClinicalTrial[]> {
    const trials = await this.clinicalTrialRepository.getBySponsor(sponsor);
    return trials.filter(isOngoing);
  }

  async getOngoingTrialsByCountry(country: string): Promise<ClinicalTrial[]> {
    const trials = await this.clinicalTrialRepository.getByCountry(country);
    return trials.filter(isOngoing);
  }
}

export default ClinicalTrialService;
