import {
  Paper,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableCell,
  TableRow,
} from "@mui/material";
import React from "react";

const TableView = ({ publishers }) => {
  return (
    <TableContainer component={Paper} sx={{ marginTop: 2 }}>
      <Table aria-label="publishers table">
        <TableHead sx={{ backgroundColor: "#f5f5f5" }}>
          <TableRow>
            <TableCell>
              <strong>Name</strong>
            </TableCell>
            <TableCell>
              <strong>Address</strong>
            </TableCell>
            <TableCell>
              <strong>Website</strong>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {publishers.map((p) => (
            <TableRow hover key={p.id}>
              <TableCell>{p.name}</TableCell>
              <TableCell>{p.address}</TableCell>
              <TableCell>{p.website}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
export default TableView;
