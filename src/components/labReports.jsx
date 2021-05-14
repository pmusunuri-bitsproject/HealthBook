import React from "react";
import Header from "./header";
import LabReportList from "./labReportList";

const LabReports = ({ reports }) => {
  return (
    <React.Fragment>
      <Header title="Lab Reports" />
      {reports.length > 0 ? (
        <LabReportList reports={reports} />
      ) : (
        <p className="lead mt-5 text-center text-muted">No report found!</p>
      )}
    </React.Fragment>
  );
};

export default LabReports;
