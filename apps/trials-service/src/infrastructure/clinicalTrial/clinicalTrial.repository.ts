import ClinicalTrial from "../../domain/clinicalTrial";

interface ClinicalTrialRepository {
  getAll(): Promise<ClinicalTrial[]>;
  getBySponsor(sponsor: string): Promise<ClinicalTrial[]>;
  getByCountry(country: string): Promise<ClinicalTrial[]>;
}

export default ClinicalTrialRepository;
