import React from "react";
import { Spinner } from "reactstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const Loading = () => {
  return (
    <div className="d-flex justify-content-center">
      <Spinner className="spinner-border" id="spinner" />
    </div>
  );
};

export default Loading;
