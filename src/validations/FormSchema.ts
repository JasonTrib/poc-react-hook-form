import { z } from "zod";

export const FormStep1Schema = z
  .object({
    username: z.string().trim().min(3, "Must be at least 3 characters long!"),
    password: z.string().min(4, "Must be at least 4 characters long!"),
    confirmPassword: z.string().min(4, "Must be at least 4 characters long!"),
  })
  .refine((schema) => schema.password === schema.confirmPassword, {
    message: "Passwords do not match!",
    path: ["confirmPassword"],
  });

export const FormStep2Schema = z
  .object({
    companyName: z.string().trim().min(2, "Must be at least 2 characters long!"),
    isPrimary: z.boolean(),
    radio: z.enum(["AM", "FM"]).nullable(),
    selectLang: z.enum(["EN", "EL", "ES", "FR"]),
    daysPto: z.coerce.number().min(0, "Must be positive!").max(60, "Must be at most 60!"),
    invoice: z.array(
      z.object({
        vatNumber: z.string().regex(/^$|^\d{10,15}$/, "Must be between 10 and 15 digits!"),
      })
    ),
    hasOffice: z.boolean(),
    address: z.string().trim().optional(),
  })
  .refine((schema) => (schema.hasOffice && !schema.address ? false : true), {
    message: "Required!",
    path: ["address"],
  });

export const FormSchema = FormStep1Schema.and(FormStep2Schema);

export type FormStep1SchemaT = z.infer<typeof FormStep1Schema>;
export type FormStep2SchemaT = z.infer<typeof FormStep2Schema>;
export type FormSchemaT = z.infer<typeof FormSchema>;
