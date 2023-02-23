import { DevTool } from "@hookform/devtools";
import { zodResolver } from "@hookform/resolvers/zod";
import AddIcon from "@mui/icons-material/Add";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import DeleteIcon from "@mui/icons-material/Delete";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextField,
} from "@mui/material";
import { useContext, useEffect } from "react";
import { Controller, SubmitHandler, useFieldArray, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { radioOptions, selectLangOptions } from "./data/data";
import { JobsFormContext } from "./routes/Jobs";
import "./styles/form.css";
import { FormStep2Schema, FormStep2SchemaT } from "./validations/FormSchema";

function FormStep1() {
  const navigate = useNavigate();
  const { fieldsStep2Data, setFieldsStep2Data } = useContext(JobsFormContext);
  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
    setValue,
    unregister,
    watch,
  } = useForm<FormStep2SchemaT>({
    resolver: zodResolver(FormStep2Schema),
    defaultValues: fieldsStep2Data,
    // shouldUnregister: true,
    // mode: "onBlur",
    // mode: "onChange",
    // reValidateMode: "onBlur",
  });
  const { fields, append, remove } = useFieldArray({
    name: "invoice",
    control,
  });

  const onSubmit: SubmitHandler<FormStep2SchemaT> = (data) => {
    setFieldsStep2Data(data);
    navigate("../step/3");
  };
  const handleReset = () =>
    reset({
      companyName: "",
      selectLang: "EN",
      isPrimary: false,
      invoice: [],
    });
  const officeFieldValue = watch("hasOffice");

  useEffect(() => {
    if (officeFieldValue === false) {
      unregister("address");
      setValue("address", undefined);
    }
  }, [unregister, officeFieldValue]);

  console.log("errors", errors);

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="card">
        <Box my={1}>
          <Controller
            name="companyName"
            control={control}
            render={({ field, fieldState: { error } }) => (
              <TextField
                {...field}
                variant="outlined"
                label="Company name"
                fullWidth
                error={!!error?.message}
                helperText={error?.message}
              />
            )}
          />
        </Box>

        <Box my={1}>
          <Controller
            name="isPrimary"
            control={control}
            render={({ field }) => (
              <FormControlLabel label="Primary" control={<Checkbox {...field} checked={field.value} />} />
            )}
          />
        </Box>

        <Box my={1}>
          <Controller
            name="radio"
            control={control}
            render={({ field, fieldState: { error } }) => (
              <FormControl error={!!error?.message}>
                <FormLabel>Radio</FormLabel>
                <RadioGroup {...field} row>
                  {radioOptions.map((value) => (
                    <FormControlLabel key={value} value={value} control={<Radio />} label={value} />
                  ))}
                </RadioGroup>
                <FormHelperText>{error?.message}</FormHelperText>
              </FormControl>
            )}
          />
        </Box>

        <Box my={1}>
          <Controller
            name="selectLang"
            control={control}
            render={({ field, fieldState: { error } }) => (
              <FormControl sx={{ minWidth: 120 }} error={!!error?.message}>
                <InputLabel>Select language</InputLabel>
                <Select {...field} label="Select language">
                  {selectLangOptions.map((value) => (
                    <MenuItem key={value} value={value}>
                      {value}
                    </MenuItem>
                  ))}
                </Select>
                <FormHelperText>{error?.message}</FormHelperText>
              </FormControl>
            )}
          />
        </Box>

        <Box my={1}>
          <Controller
            name="daysPto"
            control={control}
            render={({ field, fieldState: { error } }) => (
              <TextField
                {...field}
                variant="outlined"
                label="Days PTO"
                type="number"
                fullWidth
                error={!!error?.message}
                helperText={error?.message}
              />
            )}
          />
        </Box>

        <Box my={1}>
          <span>Invoice</span>
          {fields.map((field, idx) => (
            <div key={field.id}>
              <Grid container spacing={1}>
                <Grid item xs={11}>
                  <Controller
                    name={`invoice.${idx}.vatNumber` as const}
                    control={control}
                    render={({ field, fieldState: { error } }) => (
                      <TextField
                        {...field}
                        label="VAT"
                        type="number"
                        variant="outlined"
                        fullWidth
                        error={!!error?.message}
                        helperText={error?.message}
                        sx={{ mt: "8px" }}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={1}>
                  <Box mt={2}>
                    <IconButton aria-label="delete" onClick={() => remove(idx)}>
                      <DeleteIcon color="error" />
                    </IconButton>
                  </Box>
                </Grid>
              </Grid>
            </div>
          ))}
        </Box>
        <Button variant="contained" color="secondary" startIcon={<AddIcon />} onClick={() => append({ vatNumber: "" })}>
          VAT
        </Button>

        <Box mt={1}>
          <Controller
            name="hasOffice"
            control={control}
            render={({ field }) => (
              <FormControlLabel label="Office" control={<Checkbox {...field} checked={field.value} />} />
            )}
          />
        </Box>

        {officeFieldValue === true && (
          <Box my={1}>
            <Controller
              name="address"
              control={control}
              render={({ field, fieldState: { error } }) => (
                <TextField
                  {...field}
                  value={field.value ?? ""}
                  variant="outlined"
                  label="Address"
                  fullWidth
                  error={!!error?.message}
                  helperText={error?.message}
                />
              )}
            />
          </Box>
        )}

        <Box mt={4}>
          <Grid container spacing={2}>
            <Grid item xs={5}>
              <Button variant="outlined" startIcon={<ArrowBackIcon />} onClick={() => navigate("../step/1")} fullWidth>
                Previous
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
