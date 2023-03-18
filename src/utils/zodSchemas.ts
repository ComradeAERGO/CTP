import { z } from "zod";

const dateSchema = z.string().refine((value) => !isNaN(Date.parse(value)), {
  message: "Invalid date format",
});

const SponsorSchema = z.object({
  name: z.string(),
});

const ClinicalTrialSchema = z.object({
  name: z.string(),
  country: z.string(),
  start_date: dateSchema,
  end_date: dateSchema,
  sponsor: z.string(),
  canceled: z.boolean(),
  study_type: z.string(),
  primary_purpose: z.string(),
});

export { ClinicalTrialSchema, SponsorSchema };
