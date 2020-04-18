import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import BarGraph from ".././components/BarGraph";
import DoughnutGraph from ".././components/DoughnutGraph";
import PieGraph from ".././components/PieGraph";
import "../css/Stats.css";

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.text.default,
  },
}));

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </Typography>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function SimpleTabs() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Tabs
          TabIndicatorProps={{ style: { background: "#282c34" } }}
          centered
          value={value}
          onChange={handleChange}
          aria-label="simple tabs example"
        >
          <Tab label="Winstreak" {...a11yProps(0)} />
          <Tab label="Type" {...a11yProps(1)} />
          <Tab label="Trainer" {...a11yProps(2)} />
        </Tabs>
      </AppBar>
      <div className="tabsText">
        <TabPanel value={value} index={0}>
          <h1>Winstreak by Pokemon</h1>
          <BarGraph />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <h1>Wins by Pokemon Type</h1>
          <DoughnutGraph />
        </TabPanel>
        <TabPanel value={value} index={2}>
          <h1>Wins by Trainer Team</h1>
          <PieGraph />
        </TabPanel>
      </div>
    </div>
  );
}
