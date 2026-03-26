import React, { useEffect } from "react";
import { useState } from "react";
import { ProSidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import "react-pro-sidebar/dist/css/styles.css";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import { tokens } from "../../theme";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import ListAltOutlinedIcon from "@mui/icons-material/ListAltOutlined";
import MenuBookOutlinedIcon from "@mui/icons-material/MenuBookOutlined";
import ApartmentOutlinedIcon from "@mui/icons-material/ApartmentOutlined";
import { MenuOutlined } from "@mui/icons-material";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import PinDropOutlinedIcon from "@mui/icons-material/PinDropOutlined";
import AirOutlinedIcon from "@mui/icons-material/AirOutlined";
import FactCheckOutlinedIcon from "@mui/icons-material/FactCheckOutlined";
import DrawOutlinedIcon from "@mui/icons-material/DrawOutlined";
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
import NearMeOutlinedIcon from "@mui/icons-material/NearMeOutlined";
import ExploreOutlinedIcon from "@mui/icons-material/ExploreOutlined";
import DocumentScannerIcon from "@mui/icons-material/DocumentScanner";
import NoteAddIcon from "@mui/icons-material/NoteAdd";
import MapOutlinedIcon from "@mui/icons-material/MapOutlined";
import AddLocationAltOutlinedIcon from "@mui/icons-material/AddLocationAltOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import { useDispatch, useSelector } from "react-redux";
import { getUserr } from "../../redux/actions/user.action";

const Item = ({ title, to, icon, selected, setSelected }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <MenuItem
      active={selected === title}
      style={{
        color: colors.grey[100],
      }}
      onClick={() => setSelected(title)}
      icon={icon}
    >
      <Typography>{title}</Typography>
      <Link to={to} />
    </MenuItem>
  );
};

