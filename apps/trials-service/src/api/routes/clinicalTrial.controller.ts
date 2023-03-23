import express, { NextFunction, Request, Response } from "express";
import ClinicalTrialService from "../../application/clinicalTrial.service";
import { MockClinicalTrialRepository } from "../../infrastructure/clinicalTrial/mocks.adapter";
import ClinicalTrial from "../../domain/clinicalTrial";
import { cacheMiddleware } from "../cache.middleware";
import { BadRequestError } from "../error.middleware";

const router = express.Router();
const clinicalTrialRepository = new MockClinicalTrialRepository();
const clinicalTrialService = new ClinicalTrialService(clinicalTrialRepository);

const getOngoingTrials = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  type QueryParam = string | undefined;
  const sponsor = req.query.sponsor as QueryParam;
  const country = req.query.country as QueryParam;

  let clinicalTrials: ClinicalTrial[] = [];

  try {
    if (country?.length !== 2) {
      return next(
        new BadRequestError(
          "Country should be expressed as a 2 characters code, for instance 'it' for Italy, 'fr' for France, etc..."
        )
      );
    }

    const queryParamIsDefined = (sponsor: QueryParam): sponsor is string => {
      return sponsor !== undefined;
    };

    if (queryParamIsDefined(sponsor)) {
      clinicalTrials = await clinicalTrialService.getOngoingTrialsBySponsor(
        sponsor
      );
    }

    if (queryParamIsDefined(country)) {
      clinicalTrials = await clinicalTrialService.getOngoingTrialsByCountry(
        country
      );
    }

    const ongoingTrials = clinicalTrials.map((trial) => ({
      name: trial.name,
      start_date: trial.startDate.toISOString().split("T").at(0),
      end_date: trial.endDate.toISOString().split("T").at(0),
      sponsor: trial.sponsor,
    }));

    return res.json(ongoingTrials);
  } catch (error) {
    return next(error);
  }
};

router.get(
  "/ongoing-trials",
  cacheMiddleware("ongoing_clinical_trials:"),
  getOngoingTrials
);

export default router;
