import { DevTool } from '@hookform/devtools';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import formFields from "./data/formFields";
import './Form.css';
import FormSchema, { FormSchemaT } from "./validations/FormSchema";

function Form() {
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
    defaultValues: {
      [formFields.companyName.name]: 'XE',
      [formFields.password.name]: '',
      [formFields.confirmPassword.name]: '',
      [formFields.selectLang.name]: 'EL',
      [formFields.primary.name]: true,
      [formFields.radio.name]: '',
      [formFields.vat.name]: '69',
    },
    // shouldUnregister: true,
    // mode: "onBlur",
    // mode: "onChange",
    // reValidateMode: "onBlur",
  });
  const onSubmit: SubmitHandler<FormSchemaT> = (data) => console.log('Submitted:', data);
  const handleReset = () => reset({
    [formFields.primary.name]: false,
    [formFields.vat.name]: "101"
  });

  const officeFieldValue = watch(formFields.office.name);

  useEffect(() => {
    if(officeFieldValue === false){
      unregister(formFields.address.name);
    }
  }, [unregister, officeFieldValue])
  
  console.log("rendered:", errors);

  return (
    <>
      <h1>React hook form</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="form">
        <button onClick={handleReset}>Reset</button>

        <label htmlFor={formFields.companyName.name}>
          <span>{formFields.companyName.label}</span>
          <input type="text" placeholder={formFields.companyName.placeholder} {...register(formFields.companyName.name)} />
          <span className="error">{errors.companyName?.message}</span>
        </label>

        <label htmlFor={formFields.password.name}>
          <span>{formFields.password.label}</span>
          <input type="password" placeholder={formFields.password.placeholder} {...register(formFields.password.name)} />
          <span className="error">{errors.password?.message}</span>
        </label>

        <label htmlFor={formFields.confirmPassword.name}>
          <span>{formFields.confirmPassword.label}</span>
          <input type="password" placeholder={formFields.confirmPassword.placeholder} {...register(formFields.confirmPassword.name, { deps: ['companyName','password'] })} />
          <span className="error">{errors.confirmPassword?.message}</span>
        </label>

        <label htmlFor={formFields.selectLang.name}>
          <span>{formFields.selectLang.label}</span>
          <select {...register(formFields.selectLang.name)}>
            {formFields.selectLang.options.map(({value}) =>
              <option key={value} value={value}>{value}</option>
              )}
          </select>
          <span className="error">{errors.selectLang?.message}</span>
        </label>

        <label>
          <input type="checkbox" id={formFields.primary.label} {...register(formFields.primary.name)} />
          <span>{formFields.primary.label}</span>
          <span className="error">{errors.isPrimary?.message}</span>
        </label>

        <div>
          <span>{formFields.radio.label}</span>
          {formFields.radio.options.map(({value}) =>
            <label key={value}>
              <input {...register(formFields.radio.name)} type="radio" value={value} />
              {value}
            </label>
          )}
          <span className="error">{errors.radio?.message}</span>
        </div>

        <label htmlFor={formFields.vat.name}>
          <span>{formFields.vat.label}</span>
          <input type="number" placeholder={formFields.vat.placeholder} {...register(formFields.vat.name)} />
          <span className="error">{errors.vat?.message}</span>
        </label>

        <label>
          <input type="checkbox" {...register(formFields.office.name)} />
          <span>{formFields.office.label}</span>
          <span className="error">{errors.hasOffice?.message}</span>
        </label>

        {officeFieldValue === true &&
          <label htmlFor={formFields.address.name}>
            <span>{formFields.address.label}</span>
            <input type="text" placeholder={formFields.address.placeholder} {...register(formFields.address.name)} />
            <span className="error">{errors.address?.message}</span>
          </label>
        }

        <button type="submit">Submit</button>
      </form>
      <DevTool control={control} />
    </>
  )
}

export default Form
