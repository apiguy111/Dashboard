import "./table2.scss";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useEffect, useState } from "react";
import axios from "axios";

const List = ({ query, heading }) => {
  const [insights, setInsights] = useState([]);

  console.log(query, heading);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiUrl = `https://dashboard-api-jade.vercel.app/api/dashboard/filter?${heading}=${query}`;
        console.log(apiUrl); // Log the constructed API URL

        const response = await axios.get(apiUrl);

        setInsights(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };

    fetchData();
  }, [query, heading]);

  console.log(insights);

  return (
    <TableContainer component={Paper} className="table">
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className="tableCell">Country</TableCell>
            <TableCell className="tableCell">Pestle</TableCell>
            <TableCell className="tableCell">Topic</TableCell>
            <TableCell className="tableCell">Intensity</TableCell>
            <TableCell className="tableCell">Sector</TableCell>
            <TableCell className="tableCell">Region</TableCell>
            <TableCell className="tableCell">Likelihood</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {insights?.map((insight) => (
            <TableRow key={insight._id}>
              <TableCell className="tableCell">
                {insight?.country || "Unknown"}
              </TableCell>
              <TableCell className="tableCell">
                {insight?.pestle || "Unknown"}
              </TableCell>
              <TableCell className="tableCell">
                {insight?.topic || "Unknown"}
              </TableCell>
              <TableCell className="tableCell">
                {insight?.intensity || "Unknown"}
              </TableCell>
              <TableCell className="tableCell">
                {insight?.sector || "Unknown"}
              </TableCell>
              <TableCell className="tableCell">
                {insight?.region || "Unknown"}
              </TableCell>
              <TableCell className="tableCell">
                {insight?.likelihood || "Unknown"}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default List;
