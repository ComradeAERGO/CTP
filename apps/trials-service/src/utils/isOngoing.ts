import ClinicalTrial from "../domain/clinicalTrial";

const isOngoing = (trial: ClinicalTrial) => {
  const currentDate = new Date();
  const isStarted = trial.startDate <= currentDate;
  const isNotEnded = trial.endDate >= currentDate;
  const isNotCanceled = !trial.canceled;

  return isStarted && isNotEnded && isNotCanceled;
};

export default isOngoing;
