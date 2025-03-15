import * as z from "zod";

export const triageSchema = z.object({
  blood_pressure: z
    .string({ required_error: "Blood pressure is required" })
    .min(1, "Blood pressure is required"),
  weight: z
    .string({ required_error: "Weight is required" })
    .min(1, "Weight is required"),
  height: z
    .string({ required_error: "Height is required" })
    .min(1, "Height is required"),
});

export type triageForm = z.infer<typeof triageSchema>;