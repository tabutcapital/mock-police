import { useEffect } from "react";
import { useLocation } from "wouter";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ReportForm from "@/components/ReportForm";
import ReportStatus from "@/components/ReportStatus";
import { storage } from "@/lib/storage";

export default function Dashboard() {
  const [, setLocation] = useLocation();
  const user = storage.getCurrentUser();
  const reports = storage.getReports().filter(r => r.userId === user?.id);

  useEffect(() => {
    if (!user) {
      setLocation("/login");
    }
  }, [user, setLocation]);

  if (!user) return null;

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Dashboard</h1>

      <Tabs defaultValue="new-report">
        <TabsList className="mb-6">
          <TabsTrigger value="new-report">New Report</TabsTrigger>
          <TabsTrigger value="my-reports">My Reports</TabsTrigger>
        </TabsList>

        <TabsContent value="new-report">
          <ReportForm />
        </TabsContent>

        <TabsContent value="my-reports">
          <div className="grid gap-4">
            {reports.length === 0 ? (
              <p className="text-muted-foreground text-center py-8">
                No reports submitted yet
              </p>
            ) : (
              reports.map(report => (
                <ReportStatus key={report.id} report={report} />
              ))
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
