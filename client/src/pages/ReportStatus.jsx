// src/pages/ReportStatus.jsx
import { useParams } from "wouter"; // To get the report ID from the URL

function ReportStatus() {
  const { reportId } = useParams(); // Get the report ID from the URL
  
  // For now, simulate a report status (replace with actual report fetching logic)
  const reportStatus = {
    submitted: "Submitted",
    investigating: "Investigating",
    resolved: "Resolved",
    pending: "Pending",
    closed: "Closed"
  };

  return (
    <div className="max-w-2xl mx-auto mt-4">
      <h1 className="text-2xl font-bold">Report ID: {reportId}</h1>
      <div className="mt-4">
        <p>Status: {reportStatus[reportId]}</p> {/* Display the status */}
      </div>
    </div>
  );
}

export default ReportStatus;
