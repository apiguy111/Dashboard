import "./widget.scss";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
import axios from "axios";
import { useEffect, useState } from "react";

const Widget = ({ type }) => {
  const [data, setData] = useState({
    title: "",
    heading: "",
    link: "",
    icon: null,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "/api/dashboard/visualization"
        );

        switch (type) {
          case "user":
            setData({
              title: "MOST COMMON TOPIC",
              heading: response.data.mostCommonTopic[0]._id,
              link: "See all topics",
              diff: 20,
              icon: (
                <PersonOutlinedIcon
                  className="icon"
                  style={{
                    color: "crimson",
                    backgroundColor: "rgba(255, 0, 0, 0.2)",
                  }}
                />
              ),
            });
            break;
          case "order":
            setData({
              title: "HIGHEST RELEVANCE",
              heading: response.data.highestRelevance[0].maxRelevance,
              link: "View all relevance",
              diff: 30,

              icon: (
                <ShoppingCartOutlinedIcon
                  className="icon"
                  style={{
                    backgroundColor: "rgba(218, 165, 32, 0.2)",
                    color: "goldenrod",
                  }}
                />
              ),
            });
            break;
          case "earning":
            setData({
              title: "HIGHEST LIKELIHOOD",
              heading: response.data.highestLikelihood[0].maxLikelihood,
              link: "View all likelihood",
              diff: 70,

              icon: (
                <MonetizationOnOutlinedIcon
                  className="icon"
                  style={{
                    backgroundColor: "rgba(0, 128, 0, 0.2)",
                    color: "green",
                  }}
                />
              ),
            });
            break;
          case "balance":
            setData({
              title: "MOST COMMON REGION",
              heading: response.data.mostCommonCity[0]._id,
              link: "See all regions",
              diff: 10,

              icon: (
                <AccountBalanceWalletOutlinedIcon
                  className="icon"
                  style={{
                    backgroundColor: "rgba(128, 0, 128, 0.2)",
                    color: "purple",
                  }}
                />
              ),
            });
            break;
          default:
            break;
        }
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };

    fetchData();
  }, [type]);

  return (
    <div className="widget">
      <div className="left">
        <span className="title">{data.title}</span>
        <span className="counter">{data.heading}</span>
        <span className="link">{data.link}</span>
      </div>
      <div className="right">
        <div className="percentage positive">
          <KeyboardArrowUpIcon />
          {data.diff} %
        </div>
        {data.icon}
      </div>
    </div>
  );
};

export default Widget;
