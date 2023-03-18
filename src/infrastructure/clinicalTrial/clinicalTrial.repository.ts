import ClinicalTrial from "../../domain/clinicalTrial";

interface ClinicalTrialRepository {
  getAll(): Promise<ClinicalTrial[]>;
  getBySponsor(sponsor: string): Promise<ClinicalTrial[]>;
}

export default ClinicalTrialRepository;
