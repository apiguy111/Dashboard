import "./table.scss";
import { Chart } from "react-google-charts";
import axios from "axios";
import { useEffect, useState } from "react";

export const data = [
  ["Country", "Popularity"],
  ["Germany", 200],
  ["United States", 300],
  ["Brazil", 400],
  ["Canada", 500],
  ["France", 600],
  ["RU", 700],
];

const List = () => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://dashboard-3074.onrender.com/api/dashboard/visualization`
        );

        const { countryDistribution } = response.data;

        // Filter out items with an empty string as _id
        const filteredData = countryDistribution.filter(
          (entry) => entry._id !== ""
        );

        // Modify the data to match the expected format for GeoChart
        const geoChartData = [
          ["Country", "Insights"],
          ...filteredData.map((entry) => [entry._id, entry.count]),
        ];

        setChartData(geoChartData);
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };

    fetchData();
  }, []);

  return (
    <Chart
      chartEvents={[
        {
          eventName: "select",
          callback: ({ chartWrapper }) => {
            const chart = chartWrapper.getChart();
            const selection = chart.getSelection();
            if (selection.length === 0) return;
            const region = chartData[selection[0].row + 1];
            console.log("Selected: " + region);
          },
        },
      ]}
      chartType="GeoChart"
      width="100%"
      height="400px"
      data={chartData}
    />
  );
};

export default List;
