import { DevTool } from "@hookform/devtools";
import { Button, TextField, Typography } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { useEffect, useState } from "react";
import { useForm, useFieldArray, set } from "react-hook-form";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import "./form.css";
import MenuItem from "@mui/material/MenuItem";
import bcepharma from "../../components/Assets/bcepharma.png";
import quesscontrole from "../../components/Assets/quesscontrole.png";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import dayjs from "dayjs";
import { InputLabel } from "@mui/material";
import Header from "../../components/global/Header";
import Box from "@mui/material/Box";
import Select from "@mui/material/Select";
import { fillAirForm } from "../../redux/actions/form.action";
import { useDispatch, useSelector } from "react-redux";
import { setToastMessage } from "../../redux/Slice/toastSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const FillAirForm = (formData) => {
  //console.log(formData, "formData");
  const form = useForm();
  const dispatch = useDispatch();
  const Navigate = useNavigate();
  const { register, control, handleSubmit, formState, setValue } = form;
  const { errors } = formState;
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedExDate, setselectedExDate] = useState(null);
  const role = useSelector((state) => state?.user?.role);
  const Data = formData.formData;
  const selectedFormId = formData.formData.id;

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleExDateChange = (date) => {
    setselectedExDate(date);
  };

  const samplingType = form.watch("samplingType");

  const handleSamplingTypeChange = (event) => {
    const value = event.target.value;
    console.log(value);
  };

  //const theme = useTheme();
  //const colors = tokens(theme.palette.mode);

  const {
    fields: tableFields,
    append: appendTable,
    remove: removeTable,
  } = useFieldArray({
    name: "tableRows",
    control,
  });

  useEffect(() => {
    // Set pre-filled values from formData
    if (Data) {
      // Set values for each air sampler
      Data.airSamplers.forEach((sampler, index) => {
        setValue(`airSamplers.${index}.id`, sampler.id);
        setValue(`airSamplers.${index}.name`, sampler.deviceName);
        setValue(`airSamplers.${index}.validationDate`, sampler.validationDate);
        setValue(`airSamplers.${index}.deviceType`, sampler.deviceType);
      });

      Data.detailsAir.forEach((detail, index) => {
        setValue(`tableRows.${index}.zone`, detail.zone);
        setValue(`tableRows.${index}.localization`, detail.localization);
        setValue(`tableRows.${index}.iso`, detail.iso);
        setValue(
          `tableRows.${index}.thresholdActionRequired`,
          detail.threshold
        );
        setValue(`tableRows.${index}.samplerUsed`, detail.samplerUsed);
        setValue(`tableRows.${index}.comments`, detail.comments);
      });
      setValue("medType", Data.medType);
    }
  }, [formData, setValue]);

  const onSubmit = async (data) => {
    const formattedData = {
      ...data,
      samplingDate:
        role !== "OrgAdmin" ? dayjs(selectedDate).format("YYYY-MM-DD") : "",
      expiryDate:
        role !== "OrgAdmin" ? dayjs(selectedExDate).format("YYYY-MM-DD") : "",
    };

    //dispatch(fillAirForm({ data: formattedData, id: selectedFormId }));
    try {
      const resultAction = await dispatch(
        fillAirForm({ data: formattedData, id: selectedFormId })
      );
      console.log(resultAction, "resultAction");
      const message = resultAction.payload;
      console.log(message, "message");
      if (message === "Air filled successfully") {
        dispatch(setToastMessage("Air filled successfully"));
        Navigate("/fill-form");
      } else {
        toast.error("An unexpected response was received.");
      }
    } catch (error) {
      toast.error("An error occurred: " + error.message);
    }
  };
  const isCalibrationValid = (validationDate) => {
    const currentDate = new Date();
    const valDate = new Date(validationDate);
    return valDate > currentDate ? "Yes" : "No";
  };
  const getCellColorStyle = (valid) => {
    return valid === "Yes"
      ? { backgroundColor: "green" }
      : { backgroundColor: "rgba(255, 0, 0, 0.87)" };
  };

  return (
    <Box>
      <Header title="Air Sampling" subtitle="Fill Form " />
      <div className="form-container">
        <div className="top-row">
          <img src={bcepharma} alt="" width="90px" className="first-image" />
          <h3>{Data.formName}</h3>
          <img
            src={quesscontrole}
            alt=""
            width="90px"
            className="second-image"
          />
        </div>
        <div>
          <TextField label="Medicine Type" value={Data.medType} />
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <h3 className="gen-info">
            <u>General Informations</u>
          </h3>
          <div className="row">
            <div className="date-container">
              <div className="input-container-1">
                <label>Sampling Date</label>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    format="DD/MM/YYYY"
                    className="dd"
                    value={selectedDate}
                    onChange={handleDateChange}
                    textField={(props) => (
                      <TextField
                        {...props}
                        inputProps={{
                          ...register("samplingDate", {
                            required: "Required",
                          }),
                        }}
                      />
                    )}
                  />
                </LocalizationProvider>
                {errors.samplingDate && (
                  <p className="error">{errors.samplingDate.message}</p>
                )}
              </div>

              <div className="select-container">
                <div className="input-container-2">
                  <InputLabel htmlFor="samplingType">Sampling Type</InputLabel>
                  <TextField
                    select
                    onChange={handleSamplingTypeChange}
                    {...register("samplingType", {
                      required: "Required",
                    })}
                    color="success"
                  >
                    <MenuItem value="">Please select</MenuItem>
                    <MenuItem value="BiAnnual">Bi-Annual</MenuItem>
                    <MenuItem value="Reprise">Reprise</MenuItem>
                    <MenuItem value="InstallingNewDevice">
                      Installing New Device
                    </MenuItem>
                    <MenuItem value="InstallingNewZone">
                      Installing New Zone
                    </MenuItem>
                    <MenuItem value="MaintenanceRepair">
                      Maintenance/Repair
                    </MenuItem>
                    <MenuItem value="Other">Other</MenuItem>
                  </TextField>
                  <p className="error">{errors.samplingType?.message}</p>
                  {samplingType === "Other" && (
                    <TextField
                      {...register("samplingTypeOther", {
                        required: "Required",
                      })}
                    />
                  )}
                  <p className="error">{errors.samplingTypeOther?.message}</p>
                </div>
              </div>
            </div>
            <div className="input-container-simpler">
              <label htmlFor="sampler">Sampling Personnel </label>
              <TextField
                {...register("sampler", {
                  required: "Required",
                })}
              />
              <p className="error">{errors.sampler?.message}</p>
            </div>
          </div>

          <div className="config-section">
            <h3>
              <u>Air Sampler Configuration</u>
            </h3>
            <div className="input-air-config">
              {Data &&
                Data.airSamplers.map((sampler, index) => (
                  <div className="input-air-container" key={index}>
                    <label htmlFor="#">#{index + 1}</label>
                    <label htmlFor="deviceName">Device Name</label>
                    <TextField
                      value={sampler.deviceName}
                      inputProps={{ readOnly: true }}
                    />
                    <label htmlFor="callibration">Calibration valid?</label>
                    <TextField
                      value={isCalibrationValid(sampler.validationDate)}
                      inputProps={{ readOnly: true }}
                      sx={getCellColorStyle(
                        isCalibrationValid(sampler.validationDate)
                      )}
                    />
                    <label htmlFor="deviceType">Device Type</label>
                    <TextField
                      value={sampler.deviceType}
                      inputProps={{ readOnly: true }}
                    />
                  </div>
                ))}
            </div>
          </div>
          <div className="config-section">
            <h3>
              <u>Agar characteristics</u>
            </h3>
            <div className="input-air-config">
              <div className="input-air-container">
                <label htmlFor="type">Type </label>
                <TextField
                  {...register("agarsType", {
                    required: "Required",
                  })}
                />
                <p className="error">{errors.type?.message}</p>
                <label htmlFor="supplier">Supplier </label>
                <TextField
                  {...register("supplier", {
                    required: "Required",
                  })}
                />
                <p className="error">{errors.supplier?.message}</p>
                <label htmlFor="expiryDate">Expiry Date</label>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    value={selectedExDate}
                    onChange={handleExDateChange}
                    textField={(props) => (
                      <TextField
                        {...props}
                        inputProps={{
                          ...register("expiryDate", {
                            required: "Required",
                          }),
                        }}
                      />
                    )}
                  />
                </LocalizationProvider>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-start",
                  width: "100%",
                  alignItems: "center",
                  gap: "0.7rem",
                }}
              >
                <label htmlFor="batch">Batch </label>
                <TextField
                  {...register("batch", {
                    required: "Required",
                  })}
                />
                <p className="error">{errors.batch?.message}</p>
              </div>
            </div>
          </div>
          <div className="incubation-container">
            <h3>
              <u>Incubation details</u>
            </h3>
            <div className="input-incubation">
              <label htmlFor="incubDetails">Incubation details</label>
              <TextField
                {...register("laboratory", {
                  required: "Required",
                })}
              />
              <p className="error">{errors.incubation?.message}</p>
            </div>
          </div>
          <div className="table">
            <TableContainer
              component={Paper}
              sx={{ border: "1px solid", alignContent: "center" }}
            >
              <Table>
                <TableHead sx={{ backgroundColor: "#0070C0" }}>
                  <TableRow className="table-cell-container">
                    <TableCell colSpan={4} className="table-cell">
                      Localisation Details
                    </TableCell>
                    <TableCell colSpan={3} className="table-cell">
                      UFC/Agar Results
                    </TableCell>
                    <TableCell rowSpan={2} className="table-cell">
                      Comments if applicable
                    </TableCell>
                    {tableFields.length > 1 && (
                      <TableCell rowSpan={2} className="table-cell">
                        Action
                      </TableCell>
                    )}
                  </TableRow>
                  <TableRow className="table-cell-container">
                    <TableCell className="table-cell">
                      Sampler Identification
                    </TableCell>
                    <TableCell className="table-cell">Zone</TableCell>
                    <TableCell className="table-cell">Localisation</TableCell>
                    <TableCell className="table-cell">Sampler used</TableCell>
                    <TableCell className="table-cell">ISO</TableCell>
                    <TableCell className="table-cell">
                      UFC/Agar Numbers
                    </TableCell>
                    <TableCell className="table-cell">
                      Threshold of action required
                    </TableCell>
                  </TableRow>
                </TableHead>

                <TableBody sx={{ border: "1px solid" }}>
                  {Data &&
                    Data.detailsAir.map((detail, index) => (
                      <TableRow key={index}>
                        <TableCell className="no-padding-cell">
                          <TextField
                            className="table-cell"
                            value={`A${index + 1}`}
                            disabled
                            size="small"
                            width="fit-content"
                          />
                        </TableCell>
                        <TableCell
                          className="no-padding-cell"
                          style={{ width: "auto" }}
                        >
                          <Typography>{detail.zone}</Typography>
                        </TableCell>
                        <TableCell className="no-padding-cell">
                          <Typography>{detail.localization}</Typography>
                        </TableCell>
                        <TableCell className="no-padding-cell">
                          <Select
                            {...register(`tableRows.${index}.samplerUsed`, {
                              required: "Required",
                            })}
                            size="small"
                            fullWidth
                            displayEmpty
                          >
                            <MenuItem value="" disabled>
                              Select Sampler
                            </MenuItem>
                            {Data &&
                              Data.airSamplers.map((sampler) => (
                                <MenuItem key={sampler.id} value={sampler.id}>
                                  {sampler.deviceName}
                                </MenuItem>
                              ))}
                          </Select>
                        </TableCell>
                        <TableCell className="no-padding-cell">
                          <Typography>{detail.iso}</Typography>
                        </TableCell>
                        <TableCell className="no-padding-cell">
                          <TextField
                            {...register(`tableRows.${index}.ufcAgarNumbers`)}
                            size="small"
                            fullWidth
                          />
                        </TableCell>
                        <TableCell className="no-padding-cell">
                          <Typography>{detail.threshold}</Typography>
                        </TableCell>
                        <TableCell>
                          <TextField
                            {...register(`tableRows.${index}.comments`, {
                              required: "Required",
                            })}
                            size="small"
                            fullWidth
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>

          <div>
            <button type="submit">Submit</button>
          </div>
        </form>
        {/* <DevTool control={control} /> */}
      </div>
    </Box>
  );
};

export default FillAirForm;
