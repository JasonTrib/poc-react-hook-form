import { DevTool } from "@hookform/devtools";
import { useContext } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { JobsFormContext } from "./routes/Jobs";
import "./styles/form.css";
import { FormSchemaT } from "./validations/FormSchema";

function FormStep3() {
  const navigate = useNavigate();
  const { formData } = useContext(JobsFormContext);
  const { handleSubmit, control } = useForm<FormSchemaT>();

  const onSubmit: SubmitHandler<FormSchemaT> = (data) => {
    navigate("/");
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="form">
        <pre style={{ background: "hsl(0deg 0% 0% / 5%)" }}>{JSON.stringify(formData, null, 2)}</pre>

        <div className="nav">
          <button type="button" onClick={() => navigate("../step-2")}>
            Previous
          </button>
          <button type="submit">Submit</button>
        </div>
      </form>
      <DevTool control={control} />
    </>
  );
}

export default FormStep3;
