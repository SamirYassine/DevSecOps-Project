import { TextField } from "@mui/material";
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
import RemoveCircleOutlineRoundedIcon from "@mui/icons-material/RemoveCircleOutlineRounded";
import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded";
import Header from "../../components/global/Header";
import Box from "@mui/material/Box";
import { useDispatch, useSelector } from "react-redux";
import { getSurfaceZonesByOrganizationId } from "../../redux/actions/zone.action";
import axios from "axios";
import { apiBaseUrl } from "../../proxy";
import React from "react";
import { createSurfaceForm } from "../../redux/actions/form.action";
import { setToastMessage } from "../../redux/Slice/toastSlice";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const BuildSurfaceForm = () => {
  const dispatch = useDispatch();
  const Navigate = useNavigate();
  const form = useForm();
  const { register, control, handleSubmit, formState, setValue } = form;
  const { errors } = formState;
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedExDate, setselectedExDate] = useState(null);
  const selectedOrgId = localStorage.getItem("selectedOrgId");

  const zones = useSelector((state) => state?.zone?.zones);

  const [selectedZoneId, setSelectedZoneId] = useState(null);
  const [locdata, setLocData] = useState([{}]);
  const [isoValue, setIsoValue] = useState("");

  const [selectedZones, setSelectedZones] = useState([
    {
      zoneId: null,
      localizations: [],
      selectedLocation: null,
    },
  ]);

  const handleZone = (event, index) => {
    const selectedId = event.target.value;
    setSelectedZoneId(selectedId);
    const zone = zones.find((z) => z.id === selectedId);
    let localizationsForZone = []; // Initialize localizationsForZone outside

    getLocalizationsByZone(selectedId)
      .then((data) => {
        console.log("Data received:", data);
        localizationsForZone = data; // Assign data to localizationsForZone when Promise resolves
        console.log(localizationsForZone, "localizationsForZone"); // Log inside the Promise chain
        setSelectedZones((prevZones) => {
          const updatedZones = [...prevZones];
          updatedZones[index] = {
            zoneId: selectedId,
            localizations: localizationsForZone,
            selectedLocation: null, // Initially set to null
          };
          return updatedZones;
        });
        setLocData(localizationsForZone);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        // Handle errors
      });

    // Since getLocalizationsByZone is asynchronous, the below console log will execute before the Promise resolves
    console.log(localizationsForZone, "localizationsForZone");

    setValue(`tableRows.${index}.zone`, zone?.id || "");
  };

  function getLocalizationsByZone(zoneId) {
    const accessToken = localStorage.getItem("token");
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: accessToken ? `Bearer ${accessToken}` : "",
      },
    };

    // Return a Promise that resolves with the data from the Axios request
    return new Promise((resolve, reject) => {
      axios
        .get(apiBaseUrl + "/localizations/zone/" + zoneId, config)
        .then((response) => {
          console.log("response", response.data);
          resolve(response.data); // Resolve the Promise with the data
        })
        .catch((error) => {
          console.log("Error fetching localizations:", error);
          reject(error); // Reject the Promise with the error
        });
    });
  }
  console.log("selectedZones", selectedZones);

  const handleLocalizationChange = (event, index) => {
    const selectedId = event.target.value;

    setSelectedZones((prevZones) => {
      const updatedZones = [...prevZones];
      updatedZones[index] = {
        ...updatedZones[index],
        selectedLocation: selectedId,
      };
      return updatedZones;
    });
    setValue(`tableRows.${index}.localization`, selectedId);

    const selectedLocalization = locdata.find(
      (localizations) => localizations.id === selectedId
    );
    console.log(selectedLocalization, "selectedLocalization");
    if (selectedLocalization) {
      // Assuming iso and threshold are properties of the selectedLocalization object
      const isoValue = selectedLocalization.iso;

      const thresholdValue = selectedLocalization.threshold;

      setValue(`tableRows.${index}.iso`, isoValue);
      setValue(`tableRows.${index}.thresholdActionRequired`, thresholdValue);
    }
  };

  useEffect(() => {
    dispatch(getSurfaceZonesByOrganizationId(selectedOrgId));
  }, [dispatch, selectedOrgId]);

  useEffect(() => {
    dispatch(getSurfaceZonesByOrganizationId(selectedOrgId));
  }, [dispatch, selectedOrgId]);

  /* useEffect(() => {
    if (selectedZoneId !== null) {
      dispatch(getLocalizationsByZone(selectedZoneId));
    }
  }, [dispatch, selectedZoneId]); */

  const role = useSelector((state) => state?.user?.role);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleExDateChange = (date) => {
    setselectedExDate(date);
  };

  const samplingType = form.watch("samplingType");

  const handleSamplingTypeChange = (event) => {
    const value = event.target.value;
    //console.log(value);
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

  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    if (initialized && tableFields.length === 0) {
      appendTable({});
    }
    setInitialized(true);
  }, [initialized, tableFields.length]);

  const onSubmit = async (data) => {
    const formattedData = {
      ...data,
      samplingDate:
        role !== "OrgAdmin" ? dayjs(selectedDate).format("YYYY-MM-DD") : "",
      expiryDate:
        role !== "OrgAdmin" ? dayjs(selectedExDate).format("YYYY-MM-DD") : "",

      organization_id: selectedOrgId,
    };
    console.log(formattedData, "formattedData");
    //dispatch(createSurfaceForm(formattedData));
    try {
      const resultAction = await dispatch(createSurfaceForm(formattedData));
      console.log(resultAction, "resultAction");
      const message = resultAction.payload;
      console.log(message, "message");
      if (message === "Surface created successfully") {
        dispatch(setToastMessage("Surface created successfully"));
        Navigate("/build-form");
      } else {
        toast.error("An unexpected response was received.");
      }
    } catch (error) {
      toast.error("An error occurred: " + error.message);
    }
  };

  return (
    <Box>
      <Header title="Surface Sampling" subtitle="Prepare Form" />

      <div className="form-container">
        <div className="top-row">
          <img src={bcepharma} alt="" width="90px" className="first-image" />
          <TextField
            defaultValue={"SAMPLING OF VIABLE Surface PARTICLES"}
            multiline
            label="Form Name"
            {...register("formName", {
              required: role !== "OrgAdmin" ? "Required" : false,
            })}
          />

          <img
            src={quesscontrole}
            alt=""
            width="90px"
            className="second-image"
          />
        </div>
        <div>
          <TextField
            //sx={{ top: "1rem", justifyContent: "center", padding: "1rem" }}
            select
            label="Medication Type"
            {...register("medType", {
              required: role !== "OrgAdmin" ? "Required" : false,
            })}
          >
            <MenuItem value="DANGEROUS">DANGEROUS</MenuItem>
            <MenuItem value="NON DANGEROUS">NON DANGEROUS</MenuItem>
            <MenuItem value="DANGEROUS_NON_DANGEROUS">
              DANGEROUS && NON DANGEROUS
            </MenuItem>
          </TextField>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <h3>General Informations</h3>
          <div className="row">
            <div className="date-container">
              <div className="input-container-1">
                <label>Sampling Date</label>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    disabled
                    format="DD/MM/YYYY"
                    className="dd"
                    value={selectedDate}
                    onChange={handleDateChange}
                    textField={(props) => (
                      <TextField
                        disabled
                        {...props}
                        {...register("samplingDate", {
                          required: role !== "OrgAdmin" ? "Required" : false,
                        })}
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
                    disabled
                    select
                    onChange={handleSamplingTypeChange}
                    {...register("samplingType", {
                      required: role !== "OrgAdmin" ? "Required" : false,
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
                      disabled
                      {...register("samplingTypeOther", {
                        required: role !== "OrgAdmin" ? "Required" : false,
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
                disabled
                {...register("sampler", {
                  required: role !== "OrgAdmin" ? "Required" : false,
                })}
              />
              <p className="error">{errors.sampler?.message}</p>
            </div>
          </div>

          <div className="config-section">
            <h3>Agar characteristics</h3>
            <div className="input-air-config">
              <div className="input-air-container">
                <label htmlFor="type">Type </label>
                <TextField
                  disabled
                  {...register("type", {
                    required: role !== "OrgAdmin" ? "Required" : false,
                  })}
                />
                <p className="error">{errors.type?.message}</p>
                <label htmlFor="supplier">Supplier </label>
                <TextField
                  disabled
                  {...register("supplier", {
                    required: role !== "OrgAdmin" ? "Required" : false,
                  })}
                />
                <p className="error">{errors.supplier?.message}</p>
                <label htmlFor="expiryDate">Expiry Date</label>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    disabled
                    value={selectedExDate}
                    onChange={handleExDateChange}
                    renderInput={(props) => (
                      <input {...props} {...register("expiryDate")} />
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
                  disabled
                  {...register("batch", {
                    required: role !== "OrgAdmin" ? "Required" : false,
                  })}
                />
                <p className="error">{errors.Batch?.message}</p>
              </div>
            </div>
          </div>
          <div className="incubation-container">
            <h3>Incubation details</h3>
            <div className="input-incubation">
              <label htmlFor="incubDetails">Incubation details</label>
              <TextField
                disabled
                {...register("incubation", {
                  required: role !== "OrgAdmin" ? "Required" : false,
                })}
              />
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
                    <TableCell colSpan={3} className="table-cell">
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
                  {tableFields.map((row, index) => (
                    <TableRow key={row.id}>
                      <TableCell className="no-padding-cell">
                        <TextField
                          value={`A${index + 1}`}
                          disabled
                          {...register(
                            `tableRows.${index}.samplerIdentification`
                          )}
                          size="small"
                          width="fit-content"
                        />
                      </TableCell>

                      <TableCell className="no-padding-cell">
                        <TextField
                          select
                          {...register(`tableRows.${index}.zone`)}
                          size="small"
                          fullWidth
                          value={selectedZones[index]?.zoneId || ""}
                          onChange={(e) => handleZone(e, index)}
                        >
                          {zones.map((z) => (
                            <MenuItem key={z.id} value={z.id}>
                              {z.name}
                            </MenuItem>
                          ))}
                        </TextField>
                      </TableCell>
                      <TableCell className="no-padding-cell">
                        <TextField
                          select
                          {...register(`tableRows.${index}.localization`)}
                          size="small"
                          fullWidth
                          value={selectedZones[index]?.selectedLocation || ""}
                          onChange={(e) => handleLocalizationChange(e, index)}
                        >
                          {selectedZones[index]?.localizations?.map(
                            (localization) => (
                              <MenuItem
                                key={localization.id}
                                value={localization.id}
                              >
                                {localization.name}
                              </MenuItem>
                            )
                          )}
                        </TextField>
                      </TableCell>

                      <TableCell className="no-padding-cell">
                        <TextField
                          disabled
                          defaultValue={isoValue}
                          {...register(`tableRows.${index}.iso`)}
                          size="small"
                          fullWidth
                        />
                      </TableCell>
                      <TableCell className="no-padding-cell">
                        <TextField
                          {...register(`tableRows.${index}.ufcAgarNumbers`)}
                          size="small"
                          fullWidth
                        />
                      </TableCell>
                      <TableCell className="no-padding-cell">
                        <TextField
                          disabled
                          {...register(
                            `tableRows.${index}.thresholdActionRequired`
                          )}
                          size="small"
                          fullWidth
                        />
                      </TableCell>
                      <TableCell>
                        <TextField
                          disabled
                          {...register(`tableRows.${index}.comments`)}
                          size="small"
                          fullWidth
                        />
                      </TableCell>
                      {index > 0 && (
                        <TableCell className="no-padding-cell">
                          <RemoveCircleOutlineRoundedIcon
                            sx={{
                              bgcolor: "red",
                              marginLeft: "10px",
                              "&:hover": {
                                bgcolor: "#af3f3b",
                              },
                              borderRadius: "10%",
                            }}
                            onClick={() => removeTable(index)}
                          />
                        </TableCell>
                      )}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>

            <AddCircleOutlineRoundedIcon
              onClick={() => appendTable({})}
              sx={{
                position: "relative",
                top: "1rem",
                left: "93.3%",
                ":hover": {
                  cursor: "pointer",
                  color: "#0070C0",
                },
              }}
            />
          </div>

          <div>
            <button type="submit">Build Form</button>
          </div>
        </form>
        {/* <DevTool control={control} /> */}
      </div>
    </Box>
  );
};

export default BuildSurfaceForm;
