import { Route, Routes, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import Login from "./components/auth/login/Login";
import ProtectedRoute from "./ProtectedRoute/ProtectedRoute";
import { ColorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import Topbar from "./components/global/Topbar";
import Sidebar from "./components/global/Sidebar";
import Dashboard from "./pages/dashboard/Dashboard";
import Organizations from "./pages/organizations/Organizations";
import Users from "./pages/users/Users";
import Forms from "./pages/forms/Forms";
import BuildAirForm from "./pages/forms/BuildAirForm";
import ReviseForm from "./pages/forms/ReviseForm";
import FillAirForm from "./pages/forms/FillAirForm";
import BuildSurfaceForm from "./pages/forms/BuildSurfaceForm";
import FillSurfaceForm from "./pages/forms/FillSurfaceForm";
import Zones from "./pages/zones/Zones";
import AirSamplerSettings from "./pages/Air_devices/AirSamplerSettings";
import Build from "./pages/forms/Build";
import Fill from "./pages/forms/Fill";
import AirForms from "./pages/forms/AirForms";
import SurfaceForms from "./pages/forms/SurfaceForms";
import Localizations from "./pages/zones/Localizations";
import ReviseReports from "./pages/reports/ReviseReports";
import GenerateReports from "./pages/reports/GenerateReports";
import RichText from "./pages/reports/RichText";
import CompletedReports from "./pages/reports/CompletedReports";
import Drg from "./pages/forms/Drg";
import PlanViewer from "./pages/forms/PlanViewer";
import { useDispatch } from "react-redux";
import { getRole } from "./redux/actions/user.action";
import CompletedReportsAdmin from "./pages/reports/CompletedReportsAdmin";

function App() {
  const dispatch = useDispatch();
  const selectedOrgId = localStorage.getItem("selectedOrgId");
  const [role, setRole] = useState("");
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);
  const location = useLocation();

  useEffect(() => {
    if (selectedOrgId && !role) {
      dispatch(getRole())
        .then((action) => {
          if (getRole.fulfilled.match(action)) {
            setRole(action.payload);
          }
        })
        .catch((error) => {
          console.error("Failed to fetch role", error);
        });
    }
  }, [dispatch, selectedOrgId, role]);

  const showTopbarAndSidebar = location.pathname !== "/login";

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          {showTopbarAndSidebar && <Sidebar isSidebar={isSidebar} />}
          <main className="content">
            {showTopbarAndSidebar && (
              <Topbar isSidebar={isSidebar} setIsSidebar={setIsSidebar} />
            )}
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route element={<ProtectedRoute />}>
                {(role === "OrgAdmin" || role === "") && (
                  <Route path="/" element={<Dashboard />} />
                )}

                {role === "" && (
                  <Route path="/organizations" element={<Organizations />} />
                )}

                {(role === "OrgAdmin" || role === "") && (
                  <Route path="/users" element={<Users />} />
                )}

                {(role === "OrgAdmin" || role === "") && (
                  <Route path="/forms/build/air" element={<BuildAirForm />} />
                )}
                {(role === "OrgAdmin" || role === "") && (
                  <Route
                    path="/forms/build/surface"
                    element={<BuildSurfaceForm />}
                  />
                )}
                {(role === "OrgAdmin" || role === "") && (
                  <Route
                    path="/forms/fill/surface"
                    element={<FillSurfaceForm />}
                  />
                )}
                {(role === "OrgAdmin" || role === "") && (
                  <Route path="/forms/fill/air" element={<FillAirForm />} />
                )}
                {(role === "OrgAdmin" || role === "") && (
                  <Route path="/forms/revise" element={<ReviseForm />} />
                )}
                {(role === "OrgAdmin" || role === "") && (
                  <Route path="/zones" element={<Zones />} />
                )}
                {(role === "OrgAdmin" || role === "") && (
                  <Route path="/air-devices" element={<AirSamplerSettings />} />
                )}
                {(role === "OrgAdmin" || role === "") && (
                  <Route path="/build-form" element={<Build />} />
                )}

                <Route path="/fill-form" element={<Fill />} />

                <Route path="/air/forms" element={<AirForms />} />

                <Route path="/surface/forms" element={<SurfaceForms />} />

                {(role === "OrgAdmin" || role === "") && (
                  <Route path="/location" element={<Localizations />} />
                )}
                {(role === "OrgAdmin" || role === "") && (
                  <Route
                    path="/generate-reports"
                    element={<GenerateReports />}
                  />
                )}
                {role === "" && (
                  <Route path="/revise-reports" element={<ReviseReports />} />
                )}
                {role === "OrgAdmin" && (
                  <Route
                    path="completed-reports"
                    element={<CompletedReports />}
                  />
                )}

                {role === "" && (
                  <Route
                    path="completed-reports-bce"
                    element={<CompletedReportsAdmin />}
                  />
                )}
                {(role === "OrgAdmin" || role === "") && (
                  <Route path="rich-text" element={<RichText />} />
                )}
                {(role === "OrgAdmin" || role === "") && (
                  <Route path="build-plan" element={<Drg />} />
                )}
                {(role === "OrgAdmin" || role === "") && (
                  <Route path="plan" element={<PlanViewer />} />
                )}
              </Route>
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
