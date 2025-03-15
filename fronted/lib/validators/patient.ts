import * as z from "zod";

export const journalSchema = z.object({
    entry: z.string({ required_error: "Journal entry is required" }).min(1, "Journal entry is required"),
})

export type journalForm = z.infer<typeof journalSchema>;