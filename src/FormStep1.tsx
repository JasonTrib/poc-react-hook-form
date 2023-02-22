import { DevTool } from "@hookform/devtools";
import { zodResolver } from "@hookform/resolvers/zod";
import { useContext } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { JobsFormContext } from "./routes/Jobs";
import "./styles/form.css";
import { FormStep1Schema, FormStep1SchemaT } from "./validations/FormSchema";

function FormStep1() {
  const navigate = useNavigate();
  const { fieldsStep1Data, setFieldsStep1Data } = useContext(JobsFormContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm<FormStep1SchemaT>({
    resolver: zodResolver(FormStep1Schema),
    defaultValues: fieldsStep1Data,
    // shouldUnregister: true,
    // mode: "onBlur",
    // mode: "onChange",
    // reValidateMode: "onBlur",
  });

  const onSubmit: SubmitHandler<FormStep1SchemaT> = (data) => {
    setFieldsStep1Data(data);
    navigate("../step/2");
  };
  const handleReset = () =>
    reset({
      username: "",
      password: "",
      confirmPassword: "",
    });

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="form">
        <button onClick={handleReset}>Reset</button>

        <label htmlFor="username">
          <span>Username</span>
          <input type="text" {...register("username")} />
          <span className="error">{errors.username?.message}</span>
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

        <button type="submit">Next</button>
      </form>
      <DevTool control={control} />
    </>
  );
}

export default FormStep1;
