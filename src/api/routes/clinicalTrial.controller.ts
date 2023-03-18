import express, { Request, Response } from "express";
import ClinicalTrialService from "../../application/clinicalTrialService";
import { MockClinicalTrialRepository } from "../../infrastructure/clinicalTrial/mocks.adapter";
import redis from "../../config/redis.config";

const router = express.Router();
const clinicalTrialRepository = new MockClinicalTrialRepository();
const clinicalTrialService = new ClinicalTrialService(clinicalTrialRepository);

const getOngoingTrials = async (req: Request, res: Response) => {
  const sponsor = req.params.sponsor;

  const cacheKey = `ongoing_clinical_trials:${sponsor}`;

  try {
    if (!redis.isOpen) {
      await redis.connect();
    }

    const cachedData = await redis.get(cacheKey);
    if (cachedData) {
      return res.json(JSON.parse(cachedData));
    }
    const clinicalTrials = await clinicalTrialService.getOngoingTrialsBySponsor(
      sponsor
    );

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

const handleMissingSponsor = (req: Request, res: Response) => {
  res.status(400).json({ message: "Please pass a sponsor to your request" });
};

router.get("/ongoing-trials", handleMissingSponsor);
router.get("/ongoing-trials/", handleMissingSponsor);
router.get("/ongoing-trials/:sponsor", getOngoingTrials);

export default router;
