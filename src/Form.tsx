import './Form.css';
import { useForm } from 'react-hook-form';
import { DevTool } from '@hookform/devtools';

const formFields = {
  companyName: {
    name: 'companyName',
    label: 'Company name',
  },
  password: {
    name: 'Password',
    label: 'password',
  },
  confirmPassword: {
    name: 'confirmPassword',
    label: 'Confirm password',
  },
  selectLang: {
    name: 'selectLang',
    label: 'Select language',
  },
  primary: {
    name: 'primary',
    label: 'Primary',
  },
  radio: {
    name: 'radio',
    label: 'Radio',
    options:[
      { value:"AM" },
      { value:"FM" }
    ]
  },
  vat: {
    name: 'vat',
    label: 'VAT',
  },
};


function Form() {
  const {
    register, handleSubmit, formState: { errors }, control,
  } = useForm();
  const onSubmit = (data) => console.log(data);
  console.log(errors);

  return (
    <>
      <h1>React hook form</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="form">
        <label htmlFor={formFields.companyName.name}>
          {formFields.companyName.label}
          <input type="text" placeholder={formFields.companyName.label} {...register(formFields.companyName.name, { required: true, min: 3 })} />
        </label>
        <label htmlFor={formFields.password.name}>
          {formFields.password.label}
          <input type="password" placeholder={formFields.password.label} {...register(formFields.password.name, { required: true, pattern: /w{6,}/i })} />
        </label>
        <label htmlFor={formFields.confirmPassword.name}>
          {formFields.confirmPassword.label}
          <input type="password" placeholder={formFields.confirmPassword.label} {...register(formFields.confirmPassword.name, { required: true, pattern: /w{6,}/i })} />
        </label>
        <label htmlFor={formFields.selectLang.name}>
          {formFields.selectLang.label}
          <select {...register(formFields.selectLang.name, { required: true })}>
            <option value="EL">EL</option>
            <option value="EN">EN</option>
            <option value="SP">SP</option>
            <option value="FR">FR</option>
          </select>
        </label>
        <label>
          <input type="checkbox" id={formFields.primary.label} {...register(formFields.primary.name, {})} />
          {formFields.primary.label}
        </label>
        <div>
          {formFields.radio.label}
          {formFields.radio.options.map(option =>
            <label key={option.value}>
              <input {...register(formFields.radio.name)} type="radio" value={option.value} />
              {option.value}
            </label>
          )}
        </div>
        <label htmlFor={formFields.vat.name}>
          {formFields.vat.label}
          <input type="number" placeholder={formFields.vat.label} {...register(formFields.vat.name, { required: true })} />
        </label>

        <button type="submit">Submit</button>
      </form>
      <DevTool control={control} />
    </>
  )
}

export default Form
