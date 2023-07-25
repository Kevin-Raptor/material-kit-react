import {
  Box,
  Button,
  Divider,
  Grid,
  InputAdornment,
  Stack,
  Tab,
  Tabs,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import PropTypes from "prop-types";
import { styled } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";
import { AllPropertyList } from "src/components/property/all-property-list";
import { tabConfig } from "src/config/tabs-config";
import AddProperty from "./property/add-property";


const useStyles = (theme) => ({
  root: {
    "& .MuiOutlinedInput-root": {
      borderRadius: 20, // Adjust the border radius here
      "&:hover fieldset": {
        borderColor: "blue", // Change the border color on hover if desired
      },
      "&.Mui-focused fieldset": {
        borderColor: "green", // Change the border color when focused if desired
      },
    },
    "& .MuiOutlinedInput-input": {
      height: "10px", // Adjust the height of the input field
    },
  },
});

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box mt={2}>{children}</Box>}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const Page = () => {
  const [value, setValue] = useState(0);
  const classes = styled("div")(useStyles);
  const [currentTab, setCurrentTab] = useState([
    { tabName: tabConfig[0].tabName, tabValue: tabConfig[0].tabValue },
  ]);
  const [isOpen, setIsOpen] = useState(false);
 
  const handleChange = (event, newValue) => {
    console.log(`tab handle change`, event, newValue);
    setValue(newValue);
    setCurrentTab(tabConfig.filter((item) => item.tabValue === newValue));
  };
  const handleOpenDialog = () => {
    setIsOpen(true);
  };
  const handleCloseDialog = () => {
    setIsOpen(false);
  };
  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
        <Typography variant="h4" sx={{ px: 1, my: 1 }}>
          Your Properties
        </Typography>

        <Stack direction="row" spacing={2}>
          <Button variant="contained" onClick={handleOpenDialog} sx={{height: '50px', width: '150px'}}>
            Add Property
          </Button>
          <TextField
            sx={{ mt: 2, borderRadius: 5, marginRight: 2, width: '50%' }}
            placeholder="Search properties"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ mt: 0 }} />
                </InputAdornment>
              ),
            }}
          />
        </Stack>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={6}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
            sx={{ marginLeft: "20px" }}
          >
            {tabConfig.map((tab) => (
              <Tab label={tab.tabName} {...a11yProps(tab.tabValue)}></Tab>
            ))}
          </Tabs>
          <Divider />
          <CustomTabPanel value={value} index={value}>
            <AllPropertyList selectedTab={currentTab} />
          </CustomTabPanel>
        </Grid>
        <Grid item xs={6}>
          <Typography>GMAPS</Typography>
        </Grid>
      </Grid>
      <AddProperty isOpen={isOpen} onClose={handleCloseDialog} />
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
