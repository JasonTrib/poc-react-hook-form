import { DevTool } from "@hookform/devtools";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import "./styles/form.css";
import { FormSchemaT } from "./validations/FormSchema";

function FormStep3() {
  const navigate = useNavigate();
  const { handleSubmit, control } = useForm<FormSchemaT>();

  const onSubmit: SubmitHandler<FormSchemaT> = (data) => {
    console.log("Submitted:", data);
    navigate("/");
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="form">
        <button type="submit">Submit</button>
      </form>
      <DevTool control={control} />
    </>
  );
}

export default FormStep3;
