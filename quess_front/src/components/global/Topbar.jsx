import {
  Box,
  IconButton,
  Menu,
  MenuItem,
  TextField,
  useTheme,
} from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { ColorModeContext, tokens } from "../../theme";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import { getOrgbyUserId } from "../../redux/actions/userOrg.action";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Topbar = () => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);
  const userOrgs = useSelector((state) => state.userOrgs.userOrganizations);
  const [selectedOrgId, setSelectedOrgId] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getOrgbyUserId());
  }, [dispatch]); // Only dispatch action on component mount

  useEffect(() => {
    const storedOrgId = localStorage.getItem("selectedOrgId");
    if (
      storedOrgId &&
      userOrgs.find((org) => org.id === parseInt(storedOrgId))
    ) {
      setSelectedOrgId(parseInt(storedOrgId));
    } else if (userOrgs.length > 0 && selectedOrgId === null) {
      setSelectedOrgId(userOrgs[0]?.id);
      localStorage.setItem("selectedOrgId", userOrgs[0]?.id.toString()); // Set first org ID in local storage
    }
  }, [userOrgs, selectedOrgId]);

  const handleOrgChange = (e) => {
    const orgId = parseInt(e.target.value);
    setSelectedOrgId(orgId);
    localStorage.setItem("selectedOrgId", orgId.toString());
    window.location.reload();
  };

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
    console.log("Logout clicked");
    handleMenuClose();
  };

  return (
    <Box display="flex" justifyContent="space-between" p={2}>
      {/* ORG BAR */}
      <Box
        display="flex"
        backgroundColor={colors.primary[400]}
        borderRadius="3px"
      >
        <div className="select-container">
          <TextField
            select
            label="Select Organization"
            className="select-box"
            value={selectedOrgId || ""}
            onChange={handleOrgChange}
            fullWidth
            InputLabelProps={{ style: { color: "#3e4396" } }}
          >
            {userOrgs &&
              userOrgs.map((org) => (
                <MenuItem key={org.id} value={org.id}>
                  {org.nomOrg}
                </MenuItem>
              ))}
          </TextField>
        </div>
      </Box>

      {/* ICONS */}
      <Box display="flex">
        <IconButton onClick={colorMode.toggleColorMode}>
          {theme.palette.mode === "dark" ? (
            <DarkModeOutlinedIcon />
          ) : (
            <LightModeOutlinedIcon />
          )}
        </IconButton>
        <IconButton>
          <NotificationsOutlinedIcon />
        </IconButton>
        <IconButton>
          <SettingsOutlinedIcon />
        </IconButton>
        <IconButton onClick={handleMenuOpen}>
          <PersonOutlinedIcon />
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={handleLogout}>Logout</MenuItem>
        </Menu>
      </Box>
    </Box>
  );
};

export default Topbar;
