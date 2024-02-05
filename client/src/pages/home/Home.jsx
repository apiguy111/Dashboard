import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import "./home.scss";
import Widget from "../../components/widget/Widget";
import Featured from "../../components/featured/Featured";
import Chart from "../../components/chart/Chart";
import Table from "../../components/table/Table";
import List from "../../components/table2/Table2";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { useState } from "react";

const Home = () => {
  const [checkboxes, setCheckboxes] = useState({
    sector: false,
    pestle: false,
    country: false,
    topic: false,
    region: false,
  });
  const [searchQuery, setSearchQuery] = useState("");

  const handleCheckboxChange = (checkbox) => {
    setCheckboxes((prevCheckboxes) => ({
      ...prevCheckboxes,
      sector: false,
      pestle: false,
      country: false,
      source: false,
      region: false,
      [checkbox]: true,
    }));
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const getTrueCheckboxes = (checkboxes) => {
    const trueCheckboxes = Object.keys(checkboxes).filter(
      (key) => checkboxes[key]
    );
    return trueCheckboxes.length > 0 ? trueCheckboxes[0] : "";
  };

  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <Navbar />
        <div className="widgets">
          <Widget type="user" />
          <Widget type="order" />
          <Widget type="earning" />
          <Widget type="balance" />
        </div>
        <div className="charts">
          <Featured />
          <Chart title="Average Intensity Over Time" aspect={2 / 1} />
        </div>
        <div className="listContainer">
          <div className="listTitle">Global Insights Distribution</div>
          <Table />
        </div>
        <div className="listContainer">
          <div className="listHead">
            <div className="listTitle">Filter Insights </div>
            <div className="search">
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={handleSearchChange}
              />
            </div>
            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={checkboxes.sector}
                    onChange={() => handleCheckboxChange("sector")}
                  />
                }
                label="Sector"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={checkboxes.pestle}
                    onChange={() => handleCheckboxChange("pestle")}
                  />
                }
                label="Pestle"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={checkboxes.country}
                    onChange={() => handleCheckboxChange("country")}
                  />
                }
                label="Country"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={checkboxes.topic}
                    onChange={() => handleCheckboxChange("topic")}
                  />
                }
                label="Topic"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={checkboxes.region}
                    onChange={() => handleCheckboxChange("region")}
                  />
                }
                label="Region"
              />
            </FormGroup>
          </div>
          <List query={searchQuery} heading={getTrueCheckboxes(checkboxes)} />
        </div>
      </div>
    </div>
  );
};

export default Home;
