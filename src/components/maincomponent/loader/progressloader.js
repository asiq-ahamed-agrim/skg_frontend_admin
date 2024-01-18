import * as React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import "./progressloader.scss"
export default function CircularIndeterminate() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "200px",
        height: "175px",
        backgroundColor: "white",
        boxShadow: " rgba(0, 0, 0, 0.35) 0px 5px 15px",
        borderRadius: "3px",
        zIndex: 999,
        position: "absolute",
        top: "37%",
        left: "42%",
      }}
    >
      <div>
        <p style={{ margin: 10, textAlign: "center", fontSize: "12px" }}>
          Loading...
        </p>
      </div>
      <CircularProgress
      className="custom-loader"
        sx={{
          width: "87px !important",
          height: "87px !important",
          margin: "auto",
          color: "#03BC7F",
        }}
      />
    </Box>
  );
}
