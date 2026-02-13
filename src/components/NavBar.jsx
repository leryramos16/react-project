import * as React from "react";
import {
  Box,
  BottomNavigation,
  BottomNavigationAction,
  Paper
} from "@mui/material";


import RestaurantIcon from "@mui/icons-material/Restaurant";
import PeopleIcon from "@mui/icons-material/People";
import HistoryIcon from "@mui/icons-material/History";


 function NavBar() {
  const [value, setValue] = React.useState(0);

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