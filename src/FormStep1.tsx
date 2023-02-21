import { DevTool } from "@hookform/devtools";
import { zodResolver } from "@hookform/resolvers/zod";
import { useContext, useEffect } from "react";
import { SubmitHandler, useFieldArray, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { radioOptions, selectLangOptions } from "./data/data";
import { JobsFormContext } from "./routes/Jobs";
import "./styles/form.css";
import FormSchema, { FormSchemaT } from "./validations/FormSchema";

function FormStep1() {
  const navigate = useNavigate();
  const { formData, setFormData } = useContext(JobsFormContext);
  const {
    register,
    unregister,
    handleSubmit,
    formState: { errors },
    control,
    reset,
    watch,
  } = useForm<FormSchemaT>({
    resolver: zodResolver(FormSchema),
    defaultValues: formData,
    // shouldUnregister: true,
    // mode: "onBlur",
    // mode: "onChange",
    // reValidateMode: "onBlur",
  });
  const { fields, append, remove } = useFieldArray({
    name: "invoice",
    control,
  });

  const onSubmit: SubmitHandler<FormSchemaT> = (data) => {
    setFormData(data);
    navigate("../step-2");
  };
  const handleReset = () =>
    reset({
      companyName: "",
      password: "",
      confirmPassword: "",
      selectLang: "EL",
      isPrimary: false,
      radio: "",
      daysPto: 0,
      invoice: [],
      hasOffice: false,
    });
  const officeFieldValue = watch("hasOffice");

  useEffect(() => {
    if (officeFieldValue === false) {
      unregister("address");
    }
  }, [unregister, officeFieldValue]);

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="form">
        <button onClick={handleReset}>Reset</button>

        <label htmlFor="companyName">
          <span>Company name</span>
          <input type="text" {...register("companyName")} />
          <span className="error">{errors.companyName?.message}</span>
        </label>

        <label htmlFor="password">
          <span>Password</span>
          <input type="password" {...register("password", { deps: ["confirmPassword"] })} />
          <span className="error">{errors.password?.message}</span>
        </label>

        <label htmlFor="confirmPassword">
          <span>Confirm password</span>
          <input type="password" {...register("confirmPassword")} />
          <span className="error">{errors.confirmPassword?.message}</span>
        </label>

        <label htmlFor="selectLang">
          <span>Select language</span>
          <select {...register("selectLang")}>
            {selectLangOptions.map((value) => (
              <option key={value} value={value}>
                {value}
              </option>
            ))}
          </select>
          <span className="error">{errors.selectLang?.message}</span>
        </label>

        <label>
          <input type="checkbox" {...register("isPrimary")} />
          <span>Primary</span>
          <span className="error">{errors.isPrimary?.message}</span>
        </label>

        <div>
          <span>Radio</span>
          {radioOptions.map((value) => (
            <label key={value}>
              <input {...register("radio")} type="radio" value={value} />
              {value}
            </label>
          ))}
          <span className="error">{errors.radio?.message}</span>
        </div>

        <label htmlFor="daysPto">
          <span>Days PTO</span>
          <input type="number" {...register("daysPto")} />
          <span className="error">{errors.daysPto?.message}</span>
        </label>

        {fields.map((field, idx) => (
          <div key={field.id}>
            <label htmlFor="vat">
              <span>VAT</span>
              <input type="number" {...register(`invoice.${idx}.vatNumber` as const)} />
              <span className="error">{errors.invoice?.[idx]?.vatNumber?.message}</span>
            </label>
            <button type="button" onClick={() => remove(idx)}>
              ✖
            </button>
          </div>
        ))}
        <button type="button" onClick={() => append({ vatNumber: null })}>
          ➕ VAT
        </button>

        <label>
          <input type="checkbox" {...register("hasOffice")} />
          <span>Office</span>
          <span className="error">{errors.hasOffice?.message}</span>
        </label>

        {officeFieldValue === true && (
          <label htmlFor="address">
            <span>Address</span>
            <input type="text" {...register("address")} />
            <span className="error">{errors.address?.message}</span>
          </label>
        )}

        <button type="submit">Next</button>
      </form>
      <DevTool control={control} />
    </>
  );
}

export default FormStep1;
