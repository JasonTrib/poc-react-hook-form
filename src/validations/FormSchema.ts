import { z } from "zod";

const FormSchema = z.object({
    companyName: z.string().trim().min(3, "Must be at least 3 characters long!"),
    password: z.string().min(4, "Must be at least 4 characters long!"),
    confirmPassword: z.string().min(4, "Must be at least 4 characters long!"),
    selectLang: z.string(),
    isPrimary: z.boolean(),
    radio: z.string().or(z.null()),
    hasOffice: z.boolean(),
    daysPto: z.coerce.number().min(0, "Must be positive!").max(60, "Must be at most 60!"),
    address: z.string().trim().min(1, 'Required!').optional(),
    invoice: z.array(z.object({
            vatNumber: z.coerce.number().refine((val) => String(val).match(/^$|^\d{10,15}$/), "Must be between 10 and 15 digits!")
        })),
    }).refine((schema) => schema.password === schema.confirmPassword, {
        message: "Passwords do not match!",
        path: ["confirmPassword"],
    });
    
export default FormSchema;

export type FormSchemaT = z.infer<typeof FormSchema>;