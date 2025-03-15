import * as z from "zod";

export const loginUserSchema = z.object({
  email: z
    .string({ required_error: "Email is required" })
    .min(1, "Email is required")
    .email("Invalid email address"),
  password: z
    .string({ required_error: "Password is required" })
    .min(1, "Password is required"),
});

export const registerUserSchema = z.object({
  birthDate: z.any(),
  email: z
    .string({ required_error: "Email is required" })
    .min(1, "Email is required")
    .email("Invalid email address"),
  firstName: z
    .string({ required_error: "First name is required" })
    .min(1, "First name is required"),
  gender: z.enum(["Male", "Female"]),
  idNumber: z
    .string({ required_error: "ID Number is required" })
    .min(1, "ID Number is required"),
  lastName: z
    .string({ required_error: "Last name is required" })
    .min(1, "Last name is required"),
  password: z
    .string({ required_error: "Password is required" })
    .min(1, "Password is required")
    .min(8, "Password must be at least 8 characters"),
  permanentLocation: z
    .string({ required_error: "Permanent location is required" })
    .min(1, "Permanent location is required"),
  phoneNumber: z
    .string({ required_error: "Phone number is required" })
    .min(1, "Phone number is required")
    .regex(
      /^(\+\d{1,3}[- ]?)?\d{1,4}[- ]?\d{1,4}[- ]?\d{1,4}[- ]?\d{1,4}$/,
      "Invalid phone number"
    ),
});

export type loginUserForm = z.infer<typeof loginUserSchema>;
export type registerUserForm = z.infer<typeof registerUserSchema>;