const Sidebar = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const user = useSelector((state) => state?.user?.user?.data);
  const colors = tokens(theme.palette.mode);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("dashboard");
  const role = useSelector((state) => state?.user?.role);
  const translateRole = (role) => {
    switch (role) {
      case "OrgAdmin":
        return "Organization Supervisor";
      case "":
        return "BCE Admin";
      case "Employee":
        return "Sampling Employee";
      default:
        return role; // Return the original role if no translation is found
    }
  };

  useEffect(() => {
    dispatch(getUserr());
  }, [dispatch]);

  return (
    <Box
      sx={{
        "& .pro-sidebar-inner": {
          background: `${colors.primary[400]} !important`,
        },
        "& .pro-sidebar-header": { backgroundColor: "transparent  !important" },
        "& pro-inner-item": {
          padding: "5px 35px 5px 20px !important",
        },
        "& .pro-inner-item:hover": {
          color: "#868dfb !important",
        },
        "& .pro-menu-item.active": {
          color: "#6870fa !important",
        },
        "& .pro-icon-wrapper": {
          backgroundColor: "transparent !important",
        },
      }}
    >
      <ProSidebar collapsed={isCollapsed}>
        <Menu iconShape="square">
          {/* LOGO AND MENU ICON */}
          <MenuItem
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={isCollapsed ? <MenuOutlined /> : undefined}
            style={{
              margin: "10px 0 20px 0",
              color: colors.grey[100],
            }}
          >
            {!isCollapsed && (
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                ml="15px"
              >
                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                  <MenuOutlinedIcon />
                </IconButton>
              </Box>
            )}
          </MenuItem>
          {!isCollapsed && (
            <Box mb="25px">
              <Box display="flex" justifyContent="center" alignItems="center">
                <img
                  alt="profile-user"
                  width="100px"
                  height="100px"
                  src={`../../assets/user.png`}
                  style={{ cursor: "pointer", borderRadius: "50%" }}
                />
              </Box>
              <Box textAlign="center">
                <Typography
                  variant="h2"
                  color={colors.grey[100]}
                  fontWeight="bold"
                  sx={{ m: "10px 0 0 0" }}
                >
                  {user?.prenom} {user?.nom}
                </Typography>
                <Typography variant="h5" color={colors.greenAccent[500]}>
                  {translateRole(role)}
                </Typography>
              </Box>
            </Box>
          )}
          <Box paddingLeft={isCollapsed ? undefined : "10%"}>
            {(role === "OrgAdmin" || role === "") && (
              <Item
                title="Dashboard"
                to="/"
                icon={<HomeOutlinedIcon />}
                selected={selected}
                setSelected={setSelected}
              />
            )}
            {(role === "OrgAdmin" || role === "") && (
              <Typography
                variant="h6"
                color={colors.grey[300]}
                sx={{ m: "15px 0 5px 20px" }}
              >
                <hr width="60%" marginright="0" />
              </Typography>
            )}
            {role === "" && (
              <Item
                title="Organizations"
                to="/organizations"
                icon={<ApartmentOutlinedIcon />}
                selected={selected}
                setSelected={setSelected}
              />
            )}
            {(role === "OrgAdmin" || role === "") && (
              <Item
                title="Users"
                to="/users"
                icon={<PeopleOutlinedIcon />}
                selected={selected}
                setSelected={setSelected}
              />
            )}
            {(role === "OrgAdmin" || role === "") && (
              <Item
                title="Air Devices"
                to="/air-devices"
                icon={<AirOutlinedIcon />}
                selected={selected}
                setSelected={setSelected}
              />
            )}
            {(role === "OrgAdmin" || role === "") && (
              <SubMenu
                title="Zones"
                icon={<ExploreOutlinedIcon />}
                style={{
                  color: colors.grey[100],
                }}
              >
                <Item
                  title="Zone"
                  to="/zones"
                  icon={<NearMeOutlinedIcon />}
                  selected={selected}
                  setSelected={setSelected}
                />
                <Item
                  title="Localization"
                  to="/location"
                  icon={<PinDropOutlinedIcon />}
                  selected={selected}
                  setSelected={setSelected}
                />
              </SubMenu>
            )}

            {(role === "OrgAdmin" || role === "") && (
              <SubMenu
                title="Plan"
                icon={<MapOutlinedIcon />}
                style={{
                  color: colors.grey[100],
                }}
              >
                <Item
                  title="Build Plan"
                  to="/build-plan"
                  icon={<AddLocationAltOutlinedIcon />}
                  selected={selected}
                  setSelected={setSelected}
                />
                <Item
                  title="View Plan"
                  to="/plan"
                  icon={<VisibilityOutlinedIcon />}
                  selected={selected}
                  setSelected={setSelected}
                />
              </SubMenu>
            )}

            {(role === "OrgAdmin" || role === "" || role === "Employee") && (
              <SubMenu
                title="Forms"
                icon={<ListAltOutlinedIcon />}
                style={{
                  color: colors.grey[100],
                }}
              >
                {(role === "OrgAdmin" || role === "") && (
                  <Item
                    title="Build Form"
                    to="/build-form"
                    icon={<AddBoxOutlinedIcon />}
                    selected={selected}
                    setSelected={setSelected}
                  />
                )}
                <Item
                  title="Fill Form"
                  to="/fill-form"
                  icon={<DrawOutlinedIcon />}
                  selected={selected}
                  setSelected={setSelected}
                />
              </SubMenu>
            )}
            {(role === "OrgAdmin" || role === "") && (
              <SubMenu
                title="Reports "
                icon={<MenuBookOutlinedIcon />}
                selected={selected}
                setSelected={setSelected}
                style={{
                  color: colors.grey[100],
                }}
              >
                
                  <Item
                    title="Generate Reports"
                    to="/generate-reports"
                    icon={<NoteAddIcon />}
                    selected={selected}
                    setSelected={setSelected}
                  />
                
                {role === "" && (
                  <Item
                    title="Revise Report"
                    to="/revise-reports"
                    icon={<DocumentScannerIcon />}
                    selected={selected}
                    setSelected={setSelected}
                  />
                )}
                {role === "OrgAdmin" &&  (
                  <Item
                    title="Completed Reports"
                    to="/completed-reports"
                    icon={<FactCheckOutlinedIcon />}
                    selected={selected}
                    setSelected={setSelected}
                  />
                )}

                {role === "" && (
                  <Item
                    title="Completed Reports"
                    to="/completed-reports-bce"
                    icon={<FactCheckOutlinedIcon />}
                    selected={selected}
                    setSelected={setSelected}
                  />
                )}
              </SubMenu>
            )}
          </Box>
        </Menu>
      </ProSidebar>
    </Box>
  );
};

export default Sidebar;
