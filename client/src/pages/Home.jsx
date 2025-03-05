import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { AlertTriangle, FileText, Shield } from "lucide-react";
import { useLocation } from "wouter";

export default function Home() {

  // const [, setLocation] = useLocation();
  // const user = storage.getCurrentUser(); // Get the current logged-in user
  // const reports = storage.getReports(); // Assuming reports are stored here

  // // Find the user's report from storage
  // const userReport = user ? reports.find((report) => report.userId === user.id) : null;
  
  // const [, setLocation] = useLocation();  // Set up the location hook for navigation

  // const handleViewReports = () => {
  //   setLocation("/admin-dashboard");  // Navigate to the Admin Dashboard page
  // };

  const [, setLocation] = useLocation();

  const handleViewReports = () => {
    const reportId = "submitted"; // Replace with dynamic report status or ID
    setLocation(`/report-status/${reportId}`); // Navigate to ReportStatus component
  };

  return (
    <div className="max-w-5xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">
          Welcome to the Kenya Police Incident Reporting System
        </h1>
        <p className="text-xl text-muted-foreground">
          Report incidents, track cases, and stay informed
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mb-12">
        <Card className="p-6 text-center">
          <AlertTriangle className="mx-auto h-12 w-12 mb-4 text-red-500" />
          <h2 className="text-xl font-semibold mb-2">Report Incidents</h2>
          <p className="text-muted-foreground mb-4">
            Submit reports for crimes, accidents, or lost property
          </p>
          <Link href="/register">
            <Button className="w-full">Get Started</Button>
          </Link>
        </Card>

        <Card className="p-6 text-center">
          <FileText className="mx-auto h-12 w-12 mb-4 text-blue-500" />
          <h2 className="text-xl font-semibold mb-2">Track Status</h2>
          <p className="text-muted-foreground mb-4">
            Monitor the progress of your submitted reports
          </p>
          {/* <Link href="/login">
            <Button variant="outline" className="w-full">View Reports</Button>
          </Link> */}
          <Button variant="outline" className="w-full" onClick={handleViewReports}>
            View Reports
          </Button>
       
        </Card>

      

        <Card className="p-6 text-center">
          <Shield className="mx-auto h-12 w-12 mb-4 text-green-500" />
          <h2 className="text-xl font-semibold mb-2">Police Information</h2>
          <p className="text-muted-foreground mb-4">
            Access important police department information
          </p>
          <Link href="/police-info">
            <Button variant="outline" className="w-full">Learn More</Button>
          </Link>
        </Card>
      </div>

       

      <div className="text-center mb-8">
  <h2 className="text-2xl font-semibold mb-6">What Our Users Are Saying</h2>
  <div className="flex justify-between space-x-6">
    <div className="bg-white p-6 rounded-lg shadow-lg max-w-xs w-full">
      <p className="text-gray-700 mb-4">
        "The police service management system has been a game changer. It’s
        incredibly easy to use, and we’ve seen faster response times and more
        efficient handling of reports."
      </p>
      <p className="font-semibold text-gray-900">Larry K, Citizen</p>
    </div>
    <div className="bg-white p-6 rounded-lg shadow-lg max-w-xs w-full">
      <p className="text-gray-700 mb-4">
        "This platform has streamlined our workflow and made it easier to
        track crime reports and manage applications. It has made a significant
        impact on the community."
      </p>
      <p className="font-semibold text-gray-900">Inspekta Mwala, Inspector</p>
    </div>
    <div className="bg-white p-6 rounded-lg shadow-lg max-w-xs w-full">
      <p className="text-gray-700 mb-4">
        "The system’s real-time updates and tracking features have helped us
        stay on top of ongoing cases. It's been a crucial tool in our daily
        operations."
      </p>
      <p className="font-semibold text-gray-900">Masengeli, DiG of Police</p>
    </div>
  </div>
</div>

<footer className="bg-gray-800 text-white py-8">
  <div className="container mx-auto flex flex-col items-center md:flex-row md:justify-between">
    {/* Social Media Links */}
    <div className="flex space-x-6 mb-4 md:mb-0">
      <a
        href="https://www.facebook.com"
        className="text-gray-300 hover:text-white"
        target="_blank"
        rel="noopener noreferrer"
      >
        <i className="fab fa-facebook-f"></i> Facebook
      </a>
      <a
        href="https://www.twitter.com"
        className="text-gray-300 hover:text-white"
        target="_blank"
        rel="noopener noreferrer"
      >
        <i className="fab fa-twitter"></i> Twitter
      </a>
      <a
        href="https://www.instagram.com"
        className="text-gray-300 hover:text-white"
        target="_blank"
        rel="noopener noreferrer"
      >
        <i className="fab fa-instagram"></i> Instagram
      </a>
      <a
        href="https://www.linkedin.com"
        className="text-gray-300 hover:text-white"
        target="_blank"
        rel="noopener noreferrer"
      >
        <i className="fab fa-linkedin-in"></i> LinkedIn
      </a>
    </div>

    {/* Address */}
    <div className="text-center mb-4 md:mb-0">
      <p>Vigilance Hse, Harambee Road, Nairobi, Kenya</p>
    </div>

    {/* Copyright */}
    <div className="text-center">
      <p>&copy; 2025 Police Service Management. All rights reserved.</p>
    </div>
  </div>
</footer>

    </div>
  );
}
