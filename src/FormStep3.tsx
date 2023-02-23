import { DevTool } from "@hookform/devtools";
import { zodResolver } from "@hookform/resolvers/zod";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Box, Button, Grid } from "@mui/material";
import _ from "lodash";
import { useContext } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { JobsFormContext } from "./routes/Jobs";
import "./styles/form.css";
import { FormSchema, FormSchemaT } from "./validations/FormSchema";

function FormStep3() {
  const navigate = useNavigate();
  const { fieldsStep1Data, fieldsStep2Data } = useContext(JobsFormContext);
  const fieldsData = { ...fieldsStep1Data, ...fieldsStep2Data };
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormSchemaT>({
    defaultValues: fieldsData,
    resolver: zodResolver(FormSchema),
  });

  const onSubmit: SubmitHandler<FormSchemaT> = (data) => {
    console.log("data", data);
    navigate("/");
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="card form">
        <pre style={{ background: "hsl(0deg 0% 0% / 5%)" }}>{JSON.stringify(fieldsData, null, 2)}</pre>

        {!_.isEmpty(errors) && <span className="error">Validation errors exist! Go back and fix them!</span>}

        <Box mt={4}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Button variant="outlined" startIcon={<ArrowBackIcon />} onClick={() => navigate("../step/2")} fullWidth>
                Previous
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button variant="contained" type="submit" fullWidth>
                Submit
              </Button>
            </Grid>
          </Grid>
        </Box>
      </form>
      <DevTool control={control} />
    </>
  );
}

export default FormStep3;
