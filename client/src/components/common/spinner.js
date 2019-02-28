import React from "react";
import spinner from "./spinner.gif";

export default () => {
  return (
    <div>
      <img
        src={spinner}
        style={{ width: "200px", display: "block" }}
        alt="Loading..."
      />
    </div>
  );
};
