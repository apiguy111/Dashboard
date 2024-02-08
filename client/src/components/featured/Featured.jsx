import "./featured.scss";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpOutlinedIcon from "@mui/icons-material/KeyboardArrowUpOutlined";
import { useEffect, useState } from "react";
import axios from "axios";

const Featured = () => {
  const [percentage, setPercentage] = useState(0);
  const [averageIntensity, setAverageIntensity] = useState(0);
  const [highestIntensity, setHighestIntensity] = useState(0);
  const [lowestIntensity, setLowestIntensity] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "/dashboard/average"
        );

        const {
          percentage,
          averageIntensity,
          highestIntensity,
          lowestIntensity,
        } = response.data;

        setPercentage(percentage);
        setAverageIntensity(averageIntensity || 0);
        setHighestIntensity(highestIntensity || 0);
        setLowestIntensity(lowestIntensity || 0);
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="featured">
      <div className="top">
        <h1 className="title">Intensity</h1>
        <MoreVertIcon fontSize="small" />
      </div>
      <div className="bottom">
        <div className="featuredChart">
          <CircularProgressbar
            value={percentage}
            text={`${percentage.toFixed(2)}%`}
            strokeWidth={5}
          />
        </div>
        <p className="title">Companies exceeding average intensity</p>
        <p className="amount">{`${averageIntensity.toFixed(2)}`}</p>
        <p className="desc">
          Average intensity surged significantly between 2021 and 2025, peaking
          at an impressive 72 units.
        </p>
        <div className="summary">
          <div className="item">
            <div className="itemTitle">Lowest intensity</div>
            <div className="itemResult negative">
              <KeyboardArrowDownIcon fontSize="small" />
              <div className="resultAmount">{lowestIntensity.toFixed(2)}</div>
            </div>
          </div>
          <div className="item">
            <div className="itemTitle">Average intensity</div>
            <div className="itemResult positive">
              <KeyboardArrowUpOutlinedIcon fontSize="small" />
              <div className="resultAmount">{averageIntensity.toFixed(2)}</div>
            </div>
          </div>
          <div className="item">
            <div className="itemTitle">Highest intensity</div>
            <div className="itemResult positive">
              <KeyboardArrowUpOutlinedIcon fontSize="small" />
              <div className="resultAmount">{highestIntensity.toFixed(2)}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Featured;
