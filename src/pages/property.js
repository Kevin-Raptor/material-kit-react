import {
  Box,
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
      {value === index && (
        <Box mt={2}>
          {children}
        </Box>
      )}
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
  const [currentTab, setCurrentTab] = useState([{tabName: tabConfig[0].tabName, tabValue: tabConfig[0].tabValue}])

  const handleChange = (event, newValue) => {
    console.log(`tab handle change`, event, newValue)
    setValue(newValue);
    setCurrentTab(tabConfig.filter((item)=>item.tabValue === newValue));
  };
  return (
    <>
      <Box sx={{display: 'flex', justifyContent: "space-between", mb: 2}}>
      <Typography variant="h4" sx={{ px: 1, my: 1 }}>
        Your Properties
      </Typography>
      <TextField
            sx={{ mt: 2, borderRadius: 5, marginRight: 1 }}
            size="small"
            placeholder="Search properties"
            lable=""
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ mt: 0 }} />
                </InputAdornment>
              ),
            }}
          />
      </Box>
      

      <Grid container>
        <Grid item xs={5}>
          <Typography>GMAPS</Typography>
        </Grid>

        <Grid item xs={7}>
          <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
            {tabConfig.map((tab)=><Tab label={tab.tabName} {...a11yProps(tab.tabValue)}></Tab>
            )}
          </Tabs>

          <Divider />

          <CustomTabPanel value={value} index={value}>
            <AllPropertyList selectedTab={currentTab}/>
          </CustomTabPanel>
          {/* <CustomTabPanel value={value} index={1}>
            <AllPropertyList tabkey="rentOverdue"/>
          </CustomTabPanel>
          <CustomTabPanel value={value} index={2}>
            <AllPropertyList tabkey="rentDueSoon"/>
          </CustomTabPanel>
          <CustomTabPanel value={value} index={3}>
            <AllPropertyList tabkey="rentDueLater"/>
          </CustomTabPanel>
          <CustomTabPanel value={value} index={4}>
            Vacant
          </CustomTabPanel> */}
        </Grid>
      </Grid>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
