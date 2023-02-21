import { DevTool } from "@hookform/devtools";
// import { useContext } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
// import { JobsFormContext } from "./routes/Jobs";
import "./styles/form.css";
import { FormSchemaT } from "./validations/FormSchema";

function FormStep2() {
  const navigate = useNavigate();
  // const { formData, setFormData } = useContext(JobsFormContext);
  const { handleSubmit, control } = useForm<FormSchemaT>();

  const onSubmit: SubmitHandler<FormSchemaT> = (data) => {
    navigate("../step-3");
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="form">
        <div className="nav">
          <button type="button" onClick={() => navigate("../step-1")}>
            Previous
          </button>
          <button type="submit">Next</button>
        </div>
      </form>
      <DevTool control={control} />
    </>
  );
}

export default FormStep2;
