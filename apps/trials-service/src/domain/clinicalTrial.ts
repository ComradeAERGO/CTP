class ClinicalTrial {
  name: string;
  country: string;
  startDate: Date;
  endDate: Date;
  sponsor: string;
  canceled: boolean;
  studyType: string;
  primaryPurpose: string;

  constructor(
    name: string,
    country: string,
    startDate: Date,
    endDate: Date,
    sponsor: string,
    canceled: boolean,
    studyType: string,
    primaryPurpose: string
  ) {
    this.name = name;
    this.country = country;
    this.startDate = startDate;
    this.endDate = endDate;
    this.sponsor = sponsor;
    this.canceled = canceled;
    this.studyType = studyType;
    this.primaryPurpose = primaryPurpose;
  }
}

export default ClinicalTrial;
