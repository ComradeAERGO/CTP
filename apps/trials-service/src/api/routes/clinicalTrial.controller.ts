import express, { Request, Response } from "express";
import ClinicalTrialService from "../../application/clinicalTrialService";
import { MockClinicalTrialRepository } from "../../infrastructure/clinicalTrial/mocks.adapter";
import redis from "../../config/redis.config";
import ClinicalTrial from "../../domain/clinicalTrial";

const router = express.Router();
const clinicalTrialRepository = new MockClinicalTrialRepository();
const clinicalTrialService = new ClinicalTrialService(clinicalTrialRepository);

const getOngoingTrials = async (req: Request, res: Response) => {
  type QueryParam = string | undefined;
  const sponsor = req.query.sponsor as QueryParam;
  const country = req.query.country as QueryParam;

  const cacheKey = `ongoing_clinical_trials:${country}${sponsor}`;

  let clinicalTrials: ClinicalTrial[] = [];

  try {
    if (!redis.isOpen) {
      await redis.connect();
    }

    const cachedData = await redis.get(cacheKey);

    if (cachedData) {
      return res.json(JSON.parse(cachedData));
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

    await redis.setEx(cacheKey, 3600, JSON.stringify(ongoingTrials));
    await redis.disconnect();

    res.json(ongoingTrials);
  } catch (error) {
    await redis.disconnect();
    return res.status(500).json({ message: "Internal server error", error });
  }
};

router.get("/ongoing-trials", getOngoingTrials);

export default router;
