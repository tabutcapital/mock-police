import { useEffect } from "react";
import { useLocation } from "wouter";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import ReportStatus from "@/components/ReportStatus";
import { storage } from "@/lib/storage";
import { notifyStatusChange } from "@/lib/mockEmail";

export default function AdminDashboard() {
  const [, setLocation] = useLocation();
  const user = storage.getCurrentUser();
  const reports = storage.getReports();

  useEffect(() => {
    if (!user?.isAdmin) {
      setLocation("/login");
    }
  }, [user, setLocation]);

  if (!user?.isAdmin) return null;

  const handleStatusChange = (reportId, newStatus) => {
    const report = reports.find(r => r.id === reportId);
    if (!report) return;

    storage.updateReport(reportId, { status: newStatus });
    const reportUser = storage.getUsers().find(u => u.id === report.userId);
    if (reportUser) {
      notifyStatusChange(report, reportUser);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>

      <div className="grid gap-6">
        {reports.map(report => (
          <Card key={report.id} className="p-4">
            <div className="flex justify-between items-start mb-4">
              <ReportStatus report={report} />
              <Select
                value={report.status}
                onValueChange={(value) => handleStatusChange(report.id, value)}
              >
                <SelectTrigger className="w-[200px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="submitted">Submitted</SelectItem>
                  <SelectItem value="in_review">In Review</SelectItem>
                  <SelectItem value="investigating">Investigating</SelectItem>
                  <SelectItem value="resolved">Resolved</SelectItem>
                  <SelectItem value="closed">Closed</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
