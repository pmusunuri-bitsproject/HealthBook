import React from "react";
import Header from "./header";
import PrescriptionReportList from "./prescriptionReportList";

const PrescriptionReports = ({ reports }) => {
  return (
    <React.Fragment>
      <Header title="Prescription Reports" />
      {reports.length > 0 ? (
        <PrescriptionReportList reports={reports} />
      ) : (
        <p className="lead mt-5 text-center text-muted">No report found!</p>
      )}
    </React.Fragment>
  );
};

export default PrescriptionReports;
