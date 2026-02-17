import * as React from "react";
import {
  Box,
  BottomNavigation,
  BottomNavigationAction,
  Paper
} from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";

import RestaurantIcon from "@mui/icons-material/Restaurant";
import PeopleIcon from "@mui/icons-material/People";
import HistoryIcon from "@mui/icons-material/History";


 function NavBar() {
  const navigate = useNavigate();
  const location = useLocation();

  const routes = ["/", "/meals", "/history"];

  // Get current tab index based on URL
  const getCurrentIndex = () => {
    const currentPath = location.pathname;
    const index = routes.indexOf(currentPath);
    return index === -1 ? 0 : index;
  };

  const [value, setValue] = React.useState(getCurrentIndex());

  // Update active tab when URL changes
  React.useEffect(() => {
    setValue(getCurrentIndex());
  }, [location.pathname]);
  return (
    <Paper
      sx={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0
      }}
      elevation={3}
    >
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
          navigate(routes[newValue]);
        }}
      >
        <BottomNavigationAction
          label="Guests"
          icon={<PeopleIcon />}
        />
        <BottomNavigationAction
        label="Meals"
        icon={<RestaurantIcon />}
        />

        <BottomNavigationAction
        label="History"
        icon={<HistoryIcon />}
        />

      </BottomNavigation>
    </Paper>
  );
}


export default NavBar;