import { DevTool } from "@hookform/devtools";
import { zodResolver } from "@hookform/resolvers/zod";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import { Box, Button, Grid } from "@mui/material";
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
      <form onSubmit={handleSubmit(onSubmit)} className="card form">
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

        <Box mt={4}>
          <Grid container spacing={2}>
            <Grid item xs={5}>
              <Button variant="outlined" startIcon={<ArrowBackIcon />} onClick={() => navigate("/")} fullWidth>
                Back
              </Button>
            </Grid>
            <Grid item xs={2}>
              <Button variant="text" color="error" onClick={handleReset} fullWidth>
                <RestartAltIcon />
              </Button>
            </Grid>
            <Grid item xs={5}>
              <Button variant="contained" endIcon={<ArrowForwardIcon />} type="submit" fullWidth>
                Next
              </Button>
            </Grid>
          </Grid>
        </Box>
      </form>
      <DevTool control={control} />
    </>
  );
}

export default FormStep1;
