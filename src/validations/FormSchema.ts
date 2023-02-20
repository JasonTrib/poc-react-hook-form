import { z } from "zod";
import formFields from "./../data/formFields";

export type FormSchemaT = z.infer<typeof FormSchema>;

const FormSchema = z.object({
    [formFields.companyName.name]: z.string().trim().min(3, "Must be at least 3 characters long!"),
    [formFields.password.name]: z.string().min(4, "Must be at least 4 characters long!"),
    [formFields.confirmPassword.name]: z.string().min(4, "Must be at least 4 characters long!"),
    [formFields.selectLang.name]: z.string(),
    [formFields.primary.name]: z.boolean(),
    [formFields.radio.name]: z.string().or(z.null()),
    [formFields.vat.name]: z.string(),
    [formFields.office.name]: z.boolean(),
    [formFields.address.name]: z.string().trim().min(1, 'Required!').optional(),
}).refine((schema) => schema.password === schema.confirmPassword, {
    message: "Passwords do not match!",
    path: [formFields.confirmPassword.name],
});

export default FormSchema;

