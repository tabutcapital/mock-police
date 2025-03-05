import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Phone, Mail, Clock, MapPin, Shield, AlertTriangle } from "lucide-react";

export default function PoliceInfo() {
  return (
    <div className="max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Police Department Information</h1>

      <div className="grid md:grid-cols-2 gap-8 mb-12">
        <div>
          <img
            src="https://static.ntvkenya.co.ke/uploads/2023/11/Police-car-1320x740.png"
            alt="Police Department Building"
            className="rounded-lg shadow-lg w-full h-[300px] object-cover"
          />
        </div>

        <Card className="p-6">
          <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
            <Shield className="h-6 w-6 text-primary" />
            Emergency Contacts
          </h2>
          
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Phone className="h-5 w-5 text-red-500" />
              <div>
                <p className="font-medium">Emergency</p>
                <p className="text-lg">999</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Phone className="h-5 w-5 text-blue-500" />
              <div>
                <p className="font-medium">Non-Emergency</p>
                <p className="text-lg">(+254) 800-720002</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Mail className="h-5 w-5" />
              <div>
                <p className="font-medium">Email</p>
                <p>nps@nationalpolice.go.ke</p>
              </div>
            </div>
          </div>
        </Card>
      </div>

      <div className="grid md:grid-cols-2 gap-8 mb-12">
        <Card className="p-6">
          <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
            <MapPin className="h-6 w-6 text-primary" />
            Location & Hours
          </h2>

          <div className="space-y-4">
            <div>
              <p className="font-medium">Main Headquarters</p>
              <p>Vigilance House, Harambee Road</p>
              <p>CBD, Nairobi</p>
            </div>

            <div className="flex items-center gap-3">
              <Clock className="h-5 w-5" />
              <div>
                <p className="font-medium">Hours of Operation</p>
                <p>Administrative Offices:</p>
                <p>Monday - Friday: 8:00 AM - 5:00 PM</p>
                <Badge className="mt-2">24/7 Emergency Services</Badge>
              </div>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
            <AlertTriangle className="h-6 w-6 text-primary" />
            Important Information
          </h2>

          <div className="space-y-4">
            <div>
              <h3 className="font-medium mb-2">When to Call 999</h3>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>Immediate danger to life or property</li>
                <li>Crime in progress</li>
                <li>Medical emergency</li>
                <li>Serious accidents</li>
              </ul>
            </div>

            <div>
              <h3 className="font-medium mb-2">Non-Emergency Reports</h3>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>Minor theft or vandalism</li>
                <li>Lost property</li>
                <li>Noise complaints</li>
                <li>Minor traffic incidents</li>
              </ul>
            </div>
          </div>
        </Card>
      </div>

      <div className="rounded-lg overflow-hidden">
        <img
          src="https://www.npsc.go.ke/wp-content/uploads/2025/01/NPS.png"
          alt="Police Officers"
          className="w-full h-[300px] object-cover"
        />
      </div>
    </div>
  );
}
